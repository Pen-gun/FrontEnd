import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

export const useComments = (videoId?: string) =>
  useQuery({
    queryKey: ['comments', videoId],
    queryFn: async () => {
      const res = await api.get(`/comment/${videoId}`)
      return res.data?.data
    },
    enabled: Boolean(videoId),
  })

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ videoId, content }: { videoId: string; content: string }) => {
      const res = await api.post(`/comment/${videoId}`, { comment: content })
      return res.data?.data
    },
    onSuccess: (_, { videoId }) => queryClient.invalidateQueries({ queryKey: ['comments', videoId] }),
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ commentId, content }: { commentId: string; content: string }) => {
      const res = await api.patch(`/comment/${commentId}`, { comment: content })
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const res = await api.delete(`/comment/${commentId}`)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
  })
}
