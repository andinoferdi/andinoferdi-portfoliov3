export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  audio_url: string;
  album_art: string;
}

export interface MusicPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isExpanded: boolean;
  playlist: Song[];
  currentIndex: number;
  isLoading: boolean;
  isShuffled: boolean;
  repeatMode: "none" | "one" | "all";
}
