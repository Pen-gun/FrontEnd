import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

export const useToggleLike = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: string; itemType: string }) => {
      const res = await api.post('/likes', { itemId, itemType })
      return res.data?.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['video'] })
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}

export const useLikes = (itemId?: string, itemType?: string) =>
  useQuery({
    queryKey: ['likes', itemId, itemType],
    queryFn: async () => {
      const res = await api.get('/likes', { params: { itemId, itemType } })
      return res.data?.data
    },
    enabled: Boolean(itemId && itemType),
  })
