import React, { useEffect } from 'react'
import { Music, AlertCircle } from 'lucide-react'
import { LyricsDisplay } from './LyricsDisplay'
import { ScoreBoard } from './ScoreBoard'
import { useLyricsWithBlanks } from '@/features/game/hooks/useLyrics'
import { useGameLogic } from '@/features/game/hooks/useGameLogic'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useRandomSong } from '../queries/songs.queries'
import { ThemeSelector } from '@/shared/components/ThemeSelector'

export const GameBoard: React.FC = () => {
  const { gameState, setGameState, updateAnswer, revealAnswers } = useGameLogic()

  const { data: song, isLoading, refetch: refetchSong } = useRandomSong()

  const { lyricsWithBlanks, blanks } = useLyricsWithBlanks(song?.lyrics || [])

  useEffect(() => {
    if (song && !isLoading) {
      setGameState({
        currentSong: song,
        lyrics: lyricsWithBlanks,
        blanks,
        userAnswers: new Map(),
        score: 0,
        isLoading: false,
        error: null,
      })
    }
  }, [song?.id, isLoading])

  const handleNewGame = () => {
    refetchSong()
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: 'linear-gradient(to bottom right, hsl(var(--theme-darker)), hsl(var(--theme-dark)), hsl(var(--theme-secondary)))'
      }}
    >
      <ThemeSelector />

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="flex items-center justify-center gap-3 text-5xl font-bold text-white">
            <Music className="h-12 w-12" />
            SCH Lyrics Game
          </h1>
          <p className="text-xl text-white/70">Prépare-toi pour le Stade de France ! 🏟️</p>
        </div>

        {/* Score */}
        {!isLoading && gameState.currentSong && (
          <ScoreBoard score={gameState.score} total={gameState.blanks.size} />
        )}

        {/* Current Track */}
        {gameState.currentSong && !isLoading && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Music className="h-5 w-5" />
                {gameState.currentSong.title}
              </CardTitle>
              <CardDescription className="text-white/60">
                Trouve les mots manquants dans les paroles
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Error */}
        {gameState.error && (
          <Card className="border-red-400/30 bg-red-500/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-200">
                <AlertCircle className="h-5 w-5" />
                <span>{gameState.error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading */}
        {isLoading && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
                <p className="text-white/60">Chargement d'une chanson de SCH...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lyrics */}
        {!isLoading && gameState.lyrics.length > 0 && (
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="pt-6">
              <LyricsDisplay
                lyrics={gameState.lyrics}
                blanks={gameState.blanks}
                userAnswers={gameState.userAnswers}
                onAnswerChange={updateAnswer}
              />
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {!isLoading && gameState.currentSong && (
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleNewGame}
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30 hover:text-white"
            >
              Nouvelle chanson
            </Button>
            <Button
              onClick={revealAnswers}
              variant="default"
              size="lg"
              className="bg-white hover:bg-white/90"
              style={{ color: 'hsl(var(--theme-dark))' }}
            >
              Voir les réponses
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}