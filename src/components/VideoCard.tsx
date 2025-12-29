import { Link } from 'react-router-dom'

type Owner = { username?: string; _id?: string; avatar?: string }

type Video = {
  _id: string
  title: string
  thumbnail?: string
  owner?: Owner
  views?: number
  duration?: number
  createdAt?: string
}

const formatViews = (views?: number) => {
  if (!views) return '0 views'
  if (views < 1000) return `${views} views`
  if (views < 1000000) return `${(views / 1000).toFixed(1)}K views`
  return `${(views / 1000000).toFixed(1)}M views`
}

const formatDate = (value?: string) => {
  if (!value) return ''
  const date = new Date(value)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

const formatDuration = (seconds?: number) => {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      to={`/videos/${video._id}`}
      className="flex flex-col group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: 'var(--yt-spec-general-background-a)' }}>
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm" style={{ color: 'var(--yt-spec-text-disabled)' }}>
            No thumbnail
          </div>
        )}
        {/* Duration badge */}
        {video.duration && (
          <div
            className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: 'var(--yt-spec-static-overlay-background-solid)', color: 'white' }}
          >
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      {/* Video info */}
      <div className="flex gap-3 mt-3">
        {/* Channel avatar */}
        <div className="flex-shrink-0">
          <img
            src={video.owner?.avatar || '/default-avatar.png'}
            alt={video.owner?.username || 'Channel'}
            className="w-9 h-9 rounded-full"
            style={{ backgroundColor: 'var(--yt-spec-general-background-b)' }}
          />
        </div>

        {/* Metadata */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-medium text-sm leading-5 line-clamp-2 mb-1"
            style={{ color: 'var(--yt-spec-text-primary)' }}
          >
            {video.title}
          </h3>
          <p
            className="text-xs mb-0.5"
            style={{ color: 'var(--yt-spec-text-secondary)' }}
          >
            {video.owner?.username || 'Unknown channel'}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--yt-spec-text-secondary)' }}
          >
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}
