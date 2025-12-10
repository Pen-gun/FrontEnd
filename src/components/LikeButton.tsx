import { useToggleLike } from '../queries/likes'

export default function LikeButton({ itemId, itemType, count }: { itemId: string; itemType: string; count?: number }) {
  const { mutateAsync, isPending } = useToggleLike()

  return (
    <button
      onClick={() => mutateAsync({ itemId, itemType })}
      disabled={isPending}
      className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 px-4 py-2 rounded"
    >
      <span>👍</span>
      <span className="text-sm">{isPending ? '...' : count ?? 0}</span>
    </button>
  )
}
