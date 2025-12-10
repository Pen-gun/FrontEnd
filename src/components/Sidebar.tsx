import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
      <div className="space-y-4">
        <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <span className="text-2xl">🏠</span>
          <span>Home</span>
        </Link>
        <Link to="/trending" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <span className="text-2xl">🔥</span>
          <span>Trending</span>
        </Link>
        <Link to="/subscriptions" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <span className="text-2xl">📺</span>
          <span>Subscriptions</span>
        </Link>
        <Link to="/library" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <span className="text-2xl">📚</span>
          <span>Library</span>
        </Link>
        <Link to="/watch-history" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <span className="text-2xl">⏱️</span>
          <span>Watch History</span>
        </Link>
      </div>
    </aside>
  )
}
