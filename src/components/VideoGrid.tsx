import VideoCard from './VideoCard'

type Video = {
  _id: string
  title: string
  thumbnail?: string
  owner?: { username?: string; avatar?: string }
  views?: number
  duration?: number
  createdAt?: string
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  if (!videos.length) {
    return (
      <div className="text-center py-12">
        <p className="text-sm" style={{ color: 'var(--yt-spec-text-secondary)' }}>
          No videos found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}
