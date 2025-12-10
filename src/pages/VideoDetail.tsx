import { useParams } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import LikeButton from '../components/LikeButton'
import PlaylistManager from '../components/PlaylistManager'
import SubscribeButton from '../components/SubscribeButton'
import VideoPlayer from '../components/VideoPlayer'
import { useVideo } from '../queries/videos'

export default function VideoDetail() {
  const { videoId } = useParams<{ videoId: string }>()
  const { data, isLoading, error } = useVideo(videoId)

  if (!videoId) return <div className="p-6 text-red-500">Missing video id</div>
  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Failed to load video</div>

  const video = data?.video || data

  if (!video) return <div className="p-6 text-red-500">Video not found</div>

  return (
    <div className="p-6 space-y-6">
      <VideoPlayer video={video} />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-300 whitespace-pre-line">{video.description}</p>
        <div className="flex items-center gap-4">
          <LikeButton itemId={video._id} itemType="Video" count={video.likesCount} />
          {video.owner?._id ? <SubscribeButton channelId={video.owner._id} /> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CommentForm videoId={video._id} />
          <CommentList videoId={video._id} />
        </div>
        <div className="lg:col-span-1">
          <PlaylistManager videoId={video._id} />
        </div>
      </div>
    </div>
  )
}
