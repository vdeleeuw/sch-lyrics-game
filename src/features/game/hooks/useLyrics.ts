import { GAME_CONSTANTS } from '@/shared/utils/constants'
import { useMemo } from 'react'

interface UseLyricsResult {
  lyricsWithBlanks: string[]
  blanks: Map<number, string>
}

export const useLyricsWithBlanks = (
  lyrics: string[],
  percentage: number = GAME_CONSTANTS.BLANK_PERCENTAGE,
): UseLyricsResult => {
  return useMemo(() => {
    const blanks = new Map<number, string>()
    const numberOfBlanks = Math.floor(lyrics.length * percentage)
    const indices = new Set<number>()

    // Sélectionner des indices aléatoires
    while (indices.size < numberOfBlanks && indices.size < lyrics.length) {
      const randomIndex = Math.floor(Math.random() * lyrics.length)
      indices.add(randomIndex)
    }

    // Pour chaque indice, choisir un mot aléatoire
    indices.forEach((index) => {
      const line = lyrics[index]
      const words = line.split(' ').filter((w) => w.length >= GAME_CONSTANTS.MIN_WORD_LENGTH)

      if (words.length > 0) {
        const randomWordIndex = Math.floor(Math.random() * words.length)
        blanks.set(index, words[randomWordIndex])
      }
    })

    // Créer les paroles avec les blancs
    const lyricsWithBlanks = lyrics.map((line, index) => {
      if (blanks.has(index)) {
        const wordToHide = blanks.get(index)!
        return line.replace(wordToHide, GAME_CONSTANTS.BLANK_PLACEHOLDER)
      }
      return line
    })

    return { lyricsWithBlanks, blanks }
  }, [lyrics, percentage])
}
