import React from 'react'
import { Trophy } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'

interface ScoreBoardProps {
  score: number
  total: number
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, total }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-sm opacity-80">/ {total}</span>
          </div>
          <div className="text-3xl font-bold">{percentage}%</div>
        </div>
      </CardContent>
    </Card>
  )
}
