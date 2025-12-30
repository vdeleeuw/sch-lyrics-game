import { geniusAxios } from './axios.config'
import type { AxiosError } from 'axios'

// Intercepteur de requête
geniusAxios.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => Promise.reject(error),
)

// Intercepteur de réponse
geniusAxios.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url)
    return response
  },
  (error: AxiosError) => {
    console.error('❌ Error:', error.message)

    if (error.response?.status === 401) {
      console.error('Token Genius invalide ou manquant')
    }

    return Promise.reject(error)
  },
)
