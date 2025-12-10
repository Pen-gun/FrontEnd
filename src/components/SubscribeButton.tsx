import { useSubscriberCount, useToggleSubscription } from '../queries/subscriptions'

export default function SubscribeButton({ channelId }: { channelId: string }) {
  const { data } = useSubscriberCount(channelId)
  const { mutateAsync, isPending } = useToggleSubscription()
  const count = data?.count ?? data ?? 0

  return (
    <button
      onClick={() => mutateAsync(channelId)}
      disabled={isPending}
      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded font-semibold"
    >
      <span>Subscribe</span>
      <span className="text-sm bg-black/20 px-2 py-0.5 rounded">{count}</span>
    </button>
  )
}
