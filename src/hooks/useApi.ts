import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../utils/apiClient'

// Videos
export const useGetVideos = (params?: any) => {
  return useQuery({
    queryKey: ['videos', params],
    queryFn: () => apiClient.get('/videos', { params }).then((res) => res.data?.data),
  })
}

export const useGetVideoById = (videoId: string) => {
  return useQuery({
    queryKey: ['video', videoId],
    queryFn: () => apiClient.get(`/videos/${videoId}`).then((res) => res.data?.data),
    enabled: !!videoId,
  })
}

export const usePublishVideo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => apiClient.post('/videos', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
    },
  })
}

// Users
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: FormData) => apiClient.post('/users/register', data),
  })
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: { email?: string; username?: string; password: string }) =>
      apiClient.post('/users/login', data),
  })
}

export const useLogoutUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiClient.post('/users/logout'),
    onSuccess: () => {
      queryClient.clear()
      localStorage.clear()
    },
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.get('/users/get-current-user').then((res) => res.data?.data),
  })
}

// Comments
export const useGetComments = (videoId: string) => {
  return useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => apiClient.get(`/comment/${videoId}`).then((res) => res.data?.data),
    enabled: !!videoId,
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ videoId, content }: { videoId: string; content: string }) =>
      apiClient.post(`/comment/${videoId}`, { comment: content }),
    onSuccess: (_, { videoId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', videoId] })
    },
  })
}

// Likes
export const useToggleLike = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, itemType }: { itemId: string; itemType: string }) =>
      apiClient.post('/likes', { itemId, itemType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}

// Subscriptions
export const useSubscribe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (channelId: string) => apiClient.post(`/subscriptions/${channelId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
  })
}

export const useGetSubscriberCount = (channelId: string) => {
  return useQuery({
    queryKey: ['subscriberCount', channelId],
    queryFn: () => apiClient.get(`/subscriptions/${channelId}`).then((res) => res.data?.data),
    enabled: !!channelId,
  })
}
