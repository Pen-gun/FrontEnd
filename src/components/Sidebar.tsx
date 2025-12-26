import { Link } from 'react-router-dom';
import { HomeIcon, Folder, Text, WatchIcon, Menu, PlaySquare, ListVideo, User } from 'lucide-react';

interface NavLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {

  const navLinks: NavLink[] = [
    { to: '/', icon: <HomeIcon className="w-6 h-6" />, label: 'Home' },
    { to: '/subscriptions', icon: <PlaySquare className="w-6 h-6" />, label: 'Subscriptions' },
    { to: '/playlists', icon: <Folder className="w-6 h-6" />, label: 'Playlists' },
    { to: '/tweets', icon: <Text className="w-6 h-6" />, label: 'Tweets' },
    { to: '/watch-history', icon: <WatchIcon className="w-6 h-6" />, label: 'Watch History' },
    { to: '/profile/me', icon: <User className="w-6 h-6" />, label: 'You' },
    { to: '/library', icon: <ListVideo className="w-6 h-6" />, label: 'Library' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } bg-stone-900/70 p-4 hidden md:block backdrop-blur transition-all duration-300 border-r border-stone-800 h-screen overflow-y-auto`}
      aria-label="Navigation sidebar"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onToggle}
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            className="p-1 rounded hover:bg-stone-800 transition-colors hover:cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className={`font-bold text-lg text-amber-500 overflow-hidden whitespace-nowrap ${isOpen ? 'w-auto' : 'w-0'}`}>TubeLite</span>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 p-3 rounded transition-colors hover:bg-stone-800 active:bg-stone-700"
          >
            {link.icon}
            <span className={`overflow-hidden whitespace-nowrap ${isOpen ? 'w-auto' : 'w-0'}`}>
              <span className="">{link.label}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
