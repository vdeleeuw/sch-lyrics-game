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
    <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-white" />
            <span className="text-2xl font-bold text-white">{score}</span>
            <span className="text-sm text-white/60">/ {total}</span>
          </div>
          <div className="text-3xl font-bold text-white">{percentage}%</div>
        </div>
      </CardContent>
    </Card>
  )
}
