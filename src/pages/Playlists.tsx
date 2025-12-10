import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreatePlaylist, useDeletePlaylist, usePlaylists } from '../queries/playlists'

export default function Playlists() {
  const { data, isLoading, error } = usePlaylists()
  const { mutateAsync: create, isPending } = useCreatePlaylist()
  const { mutateAsync: remove } = useDeletePlaylist()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await create({ name, description })
    setName('')
    setDescription('')
  }

  const playlists = data?.playlists || data || []

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Playlists</h1>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded px-4 py-2 font-semibold"
          >
            {isPending ? 'Creating...' : 'Create playlist'}
          </button>
        </form>
      </div>

      {isLoading ? <div className="text-gray-400">Loading...</div> : null}
      {error ? <div className="text-red-500">Failed to load playlists</div> : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((pl: any) => (
          <div key={pl._id} className="bg-gray-900/60 border border-gray-800 rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{pl.name}</div>
              <button
                onClick={() => remove(pl._id)}
                className="text-xs text-red-400 hover:text-red-300 underline"
              >
                Delete
              </button>
            </div>
            <div className="text-sm text-gray-400 line-clamp-2">{pl.description}</div>
            <div className="text-xs text-gray-500">{pl.videos?.length || 0} videos</div>
            <Link to={`/playlists/${pl._id}`} className="text-sm text-blue-400 hover:underline">
              View playlist
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
