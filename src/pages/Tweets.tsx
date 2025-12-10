import { useParams } from 'react-router-dom'
import TweetForm from '../components/TweetForm'
import TweetList from '../components/TweetList'
import { useCurrentUser } from '../queries/users'

export default function Tweets() {
  const { userId } = useParams<{ userId?: string }>()
  const { data: me } = useCurrentUser()
  const targetId = userId || me?._id

  if (!targetId) return <div className="p-6 text-red-500">Login to view tweets.</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tweets</h1>
      </div>
      <TweetForm />
      <TweetList userId={targetId} />
    </div>
  )
}
