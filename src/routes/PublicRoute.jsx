
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-cyan-400">
        Loading...
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}
