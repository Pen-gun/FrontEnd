import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoGrid from '../components/VideoGrid'
import { useVideos } from '../queries/videos'

export default function Home() {
  const [params, setParams] = useSearchParams()
  const [page, setPage] = useState(1)

  const queryParams = useMemo(
    () => ({
      page,
      limit: 12,
      query: params.get('query') || undefined,
      sortBy: params.get('sortBy') || 'createdAt',
      order: (params.get('order') as 'asc' | 'desc') || 'desc',
    }),
    [page, params]
  )

  const { data, isLoading, error, isFetching } = useVideos(queryParams)
  const videos = data?.videos || data || []

  const updateSort = (sortBy: string, order: 'asc' | 'desc') => {
    const next = new URLSearchParams(params)
    next.set('sortBy', sortBy)
    next.set('order', order)
    setParams(next)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-bold">Explore</h1>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => updateSort('createdAt', 'desc')}
            className="px-3 py-1 rounded bg-gray-800 border border-gray-700 hover:border-red-500"
          >
            Newest
          </button>
          <button
            onClick={() => updateSort('views', 'desc')}
            className="px-3 py-1 rounded bg-gray-800 border border-gray-700 hover:border-red-500"
          >
            Top views
          </button>
        </div>
      </div>

      {isLoading || isFetching ? <div className="text-gray-400">Loading videos...</div> : null}
      {error ? <div className="text-red-500">Failed to load videos</div> : null}

      <VideoGrid videos={videos} />

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-800 border border-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-400">Page {page}</div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-800 border border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}
