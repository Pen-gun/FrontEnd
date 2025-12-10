import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

type Credentials = { username?: string; email?: string; password: string }

type RegisterPayload = {
  username: string
  email: string
  password: string
  fullName?: string
  avatar?: File
  coverImage?: File
}

type UpdateAccountPayload = { fullName?: string; email?: string; password?: string; username?: string }

type UploadPayload = { file: File }

const formDataFromObj = (payload: Record<string, unknown>) => {
  const fd = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      fd.append(key, value as Blob | string)
    }
  })
  return fd
}

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await api.get('/users/get-current-user')
      return res.data?.data
    },
  })

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Credentials) => {
      const res = await api.post('/users/login', payload)
      const token = res.data?.data?.accessToken
      if (token) localStorage.setItem('accessToken', token)
      return res.data?.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const fd = formDataFromObj(payload)
      const res = await api.post('/users/register', fd)
      const token = res.data?.data?.accessToken
      if (token) localStorage.setItem('accessToken', token)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await api.post('/users/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken')
      queryClient.clear()
      window.location.href = '/login'
    },
  })
}

export const useRefresh = () =>
  useMutation({
    mutationFn: async () => {
      const res = await api.post('/users/refresh-token')
      const token = res.data?.data?.accessToken
      if (token) localStorage.setItem('accessToken', token)
      return res.data?.data
    },
  })

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateAccountPayload) => {
      const res = await api.patch('/users/update-account', payload)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ file }: UploadPayload) => {
      const fd = new FormData()
      fd.append('avatar', file)
      const res = await api.patch('/users/update-avatar', fd)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  })
}

export const useUpdateCover = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ file }: UploadPayload) => {
      const fd = new FormData()
      fd.append('coverImage', file)
      const res = await api.patch('/users/update-cover-image', fd)
      return res.data?.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  })
}

export const useChannelProfile = (username?: string) =>
  useQuery({
    queryKey: ['channel', username],
    queryFn: async () => {
      const res = await api.get(`/users/get-user-channel-profile/${username}`)
      return res.data?.data
    },
    enabled: Boolean(username),
  })

export const useWatchHistory = () =>
  useQuery({
    queryKey: ['watchHistory'],
    queryFn: async () => {
      const res = await api.get('/users/get-watch-history')
      return res.data?.data
    },
  })
