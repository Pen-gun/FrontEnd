import { useGetVideos } from '../hooks/useApi'

export default function Home() {
  const { data, isLoading, error } = useGetVideos()

  if (isLoading) return <div className="p-8">Loading videos...</div>
  if (error) return <div className="p-8 text-red-600">Error loading videos</div>

  const videos = data?.data?.videos || []

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recommended</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <div key={video._id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition cursor-pointer">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold truncate">{video.title}</h3>
              <p className="text-sm text-gray-400">{video.owner?.username}</p>
              <p className="text-sm text-gray-400">{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
