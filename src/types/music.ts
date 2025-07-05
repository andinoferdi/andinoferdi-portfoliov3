export interface Song {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  audioUrl: string
  albumArt: string
}

export interface MusicPlayerState {
  currentSong: Song | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isExpanded: boolean
  playlist: Song[]
  currentIndex: number
  isLoading: boolean
  isShuffled: boolean
  repeatMode: "none" | "one" | "all"
}
