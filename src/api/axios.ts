import axios, { AxiosError } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

type RefreshResponse = { data?: { accessToken?: string } }

type FailedRequest = {
  resolve: (value: unknown) => void
  reject: (error: unknown) => void
  config: InternalAxiosRequestConfig
}

let isRefreshing = false
const failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
      resolve(api(config))
    } else {
      reject(error)
    }
  })
  failedQueue.length = 0
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      isRefreshing = true

      try {
        const refreshResponse = await axios.post<RefreshResponse>(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        )

        const newToken = refreshResponse.data?.data?.accessToken || null

        if (newToken) {
          localStorage.setItem('accessToken', newToken)
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`
        }

        processQueue(null, newToken)

        if (newToken) {
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
