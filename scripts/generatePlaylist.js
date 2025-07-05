// Script untuk generate playlist.json dari isi folder public/musics dan public/albums
// Jalankan: node scripts/generatePlaylist.js

const fs = require('fs');
const path = require('path');

const musicsDir = path.join(__dirname, '../public/musics');
const albumsDir = path.join(__dirname, '../public/albums');
const outputFile = path.join(__dirname, '../src/data/playlist.json');

function getDurationDummy(filename) {
  // Dummy: bisa diganti dengan library untuk baca durasi mp3
  // Misal: 240 detik (4 menit)
  return 240;
}

function titleFromFilename(filename) {
  return filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
}

function findAlbumArt(songTitle) {
  // Cari file cover yang namanya mirip judul lagu
  const files = fs.readdirSync(albumsDir);
  const found = files.find(f => titleFromFilename(f).toLowerCase() === songTitle.toLowerCase());
  return found ? `/albums/${found}` : '/placeholder.jpg';
}

function main() {
  const musicFiles = fs.readdirSync(musicsDir).filter(f => f.endsWith('.mp3'));
  const playlist = musicFiles.map((file, idx) => {
    const title = titleFromFilename(file);
    return {
      id: idx + 1,
      title,
      artist: 'Unknown Artist',
      album: title,
      duration: getDurationDummy(file),
      audioUrl: `/musics/${file}`,
      albumArt: findAlbumArt(title),
    };
  });
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(playlist, null, 2));
  console.log(`Generated ${outputFile} with ${playlist.length} songs.`);
}

main(); 