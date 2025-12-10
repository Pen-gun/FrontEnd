import type { FormEvent } from 'react'
import { useState } from 'react'
import { useCreateComment } from '../queries/comments'

export default function CommentForm({ videoId }: { videoId: string }) {
  const [content, setContent] = useState('')
  const { mutateAsync, isPending } = useCreateComment()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await mutateAsync({ videoId, content })
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment"
        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-60 px-4 py-2 rounded font-semibold"
        >
          {isPending ? 'Posting...' : 'Comment'}
        </button>
      </div>
    </form>
  )
}
