import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import PlaylistDetail from './pages/PlaylistDetail'
import Playlists from './pages/Playlists'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Tweets from './pages/Tweets'
import VideoDetail from './pages/VideoDetail'
import WatchHistory from './pages/WatchHistory'
import Upload from './pages/Upload'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/videos/:videoId', element: <VideoDetail /> },
      { path: '/profile/:username', element: <Profile /> },
      { path: '/playlists', element: <Playlists /> },
      { path: '/playlists/:playlistId', element: <PlaylistDetail /> },
      { path: '/tweets', element: <Tweets /> },
      { path: '/tweets/:userId', element: <Tweets /> },
      { path: '/upload', element: <Upload /> },
      { path: '/watch-history', element: <WatchHistory /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default router
