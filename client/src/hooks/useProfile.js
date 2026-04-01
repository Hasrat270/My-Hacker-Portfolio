import { useQuery } from '@tanstack/react-query'
import api from '../services/axios.js'

export default function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data
    },
  })
}