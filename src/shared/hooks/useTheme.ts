import { useEffect, useState } from 'react'

export type Theme = 'violet' | 'blue' | 'green' | 'orange'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sch-lyrics-theme') as Theme
      return savedTheme || 'violet'
    }
    return 'violet'
  })

  useEffect(() => {
    const root = document.documentElement
    root.removeAttribute('data-theme')
    if (theme !== 'violet') {
      root.setAttribute('data-theme', theme)
    }
    localStorage.setItem('sch-lyrics-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
