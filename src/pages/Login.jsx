
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, ArrowRight, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Incorrect email or password.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  // Google login with new-user detection
  const handleGoogle = async () => {
    setError('')
    setLoading(true)

    try {
      const result = await loginWithGoogle()

      if (result.isNewUser) {
        navigate('/set-password')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-5 py-12">
      <div className="w-full max-w-md">

        <Link to="/" className="mb-10 flex items-center justify-center gap-3">
          <Shield className="h-9 w-9 text-cyan-400" />
          <span className="text-2xl font-black tracking-widest">
            SSB <span className="text-cyan-400">MISSION</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#101f33] p-7 shadow-2xl sm:p-9">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue your preparation.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email address
              </label>

              <div className="flex items-center rounded-lg border border-white/10 bg-[#07111f] px-4">
                <Mail size={18} className="text-slate-500" />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-3 py-3.5 text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <div className="flex items-center rounded-lg border border-white/10 bg-[#07111f] px-4">
                <Lock size={18} className="text-slate-500" />

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent px-3 py-3.5 text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 py-3 text-sm font-semibold transition hover:bg-white/5 disabled:opacity-50"
          >
            <Globe size={19} />
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Create account
            </Link>
          </p>

        </div>

        <Link
          to="/"
          className="mt-7 block text-center text-sm text-slate-500 hover:text-cyan-400"
        >
          ← Back to homepage
        </Link>

      </div>
    </main>
  )
}
