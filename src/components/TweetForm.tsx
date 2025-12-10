import type { FormEvent } from 'react'
import { useState } from 'react'
import { useCreateTweet } from '../queries/tweets'

export default function TweetForm() {
  const [content, setContent] = useState('')
  const { mutateAsync, isPending } = useCreateTweet()

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await mutateAsync({ content })
    setContent('')
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded"
        >
          {isPending ? 'Posting...' : 'Tweet'}
        </button>
      </div>
    </form>
  )
}
