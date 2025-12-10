import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

export const useTweets = (userId?: string) =>
  useQuery({
    queryKey: ['tweets', userId],
    queryFn: async () => {
      const res = await api.get(`/tweets/${userId}`)
      return res.data?.data
    },
    enabled: Boolean(userId),
  })

export const useCreateTweet = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { content: string }) => {
      const res = await api.post('/tweets', payload)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tweets'] }),
  })
}

export const useUpdateTweet = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ tweetId, content }: { tweetId: string; content: string }) => {
      const res = await api.put(`/tweets/${tweetId}`, { content })
      return res.data?.data
    },
    onSuccess: (_, { tweetId }) => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] })
      queryClient.invalidateQueries({ queryKey: ['tweet', tweetId] })
    },
  })
}

export const useDeleteTweet = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await api.delete(`/tweets/${tweetId}`)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tweets'] }),
  })
}
