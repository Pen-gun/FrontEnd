import VideoCard from './VideoCard'

type Video = {
  _id: string
  title: string
  thumbnail?: string
  owner?: { username?: string }
  views?: number
  createdAt?: string
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  if (!videos.length) return <div className="text-sm text-gray-400">No videos found.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}
