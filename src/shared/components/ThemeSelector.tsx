import React from 'react'
import { Palette } from 'lucide-react'
import { useTheme, type Theme } from '@/shared/hooks/useTheme'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const themes: Array<{ name: Theme; color: string; label: string }> = [
    { name: 'violet', color: 'bg-purple-600', label: 'Violet' },
    { name: 'blue', color: 'bg-blue-600', label: 'Bleu' },
    { name: 'green', color: 'bg-green-600', label: 'Vert' },
    { name: 'orange', color: 'bg-orange-600', label: 'Orange' },
  ]

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 p-2 backdrop-blur-sm">
      <Palette className="h-5 w-5 text-white" />
      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`h-8 w-8 rounded-full ${t.color} transition-all ${
              theme === t.name
                ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent'
                : 'opacity-70 hover:opacity-100'
            }`}
            title={t.label}
            aria-label={`Thème ${t.label}`}
          />
        ))}
      </div>
    </div>
  )
}
