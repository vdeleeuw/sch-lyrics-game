import { useQuery } from '@tanstack/react-query'
import { geniusService } from '@/api/services/genius.service'

export const useRandomSCHTrack = () => {
  return useQuery({
    queryKey: ['sch-track', 'random'],
    queryFn: () => geniusService.getRandomSCHTrack(),
    staleTime: 0, // Toujours fetch une nouvelle chanson
  })
}

export const useLyrics = (songUrl: string | undefined) => {
  return useQuery({
    queryKey: ['lyrics', songUrl],
    queryFn: () => geniusService.getLyrics(songUrl!),
    enabled: !!songUrl,
  })
}
