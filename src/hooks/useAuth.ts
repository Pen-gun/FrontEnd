import { useNavigate } from 'react-router-dom'
import { useCurrentUser, useLogin, useLogout, useRegister } from '../queries/users'

export const useAuth = () => {
  const navigate = useNavigate()
  const currentUserQuery = useCurrentUser()
  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const logoutMutation = useLogout()

  const login = async (credentials: { email?: string; username?: string; password: string }) => {
    await loginMutation.mutateAsync(credentials)
    navigate('/')
  }

  const register = async (payload: { username: string; email: string; password: string }) => {
    await registerMutation.mutateAsync(payload)
    navigate('/')
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  return {
    user: currentUserQuery.data,
    isAuthenticated: Boolean(currentUserQuery.data),
    login,
    loginStatus: loginMutation.status,
    loginError: loginMutation.error,
    register,
    registerStatus: registerMutation.status,
    registerError: registerMutation.error,
    logout,
    logoutStatus: logoutMutation.status,
  }
}
