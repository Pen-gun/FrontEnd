import { useDeleteTweet, useTweets, useUpdateTweet } from '../queries/tweets'
import { useState } from 'react'

export default function TweetList({ userId }: { userId: string }) {
  const { data, isLoading, error } = useTweets(userId)
  const { mutateAsync: updateTweet } = useUpdateTweet()
  const { mutateAsync: deleteTweet } = useDeleteTweet()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  if (isLoading) return <div className="text-sm text-gray-400">Loading tweets...</div>
  if (error) return <div className="text-sm text-red-500">Failed to load tweets</div>

  const tweets = data?.tweets || data || []

  if (!tweets.length) return <div className="text-sm text-gray-400">No tweets yet.</div>

  return (
    <div className="space-y-3">
      {tweets.map((tweet: any) => (
        <div key={tweet._id} className="bg-gray-900/60 border border-gray-800 rounded p-3 space-y-2">
          {editingId === tweet._id ? (
            <div className="space-y-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
              />
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 px-3 py-1 rounded"
                  onClick={async () => {
                    await updateTweet({ tweetId: tweet._id, content: draft })
                    setEditingId(null)
                    setDraft('')
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-gray-700 px-3 py-1 rounded"
                  onClick={() => {
                    setEditingId(null)
                    setDraft('')
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-gray-400">{tweet.owner?.username || 'User'}</div>
              <div className="text-gray-100">{tweet.content}</div>
              <div className="flex gap-3 text-xs text-gray-500">
                <button
                  onClick={() => {
                    setEditingId(tweet._id)
                    setDraft(tweet.content)
                  }}
                  className="underline"
                >
                  Edit
                </button>
                <button onClick={() => deleteTweet(tweet._id)} className="underline">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
