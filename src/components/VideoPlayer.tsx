type VideoSource = {
  videoFile?: string
  url?: string
  title?: string
}

export default function VideoPlayer({ video }: { video?: VideoSource }) {
  if (!video) return null
  const source = video.videoFile || video.url
  return (
    <div className="w-full rounded-lg overflow-hidden bg-black">
      {source ? (
        <video controls className="w-full h-auto" src={source} poster={undefined} />
      ) : (
        <div className="h-64 grid place-items-center text-gray-500">No video source</div>
      )}
      {video.title && <div className="p-3 font-semibold text-lg bg-stone-900">{video.title}</div>}
    </div>
  )
}
