import schTracksData from '@/data/sch-tracks.json'

export interface Song {
  id: string
  title: string
  artist: string
  album: string
  year: number
  imageUrl: string
  lyrics: string[]
}

export const songsService = {
  getAllSongs: async (): Promise<Song[]> => {
    return schTracksData.map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist_names,
      album: track.album,
      year: track.year,
      imageUrl: track.song_art_image_url,
      lyrics: track.lyrics,
    }))
  },

  getSongById: async (id: string): Promise<Song | null> => {
    const track = schTracksData.find((t) => t.id === id)

    if (!track) {
      return null
    }

    return {
      id: track.id,
      title: track.title,
      artist: track.artist_names,
      album: track.album,
      year: track.year,
      imageUrl: track.song_art_image_url,
      lyrics: track.lyrics,
    }
  },

  getRandomSong: async (): Promise<Song> => {
    const songs = await songsService.getAllSongs()

    if (songs.length === 0) {
      throw new Error('Aucune chanson disponible')
    }

    const randomIndex = Math.floor(Math.random() * songs.length)
    return songs[randomIndex]
  },

  searchSongs: async (query: string): Promise<Song[]> => {
    const allSongs = await songsService.getAllSongs()

    if (!query) {
      return allSongs
    }

    const lowerQuery = query.toLowerCase()
    return allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery),
    )
  },

  getLyrics: async (songId: string): Promise<string[]> => {
    const song = await songsService.getSongById(songId)

    if (!song) {
      throw new Error(`Chanson introuvable: ${songId}`)
    }

    return song.lyrics
  },
}
