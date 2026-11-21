
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'

export default function SetPassword() {
  const { user, setPassword } = useAuth()
  const navigate = useNavigate()

  const [password, setPasswordValue] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)

      await setPassword(password)

      setSuccess('Password created successfully!')

      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      if (err.code === 'auth/credential-already-in-use') {
        setError(
          'This email is already linked to another account.'
        )
      } else if (err.code === 'auth/requires-recent-login') {
        setError(
          'Please sign out and sign in again using Google, then try again.'
        )
      } else if (
        err.code === 'auth/weak-password'
      ) {
        setError('Please choose a stronger password.')
      } else {
        setError(err.message || 'Unable to set password.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center p-6 text-white">
        <div className="text-center">
          <Shield size={40} className="mx-auto mb-4 text-cyan-400" />
          <h2 className="text-2xl font-bold mb-3">
            Sign in required
          </h2>
          <p className="text-slate-400 mb-6">
            Please sign in before setting your password.
          </p>
          <Link
            to="/login"
            className="inline-block rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const hasPassword = user.providerData.some(
    (provider) => provider.providerId === 'password'
  )

  if (hasPassword) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#101f33] p-8 text-center">
          <CheckCircle
            size={42}
            className="mx-auto mb-4 text-emerald-400"
          />
          <h2 className="text-2xl font-bold mb-3">
            Password Already Set
          </h2>
          <p className="text-slate-400 mb-6">
            Email and password login is already enabled for your account.
          </p>
          <Link
            to="/dashboard"
            className="inline-block rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md">

        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="rounded-2xl border border-slate-700 bg-[#101f33] p-7 shadow-2xl">

          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
              <Shield size={30} />
            </div>

            <h1 className="text-2xl font-bold">
              Set Your Password
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Create a password to log in without Google.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <p className="text-xs text-slate-400">
              Your registered email
            </p>
            <p className="mt-1 break-all font-medium">
              {user.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                New Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-[#07111f] py-3 pl-11 pr-12 text-white outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-700 bg-[#07111f] py-3 pl-11 pr-12 text-white outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle size={18} className="shrink-0" />
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Your Google login will continue to work.
          </p>

        </div>
      </div>
    </div>
  )
}
