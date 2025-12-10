import { useState } from 'react'
import { useAddToPlaylist, useCreatePlaylist, usePlaylists, useRemoveFromPlaylist } from '../queries/playlists'

export default function PlaylistManager({ videoId }: { videoId: string }) {
  const { data, isLoading } = usePlaylists()
  const { mutateAsync: add } = useAddToPlaylist()
  const { mutateAsync: remove } = useRemoveFromPlaylist()
  const { mutateAsync: create, isPending: isCreating } = useCreatePlaylist()
  const [newName, setNewName] = useState('')

  const playlists = data?.playlists || data || []

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New playlist name"
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2"
        />
        <button
          onClick={async () => {
            if (!newName.trim()) return
            await create({ name: newName })
            setNewName('')
          }}
          disabled={isCreating}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-2 rounded"
        >
          {isCreating ? 'Adding...' : 'Create'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-400">Add / remove from playlists</div>
        {isLoading ? (
          <div className="text-sm text-gray-400">Loading playlists...</div>
        ) : playlists.length ? (
          <div className="space-y-2">
            {playlists.map((pl: any) => (
              <div key={pl._id} className="flex items-center justify-between bg-gray-900/60 border border-gray-800 rounded px-3 py-2">
                <div>
                  <div className="font-semibold">{pl.name}</div>
                  <div className="text-xs text-gray-500">{pl.videos?.length || 0} videos</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => add({ videoId, playlistId: pl._id })}
                    className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => remove({ videoId, playlistId: pl._id })}
                    className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">No playlists yet.</div>
        )}
      </div>
    </div>
  )
}
