
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Shield,
  LogOut,
  UserCircle,
  BrainCircuit,
  Target,
  Eye,
  Users,
  MessageCircle,
  BookOpen,
  User,
  Mail,
  Pencil,
  Save,
  X,
  Lock,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Globe,
  Settings,
  ChevronRight,
} from 'lucide-react'

import {
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'

import {
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

// TRAINING MODULES
const trainingModules = [
  {
    icon: Target,
    title: 'OIR Practice',
    description: 'Verbal and non-verbal reasoning practice',
    path: '/oir-practice',
  },
  {
    icon: Eye,
    title: 'PPDT Practice',
    description:
      'Picture observation, story writing, narration and group discussion',
    path: '/ppdt-practice',
  },
  {
    icon: BrainCircuit,
    title: 'Psychology',
    description: 'TAT, WAT, SRT and SDT',
  },
  {
    icon: MessageCircle,
    title: 'Interview',
    description: 'Personal interview practice',
  },
  {
    icon: Users,
    title: 'GTO Ground',
    description: 'Group tasks and activities',
  },
  {
    icon: BookOpen,
    title: 'Lecturette & GD',
    description: 'Speaking and discussion',
  },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // SETTINGS STATE
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.displayName || '')
  const [saving, setSaving] = useState(false)

  // PASSWORD STATE
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  // FEEDBACK STATE
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const hasPassword = user?.providerData?.some(
    (provider) => provider.providerId === 'password'
  )

  const hasGoogle = user?.providerData?.some(
    (provider) => provider.providerId === 'google.com'
  )

  // OPEN SETTINGS
  const openSettings = () => {
    setName(user?.displayName || '')
    setEditing(false)
    setError('')
    setMessage('')
    setSettingsOpen(true)
  }

  // CLOSE SETTINGS
  const closeSettings = () => {
    setSettingsOpen(false)
    setEditing(false)
    setError('')
    setMessage('')
  }

  // LOGOUT
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Unable to log out.')
    }
  }

  // UPDATE PROFILE
  const handleSaveProfile = async () => {
    if (name.trim().length < 2) {
      setError('Name must contain at least 2 characters.')
      return
    }

    try {
      setSaving(true)
      setError('')
      setMessage('')

      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
      })

      await updateDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        updatedAt: serverTimestamp(),
      })

      setEditing(false)
      setMessage('Profile updated successfully!')
    } catch (err) {
      setError(err.message || 'Unable to update profile.')
    } finally {
      setSaving(false)
    }
  }

  // CHANGE PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (newPassword.length < 8) {
      setError('New password must contain at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    try {
      setPasswordLoading(true)

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      )

      await reauthenticateWithCredential(
        auth.currentUser,
        credential
      )

      await updatePassword(auth.currentUser, newPassword)

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      setMessage('Password changed successfully!')
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Current password is incorrect.')
      } else if (err.code === 'auth/weak-password') {
        setError('Please choose a stronger password.')
      } else if (err.code === 'auth/requires-recent-login') {
        setError('Please sign in again and retry.')
      } else {
        setError(err.message || 'Unable to change password.')
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  // SET PASSWORD
  const handleSetPassword = () => {
    closeSettings()
    navigate('/set-password')
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0b192a]/95 px-5 py-4 backdrop-blur-md sm:px-8">

        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-400" />

          <span className="text-xl font-black tracking-widest">
            SSB <span className="text-cyan-400">MISSION</span>
          </span>
        </div>

        {/* ACCOUNT SETTINGS ICON */}
        <button
          type="button"
          onClick={openSettings}
          title="Account Management"
          aria-label="Open account management"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
        >
          <UserCircle size={22} />
        </button>

      </header>

      {/* DASHBOARD CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* WELCOME SECTION */}
        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-[#102b46] to-[#0c1b2e] p-7 sm:p-10">

          <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
            CANDIDATE DASHBOARD
          </p>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Welcome, {user?.displayName || 'Aspirant'}!
          </h1>

          <p className="mt-3 text-slate-400">
            Your preparation journey starts here.
          </p>

          <p className="mt-5 text-sm text-slate-500">
            {user?.email}
          </p>

        </div>

        {/* TRAINING MODULES HEADING */}
        <div className="mb-8 mt-14">

          <h2 className="text-2xl font-bold">
            Your Training Modules
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Choose a module to begin your preparation.
          </p>

        </div>

        {/* CLICKABLE TRAINING MODULES */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {trainingModules.map((module) => (
            <button
              key={module.title}
              type="button"
              onClick={() => {
                if (module.path) {
                  navigate(module.path)
                }
              }}
              disabled={!module.path}
              className="group rounded-2xl border border-white/10 bg-[#101f33] p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-[#13263d] disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >

              <div className="mb-5 flex items-center justify-between">
                <module.icon className="h-8 w-8 text-cyan-400" />

                {module.path && (
                  <ChevronRight
                    size={20}
                    className="text-cyan-400 transition group-hover:translate-x-1"
                  />
                )}
              </div>

              <h3 className="text-lg font-bold">
                {module.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {module.description}
              </p>

              <span className="mt-6 inline-block text-xs font-semibold text-cyan-400">
                {module.path ? 'START PRACTICE →' : 'COMING SOON'}
              </span>

            </button>
          ))}

        </div>

      </div>

      {/* ACCOUNT MANAGEMENT MODAL */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeSettings()
            }
          }}
          role="presentation"
        >

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-settings-title"
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-cyan-400/20 bg-[#0b192a] shadow-2xl shadow-black/40"
          >

            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0b192a]/95 px-5 py-4 backdrop-blur sm:px-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Settings size={21} />
                </div>

                <div>
                  <h2
                    id="account-settings-title"
                    className="text-lg font-bold sm:text-xl"
                  >
                    Account Management
                  </h2>

                  <p className="text-xs text-slate-500">
                    Profile, sign-in methods and security
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closeSettings}
                aria-label="Close account management"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-5 p-5 sm:p-7">

              <div className="grid gap-5 lg:grid-cols-2">

                {/* PERSONAL INFORMATION */}
                <div className="rounded-2xl border border-white/10 bg-[#101f33] p-5 sm:p-6">

                  <div className="mb-6 flex items-center justify-between">

                    <h3 className="flex items-center gap-2 font-bold">
                      <User className="text-cyan-400" size={19} />
                      Personal Information
                    </h3>

                    {!editing ? (
                      <button
                        type="button"
                        onClick={() => {
                          setName(user?.displayName || '')
                          setEditing(true)
                          setError('')
                          setMessage('')
                        }}
                        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false)
                          setName(user?.displayName || '')
                        }}
                        aria-label="Cancel editing profile"
                        className="text-slate-400 hover:text-white"
                      >
                        <X size={19} />
                      </button>
                    )}

                  </div>

                  <div className="space-y-5">

                    <div>
                      <label className="mb-2 block text-xs text-slate-500">
                        FULL NAME
                      </label>

                      {editing ? (
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none focus:border-cyan-400"
                          placeholder="Enter your name"
                        />
                      ) : (
                        <p className="flex items-center gap-2 text-sm">
                          <User size={16} className="text-slate-500" />
                          {user?.displayName || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-slate-500">
                        EMAIL ADDRESS
                      </label>

                      <p className="flex items-center gap-2 break-all text-sm">
                        <Mail size={16} className="shrink-0 text-slate-500" />
                        {user?.email}
                      </p>
                    </div>

                    {editing && (
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                      >
                        <Save size={17} />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    )}

                  </div>
                </div>

                {/* LOGIN METHODS */}
                <div className="rounded-2xl border border-white/10 bg-[#101f33] p-5 sm:p-6">

                  <h3 className="mb-6 flex items-center gap-2 font-bold">
                    <Shield className="text-cyan-400" size={19} />
                    Login Methods
                  </h3>

                  <div className="space-y-4">

                    {/* GOOGLE ACCOUNT */}
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#07111f] p-4">

                      <div className="flex items-center gap-3">
                        <Globe size={21} className="shrink-0 text-cyan-400" />

                        <div>
                          <p className="text-sm font-semibold">
                            Google Account
                          </p>

                          <p className="text-xs text-slate-500">
                            Google authentication
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs font-semibold ${
                        hasGoogle ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        {hasGoogle ? 'Connected' : 'Not connected'}
                      </span>

                    </div>

                    {/* EMAIL ACCOUNT */}
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#07111f] p-4">

                      <div className="flex items-center gap-3">
                        <Mail size={21} className="shrink-0 text-cyan-400" />

                        <div>
                          <p className="text-sm font-semibold">
                            Email & Password
                          </p>

                          <p className="text-xs text-slate-500">
                            Manual login
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs font-semibold ${
                        hasPassword ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {hasPassword ? 'Enabled' : 'Not set'}
                      </span>

                    </div>

                    {/* SET PASSWORD */}
                    {!hasPassword && (
                      <button
                        type="button"
                        onClick={handleSetPassword}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                      >
                        <KeyRound size={17} />
                        Set Password
                      </button>
                    )}

                    {/* CHANGE PASSWORD */}
                    {hasPassword && (
                      <div className="rounded-xl border border-white/10 p-4">

                        <p className="mb-4 text-sm font-semibold">
                          Change your password
                        </p>

                        <form
                          onSubmit={handleChangePassword}
                          className="space-y-3"
                        >

                          <input
                            type="password"
                            required
                            autoComplete="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current password"
                            className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                          />

                          <input
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password (8+ characters)"
                            className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                          />

                          <input
                            type="password"
                            required
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                          />

                          <button
                            type="submit"
                            disabled={passwordLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                          >
                            <Lock size={16} />
                            {passwordLoading
                              ? 'Updating...'
                              : 'Change Password'}
                          </button>

                        </form>
                      </div>
                    )}

                  </div>
                </div>

              </div>

              {/* SUCCESS AND ERROR MESSAGES */}
              {(message || error) && (
                <div
                  role="status"
                  className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${
                    error
                      ? 'border-red-500/30 bg-red-500/10 text-red-300'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  }`}
                >
                  {error ? (
                    <AlertCircle size={18} className="shrink-0" />
                  ) : (
                    <CheckCircle size={18} className="shrink-0" />
                  )}

                  <span>{error || message}</span>
                </div>
              )}

              {/* LOGOUT */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-slate-500">
                  Signed in as {user?.email}
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-400/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>

            </div>
          </section>
        </div>
      )}

    </main>
  )
}
