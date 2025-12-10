import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

export const useToggleSubscription = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (channelId: string) => {
      const res = await api.post(`/subscriptions/${channelId}`)
      return res.data?.data
    },
    onSuccess: (_, channelId) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', channelId] })
      queryClient.invalidateQueries({ queryKey: ['channel', channelId] })
    },
  })
}

export const useSubscriberCount = (channelId?: string) =>
  useQuery({
    queryKey: ['subscription', channelId],
    queryFn: async () => {
      const res = await api.get(`/subscriptions/${channelId}`)
      return res.data?.data
    },
    enabled: Boolean(channelId),
  })
