import type { Song } from '@/api/services/songs.service'

export interface GameState {
  lyrics: string[]
  blanks: Map<number, string>
  userAnswers: Map<number, string>
  score: number
  currentSong: Song | null
  isLoading: boolean
  error: string | null
}

export interface BlankWord {
  lineIndex: number
  word: string
}
