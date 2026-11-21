
import { Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SetPassword from './pages/SetPassword'

import OIRPractice from './pages/OIRPractice'
import PPDTPractice from './pages/PPDTPractice'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Landing />} />

      {/* Public authentication routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected student routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/set-password" element={<SetPassword />} />

        {/* OIR and PPDT Training */}
        <Route
          path="/oir-practice"
          element={<OIRPractice />}
        />

        <Route
          path="/ppdt-practice"
          element={<PPDTPractice />}
        />
      </Route>

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-5 text-center text-white">
            <div>
              <h1 className="text-6xl font-black text-cyan-400">
                404
              </h1>

              <p className="mt-4 text-xl font-semibold">
                Page Not Found
              </p>

              <p className="mt-2 text-sm text-slate-400">
                The page you are looking for does not exist.
              </p>

              <a
                href="/"
                className="mt-7 inline-flex rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Back to Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

export default App
