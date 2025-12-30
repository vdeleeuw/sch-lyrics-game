import React, { useEffect } from 'react'
import { Music, AlertCircle } from 'lucide-react'
import { LyricsDisplay } from './LyricsDisplay'
import { ScoreBoard } from './ScoreBoard'
import { useRandomSCHTrack } from '@/features/music/queries/genius.queries'
import { useLyrics } from '@/features/music/queries/genius.queries'
import { useLyricsWithBlanks } from '@/features/music/hooks/useLyrics'
import { useGameLogic } from '@/features/music/hooks/useGameLogic'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

export const GameBoard: React.FC = () => {
  const { gameState, setGameState, updateAnswer, revealAnswers } = useGameLogic()

  const { data: track, isLoading: trackLoading, refetch: refetchTrack } = useRandomSCHTrack()
  const { data: lyrics, isLoading: lyricsLoading } = useLyrics(track?.url)

  const { lyricsWithBlanks, blanks } = useLyricsWithBlanks(lyrics || [])

  const isLoading = trackLoading || lyricsLoading

  useEffect(() => {
    if (track && lyrics && !isLoading) {
      setGameState((prev) => ({
        ...prev,
        currentTrack: {
          id: track.id,
          title: track.title,
          artist: track.artist_names,
          url: track.url,
          imageUrl: track.song_art_image_url,
        },
        lyrics: lyricsWithBlanks,
        blanks,
        userAnswers: new Map(),
        score: 0,
        isLoading: false,
        error: null,
      }))
    }
  }, [track, lyrics, lyricsWithBlanks, blanks, isLoading, setGameState])

  const handleNewGame = () => {
    refetchTrack()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="flex items-center justify-center gap-3 text-5xl font-bold text-white">
            <Music className="h-12 w-12" />
            SCH Lyrics Game
          </h1>
          <p className="text-xl text-purple-200">Prépare-toi pour le Stade de France ! 🏟️</p>
        </div>

        {/* Score */}
        {!isLoading && gameState.currentTrack && (
          <ScoreBoard score={gameState.score} total={gameState.blanks.size} />
        )}

        {/* Current Track */}
        {gameState.currentTrack && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                {gameState.currentTrack.title}
              </CardTitle>
              <CardDescription>Trouve les mots manquants dans les paroles</CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Error */}
        {gameState.error && (
          <Card className="border-red-500 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span>{gameState.error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading */}
        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-purple-500" />
                <p className="text-gray-600">Chargement d'une chanson de SCH...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lyrics */}
        {!isLoading && gameState.lyrics.length > 0 && (
          <Card>
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
        {!isLoading && gameState.currentTrack && (
          <div className="flex justify-center gap-3">
            <Button onClick={handleNewGame} variant="outline" size="lg" className="bg-white">
              Nouvelle chanson
            </Button>
            <Button
              onClick={revealAnswers}
              variant="default"
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Voir les réponses
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
