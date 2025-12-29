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
      limit: 20,
      query: params.get('query') || undefined,
      sortBy: params.get('sortBy') || 'createdAt',
      order: (params.get('order') as 'asc' | 'desc') || 'desc',
    }),
    [page, params]
  )

  const { data, isLoading, error, isFetching } = useVideos(queryParams)
  const videos = data?.videos || data || []

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
    'Movies',
    'Fashion',
  ]

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(params)
    next.set('query', cat === 'All' ? '' : cat)
    setParams(next)
    setPage(1)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Category chips - sticky */}
      <div
        className="sticky top-0 z-10 px-6 py-3 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--yt-spec-base-background)' }}
      >
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const active = (params.get('query') || 'All') === cat || (cat === 'All' && !params.get('query'))
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors"
                style={{
                  backgroundColor: active ? 'var(--yt-spec-text-primary)' : 'var(--yt-spec-badge-chip-background)',
                  color: active ? 'var(--yt-spec-base-background)' : 'var(--yt-spec-text-primary)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {isLoading && !isFetching ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--yt-spec-text-primary)' }}></div>
              <p style={{ color: 'var(--yt-spec-text-secondary)' }}>Loading videos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-lg mb-2" style={{ color: 'var(--yt-spec-error-background)' }}>Failed to load videos</p>
              <p className="text-sm" style={{ color: 'var(--yt-spec-text-secondary)' }}>Please try again later</p>
            </div>
          </div>
        ) : (
          <>
            <VideoGrid videos={videos} />

            {/* Pagination */}
            {videos.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-12 mb-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-30"
                  style={{
                    backgroundColor: 'var(--yt-spec-badge-chip-background)',
                    color: 'var(--yt-spec-text-primary)'
                  }}
                >
                  Previous
                </button>
                <div className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--yt-spec-text-secondary)' }}>
                  Page {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={videos.length < queryParams.limit}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-30"
                  style={{
                    backgroundColor: 'var(--yt-spec-badge-chip-background)',
                    color: 'var(--yt-spec-text-primary)'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
