import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, Folder, Text, WatchIcon, Menu } from 'lucide-react';

interface NavLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const navLinks: NavLink[] = [
    { to: '/', icon: <HomeIcon className="w-6 h-6" />, label: 'Home' },
    { to: '/playlists', icon: <Folder className="w-6 h-6" />, label: 'Playlists' },
    { to: '/tweets', icon: <Text className="w-6 h-6" />, label: 'Tweets' },
    { to: '/watch-history', icon: <WatchIcon className="w-6 h-6" />, label: 'Watch History' },
  ];

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-10'
      } bg-transparent p-4 hidden md:block backdrop-blur transition-all duration-300 border-r border-opacity-10 h-screen overflow-y-auto`}
      aria-label="Navigation sidebar"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="p-1 rounded hover:bg-gray-800 transition-colors hover:cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className='font-bold text-lg text-red-500'>
            TubeLite
          </span>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 p-3 rounded transition-colors hover:bg-gray-800 active:bg-gray-700"
          >
            {link.icon}
            <span className={`overflow-hidden whitespace-nowrap ${isSidebarOpen ? 'w-auto' : 'w-0'}`}>
              <span className="">{link.label}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
