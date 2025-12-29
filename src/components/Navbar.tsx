import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Mic, Bell, Video as VideoIcon, Menu, User } from 'lucide-react'
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
    <nav
      className="px-4 py-2 sticky top-0 z-20 flex items-center justify-between gap-4"
      style={{ backgroundColor: 'var(--yt-spec-base-background)', borderBottom: '1px solid var(--yt-spec-outline)' }}
    >
      {/* Left: menu + logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--yt-spec-call-to-action)' }}>
            <VideoIcon className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-xl font-semibold hidden sm:block">YouTube</span>
        </Link>
      </div>

      {/* Middle: search */}
      <form onSubmit={onSearch} className="flex-1 flex items-center justify-center max-w-[640px]">
        <div className="flex items-stretch w-full">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            type="text"
            placeholder="Search"
            className="px-4 py-2 w-full rounded-l-full focus:outline-none text-base"
            style={{
              backgroundColor: 'var(--yt-spec-general-background-a)',
              border: '1px solid var(--yt-spec-outline)',
              color: 'var(--yt-spec-text-primary)'
            }}
          />
          <button
            type="submit"
            className="px-6 rounded-r-full border-y border-r flex items-center justify-center"
            style={{
              backgroundColor: 'var(--yt-spec-general-background-b)',
              borderColor: 'var(--yt-spec-outline)'
            }}
            aria-label="Search"
          >
            <Search className="w-5 h-5" style={{ color: 'var(--yt-spec-text-primary)' }} />
          </button>
        </div>
        <button
          type="button"
          className="ml-4 p-2 rounded-full hover:bg-white/10 hidden sm:block"
          aria-label="Voice search"
        >
          <Mic className="w-5 h-5" />
        </button>
      </form>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link to="/upload" className="p-2 rounded-full hover:bg-white/10 hidden sm:block" aria-label="Create">
          <VideoIcon className="w-6 h-6" />
        </Link>
        <button className="p-2 rounded-full hover:bg-white/10 hidden sm:block" aria-label="Notifications">
          <Bell className="w-6 h-6" />
        </button>
        {user ? (
          <Link to="/profile/me" className="flex-shrink-0">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
              style={{ border: '1px solid var(--yt-spec-outline)' }}
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1.5 rounded-full font-medium flex items-center gap-2 border"
            style={{
              borderColor: 'var(--yt-spec-outline)',
              color: '#3ea6ff'
            }}
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
