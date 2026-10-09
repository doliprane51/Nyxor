const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const audioFileInput = document.getElementById('audioFileInput');
const albumArtContainer = document.getElementById('albumArtContainer');
const songTitle = document.getElementById('songTitle');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

let isPlaying = false;

// Click on album art triggers file picker to upload music
albumArtContainer.addEventListener('click', () => {
    audioFileInput.click();
});

playBtn.addEventListener('click', () => {
    if (!audioPlayer.src) {
        audioFileInput.click();
        return;
    }
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
    } else {
        audioPlayer.play().then(() => {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            isPlaying = true;
        }).catch(() => {
            audioFileInput.click();
        });
    }
});

// Handle uploaded audio file
audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        // Display song name without extension
        songTitle.textContent = file.name.replace(/\.[^/.]+$/, "");
        audioPlayer.play().then(() => {
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            isPlaying = true;
        });
    }
});

// Update progress bar & time
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationTimeEl.textContent = formatTime(audioPlayer.duration);
    }
});

// Reset when song ends
audioPlayer.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
    progress.style.width = '0%';
});

// Click on progress bar to seek
progressBar.addEventListener('click', (e) => {
    if (!audioPlayer.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
    audioPlayer.currentTime = pos * audioPlayer.duration;
});

// Format seconds to mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
