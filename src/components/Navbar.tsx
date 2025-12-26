import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mic, Bell, Video as VideoIcon, Menu } from 'lucide-react'
import { useCurrentUser } from '../queries/users'

export default function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const navigate = useNavigate()
  const { data: user } = useCurrentUser()
  const [term, setTerm] = useState('')

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    navigate({ pathname: '/', search: term ? `?query=${encodeURIComponent(term)}` : '' })
  }

  return (
    <nav className="bg-stone-900/80 border-b border-stone-800 px-4 sm:px-6 py-2.5 backdrop-blur sticky top-0 z-20">
      <div className="grid grid-cols-3 items-center gap-2">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="p-2 rounded hover:bg-stone-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-xl sm:text-2xl font-bold text-amber-500">
            TubeLite
          </Link>
        </div>

        {/* Middle: search */}
        <form onSubmit={onSearch} className="hidden sm:flex items-center justify-center">
          <div className="flex items-stretch w-full max-w-[640px]">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-stone-800 text-white px-4 py-2 rounded-l-full w-full focus:outline-none border border-stone-700 focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-stone-800 px-4 rounded-r-none border-y border-r border-stone-700 hover:bg-stone-700"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button type="button" className="bg-stone-800 px-3 rounded-r-full border border-stone-700 ml-0">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Right: actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link to="/upload" className="p-2 rounded hover:bg-stone-800" aria-label="Create">
            <VideoIcon className="w-6 h-6" />
          </Link>
          <button className="p-2 rounded hover:bg-stone-800" aria-label="Notifications">
            <Bell className="w-6 h-6" />
          </button>
          {user ? (
            <>
              <img
                src={user.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-stone-700"
              />
            </>
          ) : (
            <Link to="/login" className="bg-amber-600 px-3 py-1.5 rounded-full font-semibold hover:bg-amber-700 text-black">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
