import { Link } from 'react-router-dom'

type Owner = { username?: string; _id?: string }

type Video = {
  _id: string
  title: string
  thumbnail?: string
  owner?: Owner
  views?: number
  createdAt?: string
}

const formatDate = (value?: string) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link to={`/videos/${video._id}`} className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden hover:border-red-500 transition">
      <div className="aspect-video bg-gray-800">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-500 text-sm">No thumbnail</div>
        )}
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-400">{video.owner?.username || 'Unknown channel'}</p>
        <p className="text-xs text-gray-500">{`${video.views ?? 0} views • ${formatDate(video.createdAt)}`}</p>
      </div>
    </Link>
  )
}
