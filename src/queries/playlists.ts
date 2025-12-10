import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

type PlaylistPayload = { name: string; description?: string }

export const usePlaylists = () =>
  useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const res = await api.get('/playlists')
      return res.data?.data
    },
  })

export const usePlaylist = (playlistId?: string) =>
  useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: async () => {
      const res = await api.get(`/playlists/${playlistId}`)
      return res.data?.data
    },
    enabled: Boolean(playlistId),
  })

export const useUserPlaylists = (userId?: string) =>
  useQuery({
    queryKey: ['userPlaylists', userId],
    queryFn: async () => {
      const res = await api.get(`/playlists/user/${userId}`)
      return res.data?.data
    },
    enabled: Boolean(userId),
  })

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: PlaylistPayload) => {
      const res = await api.post('/playlists', payload)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['playlists'] }),
  })
}

export const useAddToPlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ videoId, playlistId }: { videoId: string; playlistId: string }) => {
      const res = await api.put(`/playlists/${videoId}`, { playlistId })
      return res.data?.data
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistId] })
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })
}

export const useRemoveFromPlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ videoId, playlistId }: { videoId: string; playlistId: string }) => {
      const res = await api.delete(`/playlists/${videoId}`, { data: { playlistId } })
      return res.data?.data
    },
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistId] })
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })
}

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (playlistId: string) => {
      const res = await api.delete(`/playlists/d/${playlistId}`)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['playlists'] }),
  })
}
