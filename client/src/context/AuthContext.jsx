/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios.js'
import { setUser, clearUser } from '../store/authSlice.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { user, isAuthenticated } = useSelector(s => s.auth)

  const loginMutation = useMutation({
    mutationFn: data => api.post('/auth/login', data),
    onSuccess: res => {
      dispatch(setUser(res.data))
      navigate('/dashboard')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      dispatch(clearUser())
      navigate('/')
    },
  })

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login:        loginMutation.mutate,
      logout:       logoutMutation.mutate,
      loginLoading: loginMutation.isPending,
      loginError:   loginMutation.error,
    }}>
      {children}
    </AuthContext.Provider>
  )
}