import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Song } from "@/types/music";

export function useSupabaseMusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setLoading(false);
        return;
      }

      // Cek dan isi durasi jika null
      const songsWithDuration = await Promise.all(
        (data as Song[]).map(async (song: Song) => {
          if ((!song.duration || song.duration === 0) && song.audio_url) {
            // Ambil durasi asli mp3 dari URL
            const duration = await getMp3DurationFromUrl(song.audio_url);
            // Optional: update ke Supabase (biar next fetch sudah ada)
            if (duration > 0) {
              await supabase
                .from("songs")
                .update({ duration })
                .eq("id", song.id);
            }
            return { ...song, duration };
          }
          return song;
        })
      );

      setSongs(songsWithDuration);
      setLoading(false);
    }

    fetchSongs();
  }, []);

  return { songs, loading };
}

// Helper: Ambil durasi mp3 dari URL
function getMp3DurationFromUrl(url: string): Promise<number> {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.src = url;
    audio.onloadedmetadata = () => {
      resolve(Math.floor(audio.duration));
    };
    audio.onerror = () => resolve(0);
  });
}
