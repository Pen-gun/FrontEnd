import type { FormEvent } from 'react'
import { useState } from 'react'
import { useCreateVideo } from '../queries/videos'

export default function Upload() {
  const { mutateAsync, isPending, error } = useCreateVideo()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!video || !thumbnail || !title.trim()) return
    await mutateAsync({ video, thumbnail, title, description })
    setTitle('')
    setDescription('')
    setVideo(null)
    setThumbnail(null)
  }

  return (
    <div className="p-6 space-y-4 max-w-2xl">
      <h1 className="text-2xl font-bold">Upload video</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-gray-900/60 border border-gray-800 rounded-lg p-4">
        <div className="space-y-2">
          <label className="text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Video file</label>
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] || null)} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Thumbnail</label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} required />
        </div>
        {error ? <div className="text-sm text-red-500">Upload failed</div> : null}
        <button
          type="submit"
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-60 px-4 py-2 rounded font-semibold"
        >
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
