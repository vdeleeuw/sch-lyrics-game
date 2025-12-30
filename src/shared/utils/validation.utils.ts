import { compareTexts } from './string.utils'

/**
 * Vérifie si une réponse utilisateur est correcte
 */
export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  return compareTexts(userAnswer, correctAnswer)
}

/**
 * Calcule le score basé sur les réponses
 */
export const calculateScore = (
  userAnswers: Map<number, string>,
  correctAnswers: Map<number, string>,
): number => {
  let score = 0

  correctAnswers.forEach((correctAnswer, index) => {
    const userAnswer = userAnswers.get(index) || ''
    if (checkAnswer(userAnswer, correctAnswer)) {
      score++
    }
  })

  return score
}
