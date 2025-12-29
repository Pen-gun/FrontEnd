import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { register, registerStatus, registerError } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await register(form)
  }

  return (
    <div className="min-h-screen grid place-items-center text-white" style={{ backgroundColor: 'var(--yt-spec-base-background)' }}>
      <div className="w-full max-w-md rounded-xl p-8 space-y-6" style={{ backgroundColor: 'var(--yt-spec-general-background-a)', border: '1px solid var(--yt-spec-outline)' }}>
        <div>
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-gray-400">Join the community</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded px-3 py-2 text-white"
              style={{ backgroundColor: 'var(--yt-spec-general-background-b)', border: '1px solid var(--yt-spec-outline)' }}
            />
          </div>
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
          {registerError ? <div className="text-sm text-red-400">{(registerError as Error)?.message || 'Registration failed'}</div> : null}
          <button
            type="submit"
            disabled={registerStatus === 'pending'}
            className="w-full disabled:opacity-60 rounded-full px-4 py-2.5 font-semibold"
            style={{ backgroundColor: 'var(--yt-spec-call-to-action)' }}
          >
            {registerStatus === 'pending' ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-gray-400">
          Have an account? <Link to="/login" style={{ color: '#3ea6ff' }} className="hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
