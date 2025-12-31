import { useQuery } from '@tanstack/react-query'
import { songsService } from '@/api/services/songs.service'

export const useAllSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: () => songsService.getAllSongs(),
  })
}

export const useRandomSong = () => {
  return useQuery({
    queryKey: ['songs', 'random'],
    queryFn: () => songsService.getRandomSong(),
    staleTime: 0,
    gcTime: 0,
  })
}

export const useSong = (id: string | undefined) => {
  return useQuery({
    queryKey: ['songs', id],
    queryFn: () => songsService.getSongById(id!),
    enabled: !!id,
  })
}

export const useLyrics = (songId: string | undefined) => {
  return useQuery({
    queryKey: ['lyrics', songId],
    queryFn: () => songsService.getLyrics(songId!),
    enabled: !!songId,
  })
}

export const useSearchSongs = (query: string) => {
  return useQuery({
    queryKey: ['songs', 'search', query],
    queryFn: () => songsService.searchSongs(query),
    enabled: query.length > 0,
  })
}
