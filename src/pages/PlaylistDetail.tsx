import { useParams } from 'react-router-dom'
import PlaylistManager from '../components/PlaylistManager'
import VideoGrid from '../components/VideoGrid'
import { usePlaylist } from '../queries/playlists'

export default function PlaylistDetail() {
  const { playlistId } = useParams<{ playlistId: string }>()
  const { data, isLoading, error } = usePlaylist(playlistId)

  if (!playlistId) return <div className="p-6 text-red-500">Missing playlist id</div>
  if (isLoading) return <div className="p-6">Loading playlist...</div>
  if (error) return <div className="p-6 text-red-500">Failed to load playlist</div>

  const playlist = data?.playlist || data

  if (!playlist) return <div className="p-6">Not found</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{playlist.name}</h1>
          <p className="text-gray-400">{playlist.description}</p>
        </div>
        {playlist.videos?.[0]?._id ? <PlaylistManager videoId={playlist.videos[0]._id} /> : null}
      </div>

      <VideoGrid videos={playlist.videos || []} />
    </div>
  )
}
