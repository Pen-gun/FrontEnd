import { useComments } from '../queries/comments'

export default function CommentList({ videoId }: { videoId: string }) {
  const { data, isLoading, error } = useComments(videoId)

  if (isLoading) return <div className="text-sm text-gray-400">Loading comments...</div>
  if (error) return <div className="text-sm text-red-500">Failed to load comments</div>

  const comments = data?.comments || data || []

  if (!comments.length) return <div className="text-sm text-gray-400">No comments yet.</div>

  return (
    <div className="space-y-3">
      {comments.map((comment: any) => (
        <div key={comment._id} className="bg-gray-900/60 border border-gray-800 rounded p-3">
          <div className="text-sm font-semibold">{comment.owner?.username || 'Anonymous'}</div>
          <p className="text-sm text-gray-200">{comment.content || comment.comment}</p>
        </div>
      ))}
    </div>
  )
}
