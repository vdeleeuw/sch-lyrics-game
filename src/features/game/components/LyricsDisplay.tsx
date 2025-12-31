import React from 'react'
import { checkAnswer } from '@/shared/utils/validation.utils'
import { Badge } from '@/shared/components/ui/badge'
import { Input } from '@/shared/components/ui/input'

interface LyricsDisplayProps {
  lyrics: string[]
  blanks: Map<number, string>
  userAnswers: Map<number, string>
  onAnswerChange: (lineIndex: number, answer: string) => void
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  lyrics,
  blanks,
  userAnswers,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-3">
      {lyrics.map((line, index) => {
        const hasBlank = blanks.has(index)
        const userAnswer = userAnswers.get(index) || ''
        const correctAnswer = blanks.get(index) || ''
        const isCorrect = userAnswer && checkAnswer(userAnswer, correctAnswer)

        return (
          <div key={index} className="flex items-center gap-3">
            <span className="w-8 text-sm text-white/40">{index + 1}</span>

            {hasBlank ? (
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <span className="text-lg text-white">{line.split('______')[0]}</span>
                <Input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => onAnswerChange(index, e.target.value)}
                  placeholder="?"
                  className={`w-32 text-center font-bold text-white placeholder-white/40 ${
                    isCorrect ? 'border-green-400 bg-green-50/10' : 'border-white/30 bg-white/10'
                  }`}
                />
                <span className="text-lg text-white">{line.split('______')[1]}</span>
                {isCorrect && (
                  <Badge
                    variant="default"
                    className="border border-green-400/30 bg-green-500/20 text-green-300"
                  >
                    ✓
                  </Badge>
                )}
              </div>
            ) : (
              <span className="flex-1 text-lg text-white">{line}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
