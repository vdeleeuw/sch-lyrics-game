export interface GeniusSearchResponse {
  response: {
    hits: Array<{
      result: GeniusTrack
    }>
  }
}

export interface GeniusTrack {
  id: number
  title: string
  artist_names: string
  url: string
  song_art_image_url: string
  primary_artist: {
    name: string
    image_url: string
  }
}

export interface GeniusLyricsResponse {
  lyrics: string
}
