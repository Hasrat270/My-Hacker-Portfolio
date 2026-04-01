/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../services/axios.js'
import { setUser, clearUser } from '../store/authSlice.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector(s => s.auth)

  // 1. Session Hydration: Refresh hone par user fetch karega
  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ['check-session'],
    queryFn: async () => {
      try {
        const res = await api.get('/profile')
        dispatch(setUser(res.data))
        return res.data
      } catch (err) {
        dispatch(clearUser())
        throw err // 401 Unauthorized handle karne ke liye
      }
    },
    retry: false, // Baar baar try na kare agar login nahi hai
    staleTime: Infinity, 
  })

  // 2. Login Logic
  const loginMutation = useMutation({
    mutationFn: data => api.post('/auth/login', data),
    onSuccess: res => {
      dispatch(setUser(res.data))
      navigate('/dashboard')
    },
  })

  // 3. Logout Logic
  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      dispatch(clearUser())
      navigate('/login')
    },
  })

  // 4. Critical: Prevent Protected Route Flicker
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="font-mono text-xs text-[#00ff41] animate-pulse uppercase tracking-[0.3em]">
          {'>'} initializing_secure_handshake...
        </p>
      </div>
    )
  }

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