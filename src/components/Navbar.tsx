import { Link } from 'react-router-dom'
import { useGetCurrentUser, useLogoutUser } from '../hooks/useApi'

export default function Navbar() {
  const { data: user } = useGetCurrentUser()
  const { mutate: logout } = useLogoutUser()

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-red-600">
            YouTube
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-700 text-white px-4 py-2 rounded-full w-80 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/upload" className="bg-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-700">
                Upload
              </Link>
              <img
                src={user.data?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <button
                onClick={() => logout()}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-700">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
