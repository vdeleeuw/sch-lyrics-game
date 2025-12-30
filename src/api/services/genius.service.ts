import { geniusAxios } from '../client/axios.config'
import type { GeniusSearchResponse, GeniusTrack } from '../types/genius.types'

export const geniusService = {
  /**
   * Recherche des chansons de SCH sur Genius
   */
  searchSCHTracks: async (query: string = 'SCH'): Promise<GeniusTrack[]> => {
    const response = await geniusAxios.get<GeniusSearchResponse>('/search', {
      params: { q: query },
    })

    return response.data.response.hits
      .map((hit) => hit.result)
      .filter((track) => track.artist_names.toLowerCase().includes('sch'))
  },

  /**
   * Récupère une chanson aléatoire de SCH
   */
  getRandomSCHTrack: async (): Promise<GeniusTrack> => {
    const tracks = await geniusService.searchSCHTracks('SCH')

    if (tracks.length === 0) {
      throw new Error('Aucune chanson de SCH trouvée')
    }

    const randomIndex = Math.floor(Math.random() * tracks.length)
    return tracks[randomIndex]
  },

  /**
   * Récupère les paroles d'une chanson (à implémenter avec scraping)
   */
  getLyrics: async (songUrl: string): Promise<string[]> => {
    // TODO: Implémenter le scraping des paroles
    // Pour l'instant, on retourne des paroles mock
    console.warn('getLyrics not implemented yet, returning mock data')

    return [
      'Dans la ville où je suis né',
      "Y'a pas d'amour, que des billets",
      "J'ai grandi avec les loups",
      "Maintenant j'fais danser les foules",
      "Marseille, c'est ma fierté",
      "J'représente le 13 toute l'année",
    ]
  },
}
