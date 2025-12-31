import { useState, useCallback } from 'react'
import type { GameState } from '../types/game.types'
import { calculateScore } from '@/shared/utils/validation.utils'

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    lyrics: [],
    blanks: new Map(),
    userAnswers: new Map(),
    score: 0,
    currentSong: null,
    isLoading: false,
    error: null,
  })

  const updateAnswer = useCallback((lineIndex: number, answer: string) => {
    setGameState((prev) => {
      const newAnswers = new Map(prev.userAnswers)
      newAnswers.set(lineIndex, answer)

      const score = calculateScore(newAnswers, prev.blanks)

      return {
        ...prev,
        userAnswers: newAnswers,
        score,
      }
    })
  }, [])

  const revealAnswers = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      userAnswers: new Map(prev.blanks),
      score: prev.blanks.size,
    }))
  }, [])

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      userAnswers: new Map(),
      score: 0,
    }))
  }, [])

  return {
    gameState,
    setGameState,
    updateAnswer,
    revealAnswers,
    resetGame,
  }
}
