/**
 * Normalise un texte pour la comparaison (enlève accents, ponctuation, etc.)
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

/**
 * Compare deux textes de manière normalisée
 */
export const compareTexts = (text1: string, text2: string): boolean => {
  return normalizeText(text1) === normalizeText(text2)
}
