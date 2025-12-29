import { Link, useLocation } from 'react-router-dom'
import { Home, PlaySquare, ListVideo, Clock, ThumbsUp, Folder, MessageSquare, User } from 'lucide-react'

interface NavLink {
  to: string
  icon: React.ReactNode
  label: string
}

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation()

  const mainNavLinks: NavLink[] = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/subscriptions', icon: <PlaySquare className="w-5 h-5" />, label: 'Subscriptions' },
  ]

  const youLinks: NavLink[] = [
    { to: '/profile/me', icon: <User className="w-5 h-5" />, label: 'Your channel' },
    { to: '/watch-history', icon: <Clock className="w-5 h-5" />, label: 'History' },
    { to: '/playlists', icon: <Folder className="w-5 h-5" />, label: 'Playlists' },
    { to: '/library', icon: <ListVideo className="w-5 h-5" />, label: 'Your videos' },
    { to: '/liked-videos', icon: <ThumbsUp className="w-5 h-5" />, label: 'Liked videos' },
  ]

  const exploreLinks: NavLink[] = [
    { to: '/tweets', icon: <MessageSquare className="w-5 h-5" />, label: 'Posts' },
  ]

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className={`${isOpen ? 'w-60' : 'w-16'
        } hidden md:flex flex-col h-screen overflow-y-auto overflow-x-hidden transition-all duration-200`}
      style={{ backgroundColor: 'var(--yt-spec-base-background)' }}
      aria-label="Navigation sidebar"
    >
      <div className={`flex flex-col ${isOpen ? 'py-3' : 'py-2'}`}>
        {/* Main Navigation */}
        <div className={`flex flex-col ${isOpen ? 'pb-3' : 'pb-2'}`} style={{ borderBottom: isOpen ? '1px solid var(--yt-spec-outline)' : 'none' }}>
          {mainNavLinks.map((link) => {
            const active = isActiveLink(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-6 px-3 py-2.5 ${isOpen ? 'mx-3 rounded-xl' : 'mx-1 rounded-lg flex-col gap-1 text-xs'}`}
                style={{
                  backgroundColor: active ? 'var(--yt-spec-additive-background)' : 'transparent',
                  color: 'var(--yt-spec-text-primary)'
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'var(--yt-spec-10-percent-layer)'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {link.icon}
                <span className={`${isOpen ? 'block text-sm font-medium' : 'block text-[10px]'}`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* You Section */}
        {isOpen && (
          <div className="flex flex-col py-3" style={{ borderBottom: '1px solid var(--yt-spec-outline)' }}>
            <h3 className="px-6 pb-1 text-base font-medium" style={{ color: 'var(--yt-spec-text-primary)' }}>
              You
            </h3>
            {youLinks.map((link) => {
              const active = isActiveLink(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-6 px-3 py-2.5 mx-3 rounded-xl"
                  style={{
                    backgroundColor: active ? 'var(--yt-spec-additive-background)' : 'transparent',
                    color: 'var(--yt-spec-text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'var(--yt-spec-10-percent-layer)'
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Explore Section */}
        {isOpen && (
          <div className="flex flex-col py-3">
            <h3 className="px-6 pb-1 text-base font-medium" style={{ color: 'var(--yt-spec-text-primary)' }}>
              Explore
            </h3>
            {exploreLinks.map((link) => {
              const active = isActiveLink(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-6 px-3 py-2.5 mx-3 rounded-xl"
                  style={{
                    backgroundColor: active ? 'var(--yt-spec-additive-background)' : 'transparent',
                    color: 'var(--yt-spec-text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'var(--yt-spec-10-percent-layer)'
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Collapsed state - show icons only */}
        {!isOpen && (
          <div className="flex flex-col pt-2">
            {youLinks.slice(0, 3).map((link) => {
              const active = isActiveLink(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex flex-col items-center gap-1 px-1 py-2.5 mx-1 rounded-lg text-xs"
                  style={{
                    backgroundColor: active ? 'var(--yt-spec-additive-background)' : 'transparent',
                    color: 'var(--yt-spec-text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'var(--yt-spec-10-percent-layer)'
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {link.icon}
                  <span className="text-[10px]">{link.label.split(' ')[0]}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
