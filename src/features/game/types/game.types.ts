export interface Track {
  id: number
  title: string
  artist: string
  url: string
  imageUrl?: string
}

export interface GameState {
  lyrics: string[]
  blanks: Map<number, string>
  userAnswers: Map<number, string>
  score: number
  currentTrack: Track | null
  isLoading: boolean
  error: string | null
}

export interface BlankWord {
  lineIndex: number
  word: string
}
