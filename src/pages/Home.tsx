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

  const categories = [
    'All',
    'Music',
    'Gaming',
    'News',
    'Live',
    'Sports',
    'Podcasts',
    'Comedy',
    'Technology',
    'Education',
  ]

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(params)
    next.set('query', cat === 'All' ? '' : cat)
    setParams(next)
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Category chips */}
      <div className="sticky top-[56px] z-10 bg-stone-950/80 backdrop-blur px-1 -mx-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => {
            const active = (params.get('query') || 'All') === cat || (cat === 'All' && !params.get('query'))
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap border ${
                  active ? 'bg-amber-500 text-black border-amber-500' : 'bg-stone-800 text-white border-stone-700 hover:border-stone-500'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {isLoading || isFetching ? <div className="text-gray-400">Loading videos...</div> : null}
      {error ? <div className="text-red-500">Failed to load videos</div> : null}

      <VideoGrid videos={videos} />

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-stone-800 border border-stone-700 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-400">Page {page}</div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-stone-800 border border-stone-700"
        >
          Next
        </button>
      </div>
    </div>
  )
}
