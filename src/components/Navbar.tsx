import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCurrentUser, useLogout } from '../queries/users'

export default function Navbar() {
  const navigate = useNavigate()
  const { data: user } = useCurrentUser()
  const { mutateAsync: logout } = useLogout()
  const [term, setTerm] = useState('')

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    navigate({ pathname: '/', search: term ? `?query=${encodeURIComponent(term)}` : '' })
  }

  return (
    <nav className="bg-gray-900/80 border-b border-gray-800 px-6 py-3 backdrop-blur">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-red-500">
            TubeLite
          </Link>
          <form onSubmit={onSearch} className="flex items-center gap-2">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white px-4 py-2 rounded-full w-72 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" className="bg-gray-800 px-3 py-2 rounded-full border border-gray-700">
              Go
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/upload" className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 font-semibold">
                Upload
              </Link>
              <Link to="/playlists" className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
                Playlists
              </Link>
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-9 h-9 rounded-full border border-gray-700"
              />
              <button
                onClick={() => logout()}
                className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-red-600 px-5 py-2 rounded-full font-semibold hover:bg-red-700">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
