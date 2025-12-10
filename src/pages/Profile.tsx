import { useParams } from 'react-router-dom'
import SubscribeButton from '../components/SubscribeButton'
import VideoGrid from '../components/VideoGrid'
import { useChannelProfile } from '../queries/users'
import { useVideos } from '../queries/videos'
import { useSubscriberCount } from '../queries/subscriptions'
import { useUserPlaylists } from '../queries/playlists'

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading, error } = useChannelProfile(username)
  const userId = data?._id || data?.userId
  const videosQuery = useVideos({ userId })
  const playlistsQuery = useUserPlaylists(userId)
  const { data: subs } = useSubscriberCount(userId)

  if (!username) return <div className="p-6 text-red-500">Missing username</div>
  if (isLoading) return <div className="p-6">Loading profile...</div>
  if (error) return <div className="p-6 text-red-500">Failed to load profile</div>

  const profile = data?.channel || data || {}

  return (
    <div className="p-6 space-y-6">
      <div className="h-48 rounded-xl bg-gradient-to-r from-red-500/40 to-purple-500/30 border border-gray-800 flex items-end p-6">
        <div className="flex items-end gap-4">
          <img
            src={profile.avatar || '/default-avatar.png'}
            alt={profile.username}
            className="w-24 h-24 rounded-full border-4 border-gray-900"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p className="text-gray-300">{profile.fullName}</p>
            <p className="text-sm text-gray-400">{subs?.count ?? subs ?? 0} subscribers</p>
          </div>
          {userId ? <SubscribeButton channelId={userId} /> : null}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Videos</h2>
        <VideoGrid videos={videosQuery.data?.videos || videosQuery.data || []} />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Playlists</h2>
        {playlistsQuery.isLoading ? (
          <div className="text-sm text-gray-400">Loading playlists...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(playlistsQuery.data?.playlists || playlistsQuery.data || []).map((pl: any) => (
              <div key={pl._id} className="bg-gray-900/60 border border-gray-800 rounded p-4 space-y-2">
                <div className="font-semibold">{pl.name}</div>
                <div className="text-sm text-gray-400">{pl.description}</div>
                <div className="text-xs text-gray-500">{pl.videos?.length || 0} videos</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
