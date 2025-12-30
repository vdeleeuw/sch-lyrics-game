import axios from 'axios'
import { ENV } from '@/config/env'

export const geniusAxios = axios.create({
  baseURL: ENV.GENIUS_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ENV.GENIUS_ACCESS_TOKEN}`,
  },
})
