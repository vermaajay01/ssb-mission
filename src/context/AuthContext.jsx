
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
  getAdditionalUserInfo,
} from 'firebase/auth'

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

import {
  auth,
  db,
  googleProvider,
} from '../firebase/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Save user profile in Firestore
  const saveUserProfile = async (firebaseUser, extraData = {}) => {
    const userRef = doc(db, 'users', firebaseUser.uid)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        name: extraData.name || firebaseUser.displayName || '',
        email: firebaseUser.email,
        role: 'student',
        servicePreference: [],
        entryPreference: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  }

  // Register using email and password
  const register = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(result.user, {
      displayName: name,
    })

    await saveUserProfile(result.user, { name })

    return result.user
  }

  // Login using email and password
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return result.user
  }

  // Login or register using Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)

    await saveUserProfile(result.user)

    const additionalInfo = getAdditionalUserInfo(result)

    return {
      user: result.user,
      isNewUser: additionalInfo?.isNewUser ?? false,
    }
  }

  // Set password for an existing Google account
  const setPassword = async (password) => {
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new Error('Please sign in first.')
    }

    if (!currentUser.email) {
      throw new Error('No email address found for this account.')
    }

    const alreadyLinked = currentUser.providerData.some(
      (provider) => provider.providerId === 'password'
    )

    if (alreadyLinked) {
      throw new Error(
        'Email and password login is already enabled for this account.'
      )
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    )

    const result = await linkWithCredential(
      currentUser,
      credential
    )

    setUser(result.user)

    return result.user
  }

  // Logout
  const logout = async () => {
    await signOut(auth)
  }

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    setPassword,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
