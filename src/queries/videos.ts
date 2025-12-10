import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

type VideoParams = {
  page?: number
  limit?: number
  query?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  userId?: string
}

type VideoPayload = {
  video: File
  thumbnail: File
  title: string
  description?: string
}

type UpdatePayload = Partial<Pick<VideoPayload, 'thumbnail' | 'title' | 'description'>>

export const useVideos = (params?: VideoParams) =>
  useQuery({
    queryKey: ['videos', params],
    queryFn: async () => {
      const res = await api.get('/videos', { params })
      return res.data?.data
    },
  })

export const useVideo = (videoId?: string) =>
  useQuery({
    queryKey: ['video', videoId],
    queryFn: async () => {
      const res = await api.get(`/videos/${videoId}`)
      return res.data?.data
    },
    enabled: Boolean(videoId),
  })

export const useCreateVideo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: VideoPayload) => {
      const fd = new FormData()
      Object.entries(payload).forEach(([key, value]) => fd.append(key, value as Blob))
      const res = await api.post('/videos', fd)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['videos'] }),
  })
}

export const useTogglePublish = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (videoId: string) => {
      const res = await api.patch(`/videos/${videoId}`)
      return res.data?.data
    },
    onSuccess: (_, videoId) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      queryClient.invalidateQueries({ queryKey: ['video', videoId] })
    },
  })
}

export const useUpdateVideo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ videoId, payload }: { videoId: string; payload: UpdatePayload }) => {
      const fd = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        if (value) fd.append(key, value as Blob)
      })
      const res = await api.patch(`/videos/update-video/${videoId}`, fd)
      return res.data?.data
    },
    onSuccess: (_, { videoId }) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      queryClient.invalidateQueries({ queryKey: ['video', videoId] })
    },
  })
}

export const useDeleteVideo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (videoId: string) => {
      const res = await api.delete(`/videos/${videoId}`)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['videos'] }),
  })
}
