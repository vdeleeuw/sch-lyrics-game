export const ENV = {
  GENIUS_ACCESS_TOKEN: import.meta.env.VITE_GENIUS_ACCESS_TOKEN || '',
  GENIUS_API_BASE_URL: 'https://api.genius.com',
} as const
