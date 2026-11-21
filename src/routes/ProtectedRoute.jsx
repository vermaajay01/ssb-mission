
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-cyan-400">
        Checking your session...
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
