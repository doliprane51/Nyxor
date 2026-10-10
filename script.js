const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

const playlist = [
    { title: "Color Caramelo", src: "https://youtu.be/NRN-iS985Ow?si=NBPrcetntidFa_Qz" }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
}

function playSong() {
    audioPlayer.play().then(() => {
        isPlaying = true;
        // الأيقونة ديال Pause
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(err => {
        console.log("Autoplay blocked or file missing", err);
    });
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    // الأيقونة ديال Play
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationTimeEl.textContent = formatTime(audioPlayer.duration);
    }
});

audioPlayer.addEventListener('ended', () => {
    // ملي تسالي الأغنية دوز للي موراها
    nextBtn.click();
});

progressBar.addEventListener('click', (e) => {
    if (!audioPlayer.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
    audioPlayer.currentTime = pos * audioPlayer.duration;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// تحميل الأغنية الأولى مع بداية الموقع
loadSong(currentSongIndex);
