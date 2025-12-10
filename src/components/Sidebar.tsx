import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900/80 border-r border-gray-800 p-4 hidden md:block backdrop-blur">
      <div className="space-y-4">
        <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800">
          <span className="text-2xl">🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/playlists" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800">
          <span className="text-2xl">📂</span>
          <span>Playlists</span>
        </Link>
        <Link to="/tweets" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800">
          <span className="text-2xl">💬</span>
          <span>Tweets</span>
        </Link>
        <Link to="/watch-history" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800">
          <span className="text-2xl">⏱️</span>
          <span>Watch History</span>
        </Link>
      </div>
    </aside>
  )
}
