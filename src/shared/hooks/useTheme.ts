import { useEffect, useState } from 'react'

export type Theme = 'violet' | 'blue' | 'green' | 'orange' | 'pink' | 'red'

const THEME_STORAGE_KEY = 'sch-lyrics-theme'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || 'violet'
    }
    return 'violet'
  })

  useEffect(() => {
    const root = document.documentElement
    root.removeAttribute('data-theme')

    if (theme !== 'violet') {
      root.setAttribute('data-theme', theme)
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
