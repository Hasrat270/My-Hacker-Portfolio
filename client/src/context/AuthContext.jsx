import { createContext, useState, useCallback, useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../api/apiClient.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [user, setUserState] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setUser = useCallback((data) => {
    setUserState(data)
    setIsAuthenticated(!!data)
  }, [])

  const clearUser = useCallback(() => {
    setUserState(null)
    setIsAuthenticated(false)
  }, [])

  // 1. Session Hydration: Refresh hone par user fetch karega
  const { isLoading: isCheckingAuth } = useQuery({
    queryKey: ['check-session'],
    queryFn: async () => {
      // Prevent ghost cookie resurrection: if local token is gone, abort.
      if (!localStorage.getItem('token')) {
        clearUser()
        throw new Error('No local token')
      }
      try {
        const res = await api.get('/profile')
        setUser(res.data)
        return res.data
      } catch (err) {
        clearUser()
        throw err
      }
    },
    retry: false,
    staleTime: Infinity,
  })

  // 2. Login Logic
  const loginMutation = useMutation({
    mutationFn: data => api.post('/auth/login', data),
    onSuccess: res => {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
      }
      setUser(res.data)
      navigate('/dashboard')
    },
  })

  // 3. Logout Logic
  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSettled: () => {
      localStorage.removeItem('token')
      queryClient.clear()
      clearUser()
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

// Convenience hook
export function useAuth() {
  return useContext(AuthContext)
}