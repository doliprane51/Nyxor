'use strict';

const audioPlayer   = document.getElementById('audioPlayer');
const playBtn       = document.getElementById('playBtn');
const prevBtn       = document.getElementById('prevBtn');
const nextBtn       = document.getElementById('nextBtn');
const songTitle     = document.getElementById('songTitle');
const progress      = document.getElementById('progress');
const progressBar   = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

// Local file (served from the same origin, allowed by the CSP).
// Add more tracks here: { title: "...", src: "assets/other.mp3" }
const playlist = [
    { title: "Color Caramelo", src: "https://files.catbox.moe/n3bdw2.mp3" },
];

let currentSongIndex = 0;

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function setPlayIcon(playing) {
    playBtn.innerHTML = `<i class="fa-solid fa-${playing ? 'pause' : 'play'}" aria-hidden="true"></i>`;
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function resetProgress() {
    progress.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', '0');
    currentTimeEl.textContent = '0:00';
    durationTimeEl.textContent = '0:00';
}

function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    resetProgress();
}

function playSong() {
    const p = audioPlayer.play();
    if (p && typeof p.catch === 'function') {
        p.catch(err => console.warn('Playback failed (file missing or blocked):', err));
    }
}

function pauseSong() {
    audioPlayer.pause();
}

function changeSong(step) {
    const wasPlaying = !audioPlayer.paused;
    currentSongIndex = (currentSongIndex + step + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (wasPlaying) playSong();
}

// The UI follows the real state of the <audio> element.
audioPlayer.addEventListener('play',  () => setPlayIcon(true));
audioPlayer.addEventListener('pause', () => setPlayIcon(false));

audioPlayer.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    currentTimeEl.textContent = formatTime(currentTime);
    if (Number.isFinite(duration) && duration > 0) {
        const percent = (currentTime / duration) * 100;
        progress.style.width = percent + '%';
        progressBar.setAttribute('aria-valuenow', String(Math.round(percent)));
    }
});

audioPlayer.addEventListener('ended', () => {
    if (playlist.length > 1) {
        changeSong(1);
        playSong();
    } else {
        audioPlayer.currentTime = 0; // single track: go back to the start and stop
    }
});

audioPlayer.addEventListener('error', () => {
    songTitle.textContent = 'Audio unavailable';
    setPlayIcon(false);
});

playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) playSong(); else pauseSong();
});
nextBtn.addEventListener('click', () => changeSong(1));
prevBtn.addEventListener('click', () => changeSong(-1));

function seekTo(ratio) {
    if (!Number.isFinite(audioPlayer.duration)) return;
    audioPlayer.currentTime = Math.min(Math.max(ratio, 0), 1) * audioPlayer.duration;
}

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    seekTo((e.clientX - rect.left) / rect.width);
});

progressBar.addEventListener('keydown', (e) => {
    if (!Number.isFinite(audioPlayer.duration)) return;
    const keys = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 };
    if (e.key in keys) {
        e.preventDefault();
        audioPlayer.currentTime = Math.min(Math.max(audioPlayer.currentTime + keys[e.key], 0), audioPlayer.duration);
    } else if (e.key === 'Home') {
        e.preventDefault(); seekTo(0);
    } else if (e.key === 'End') {
        e.preventDefault(); seekTo(1);
    }
});

loadSong(currentSongIndex);
