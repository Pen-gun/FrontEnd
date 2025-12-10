import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { login, loginStatus, loginError } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await login({ email: form.email, password: form.password })
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 rounded-xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-400">Sign in to continue</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            />
          </div>
          {loginError ? <div className="text-sm text-red-400">{(loginError as Error)?.message || 'Login failed'}</div> : null}
          <button
            type="submit"
            disabled={loginStatus === 'pending'}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 rounded px-4 py-2 font-semibold"
          >
            {loginStatus === 'pending' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-sm text-gray-400">
          No account? <Link to="/register" className="text-red-400 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
