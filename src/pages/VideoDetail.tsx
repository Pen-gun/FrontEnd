import { useParams, Link } from 'react-router-dom'
import { Share2, MoreHorizontal } from 'lucide-react'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import LikeButton from '../components/LikeButton'
import PlaylistManager from '../components/PlaylistManager'
import SubscribeButton from '../components/SubscribeButton'
import VideoPlayer from '../components/VideoPlayer'
import { useVideo, useVideos } from '../queries/videos'

const formatViews = (views?: number) => {
  if (!views) return '0 views'
  if (views < 1000) return `${views} views`
  if (views < 1000000) return `${(views / 1000).toFixed(1)}K views`
  return `${(views / 1000000).toFixed(1)}M views`
}

const formatDate = (value?: string) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default function VideoDetail() {
  const { videoId } = useParams<{ videoId: string }>()
  const { data, isLoading, error } = useVideo(videoId)

  if (!videoId) return <div className="p-6" style={{ color: 'var(--yt-spec-error-background)' }}>Missing video id</div>
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--yt-spec-text-primary)' }}></div>
      </div>
    )
  }
  if (error) return <div className="p-6" style={{ color: 'var(--yt-spec-error-background)' }}>Failed to load video</div>

  const video = data?.video || data

  if (!video) return <div className="p-6" style={{ color: 'var(--yt-spec-error-background)' }}>Video not found</div>

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-[1800px] mx-auto">
      {/* Main content */}
      <div className="flex-1 space-y-4">
        {/* Video player */}
        <VideoPlayer video={video} />

        {/* Video title */}
        <h1 className="text-xl font-semibold" style={{ color: 'var(--yt-spec-text-primary)' }}>
          {video.title}
        </h1>

        {/* Channel info and actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Channel info */}
          <div className="flex items-center gap-3">
            <Link to={`/profile/${video.owner?.username || 'unknown'}`}>
              <img
                src={video.owner?.avatar || '/default-avatar.png'}
                alt={video.owner?.username || 'Channel'}
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: 'var(--yt-spec-general-background-b)' }}
              />
            </Link>
            <div>
              <Link to={`/profile/${video.owner?.username || 'unknown'}`}>
                <p className="font-medium text-sm" style={{ color: 'var(--yt-spec-text-primary)' }}>
                  {video.owner?.username || 'Unknown channel'}
                </p>
              </Link>
              <p className="text-xs" style={{ color: 'var(--yt-spec-text-secondary)' }}>
                {video.owner?.subscribersCount || 0} subscribers
              </p>
            </div>
            {video.owner?._id && <SubscribeButton channelId={video.owner._id} />}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <LikeButton itemId={video._id} itemType="Video" count={video.likesCount} />
            <button
              className="px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
              style={{ backgroundColor: 'var(--yt-spec-badge-chip-background)', color: 'var(--yt-spec-text-primary)' }}
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button
              className="p-2 rounded-full"
              style={{ backgroundColor: 'var(--yt-spec-badge-chip-background)', color: 'var(--yt-spec-text-primary)' }}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: 'var(--yt-spec-badge-chip-background)' }}
        >
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--yt-spec-text-primary)' }}>
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
          <p className="text-sm whitespace-pre-line" style={{ color: 'var(--yt-spec-text-primary)' }}>
            {video.description || 'No description'}
          </p>
        </div>

        {/* Comments section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--yt-spec-text-primary)' }}>
            {video.commentsCount || 0} Comments
          </h2>
          <CommentForm videoId={video._id} />
          <CommentList videoId={video._id} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-[400px] space-y-4">
        <PlaylistManager videoId={video._id} />
        <RecommendedList />
      </div>
    </div>
  )
}

function RecommendedList() {
  const { data, isLoading } = useVideos({ limit: 12, sortBy: 'views', order: 'desc' })
  const videos = data?.videos || data || []

  return (
    <div className="space-y-2">
      {isLoading ? (
        <div className="text-sm" style={{ color: 'var(--yt-spec-text-secondary)' }}>Loading…</div>
      ) : (
        <div className="flex flex-col gap-2">
          {videos.slice(0, 10).map((v: any) => (
            <Link
              key={v._id}
              to={`/videos/${v._id}`}
              className="flex gap-2 group rounded-lg p-2 -mx-2 hover:bg-white/5"
            >
              <div className="flex-shrink-0 relative" style={{ width: '168px', height: '94px' }}>
                <img
                  src={v.thumbnail || '/placeholder.png'}
                  alt={v.title}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ backgroundColor: 'var(--yt-spec-general-background-a)' }}
                />
                {v.duration && (
                  <div
                    className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-xs font-medium"
                    style={{ backgroundColor: 'var(--yt-spec-static-overlay-background-solid)', color: 'white' }}
                  >
                    {Math.floor(v.duration / 60)}:{(v.duration % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm leading-5 line-clamp-2 mb-1" style={{ color: 'var(--yt-spec-text-primary)' }}>
                  {v.title}
                </h3>
                <p className="text-xs mb-0.5" style={{ color: 'var(--yt-spec-text-secondary)' }}>
                  {v.owner?.username || 'Unknown'}
                </p>
                <p className="text-xs" style={{ color: 'var(--yt-spec-text-secondary)' }}>
                  {formatViews(v.views)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
