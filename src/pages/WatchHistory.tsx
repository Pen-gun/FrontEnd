import VideoGrid from '../components/VideoGrid'
import { useWatchHistory } from '../queries/users'

export default function WatchHistory() {
  const { data, isLoading, error } = useWatchHistory()
  const videos = data?.history || data || []

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Watch history</h1>
      {isLoading ? <div className="text-gray-400">Loading...</div> : null}
      {error ? <div className="text-red-500">Failed to load history</div> : null}
      <VideoGrid videos={videos} />
    </div>
  )
}
