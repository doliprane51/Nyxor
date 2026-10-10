'use strict';

const audioPlayer    = document.getElementById('audioPlayer');
const playBtn        = document.getElementById('playBtn');
const prevBtn        = document.getElementById('prevBtn');
const nextBtn        = document.getElementById('nextBtn');
const songTitle      = document.getElementById('songTitle');
const progress       = document.getElementById('progress');
const progressBar    = document.getElementById('progressBar');
const currentTimeEl  = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');

// ---------------------------------------------------------------
// PLAYLIST
//  - src: direct audio link (.mp3 ...)  OR  a YouTube link
//  - title (optional for YouTube: found automatically)
//  - search (optional, audio only): "song + artist" to find the cover
//  - cover (optional, audio only): direct image link
// ---------------------------------------------------------------
const playlist = [
    { title: "Color Caramelo", search: "Color Caramelo Beny Jr El Guincho", src: "https://files.catbox.moe/n3bdw2.mp3" },
    { title: "Valerie Ft Nada - VIOLET", search: "Violet Valerie Nada", src: "https://sourcemirrors.org/hosted/7834-valerieftnada-violetlyricsvideomp3_1.mp3" }
];

let currentSongIndex = 0;
let mode = 'audio';          // 'audio' | 'yt'

// ---------------- helpers ----------------
function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function getYouTubeId(url) {
    try {
        const u = new URL(url);
        const host = u.hostname.replace(/^(www|m)\./, '');
        if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
        if (host === 'youtube.com' || host === 'music.youtube.com') {
            if (u.pathname === '/watch') return u.searchParams.get('v');
            const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/);
            if (m) return m[1];
        }
    } catch (e) { /* not a valid URL */ }
    return null;
}

function setPlayIcon(playing) {
    playBtn.innerHTML = `<i class="fa-solid fa-${playing ? 'pause' : 'play'}" aria-hidden="true"></i>`;
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function updateProgress(current, duration) {
    currentTimeEl.textContent = formatTime(current);
    if (Number.isFinite(duration) && duration > 0) {
        const percent = Math.min((current / duration) * 100, 100);
        progress.style.width = percent + '%';
        progressBar.setAttribute('aria-valuenow', String(Math.round(percent)));
        durationTimeEl.textContent = formatTime(duration);
    }
}

function resetProgress() {
    progress.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', '0');
    currentTimeEl.textContent = '0:00';
    durationTimeEl.textContent = '0:00';
}

// ---------------- album cover (audio tracks, via iTunes Search API) ----------------
const albumArt = document.querySelector('.album-art img');
const albumBox = albumArt.parentElement;
const DEFAULT_COVER = 'assets/avatar.jpg';
const coverCache = {};

albumArt.addEventListener('error', () => {
    if (!albumArt.src.endsWith(DEFAULT_COVER)) albumArt.src = DEFAULT_COVER;
});

async function fetchCover(query) {
    if (coverCache[query]) return coverCache[query];
    try {
        const res = await fetch('https://itunes.apple.com/search?media=music&entity=song&limit=1&term=' + encodeURIComponent(query));
        const data = await res.json();
        const art = data.results && data.results[0] && data.results[0].artworkUrl100;
        if (art) {
            coverCache[query] = art.replace('100x100bb', '600x600bb');
            return coverCache[query];
        }
    } catch (err) {
        console.warn('Cover not found:', err);
    }
    return null;
}

async function loadCover(song, index) {
    albumArt.src = song.cover || DEFAULT_COVER;
    if (song.cover) return;
    const url = await fetchCover(song.search || song.title || '');
    if (url && index === currentSongIndex && mode === 'audio') albumArt.src = url;
}

// ---------------- YouTube (official IFrame Player API) ----------------
let ytPlayer = null;
let ytReady = false;
let ytPlaying = false;
let ytPending = null;
let ytApiRequested = false;

const ytHolder = document.createElement('div');
ytHolder.style.cssText = 'width:100%;height:100%;display:none;pointer-events:none;';
const ytMount = document.createElement('div');
ytHolder.appendChild(ytMount);
albumBox.appendChild(ytHolder);

function showVideo(on) {
    ytHolder.style.display = on ? 'block' : 'none';
    albumArt.style.display = on ? 'none' : '';
}

function ensureYouTube(callback) {
    if (ytReady) { callback(); return; }
    ytPending = callback;            // the latest request wins
    if (ytApiRequested) return;
    ytApiRequested = true;

    window.onYouTubeIframeAPIReady = () => {
        ytPlayer = new YT.Player(ytMount, {
            width: '100%',
            height: '100%',
            playerVars: Object.assign(
                { controls: 0, disablekb: 1, modestbranding: 1, playsinline: 1, rel: 0, fs: 0 },
                location.protocol.startsWith('http') ? { origin: location.origin } : {}
            ),
            events: {
                onReady: () => {
                    ytReady = true;
                    setInterval(tickYouTube, 500);
                    const cb = ytPending; ytPending = null;
                    if (cb) cb();
                },
                onStateChange: onYouTubeState,
                onError: (e) => {
                    if (mode !== 'yt') return;
                    ytPlaying = false;
                    setPlayIcon(false);
                    const reasons = {
                        2: 'invalid video link',
                        5: 'player error',
                        100: 'video removed or private',
                        101: 'embedding disabled by the owner',
                        150: 'embedding disabled by the owner',
                        153: 'missing referrer (open the real site, not a local file)'
                    };
                    songTitle.textContent = `YouTube error ${e.data}: ${reasons[e.data] || 'unavailable'}`;
                }
            }
        });
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = () => { songTitle.textContent = 'YouTube blocked'; };
    document.head.appendChild(tag);
}

function onYouTubeState(e) {
    if (mode !== 'yt') return;
    const S = YT.PlayerState;
    ytPlaying = (e.data === S.PLAYING || e.data === S.BUFFERING);
    setPlayIcon(ytPlaying);
    if (e.data === S.PLAYING || e.data === S.CUED) {
        const song = playlist[currentSongIndex];
        const data = ytPlayer.getVideoData && ytPlayer.getVideoData();
        if (!song.title && data && data.title) songTitle.textContent = data.title;
    }
    if (e.data === S.ENDED) handleEnded();
}

function tickYouTube() {
    if (mode !== 'yt' || !ytReady) return;
    updateProgress(ytPlayer.getCurrentTime(), ytPlayer.getDuration());
}

// ---------------- unified controls ----------------
function isPlaying() {
    return mode === 'yt' ? ytPlaying : !audioPlayer.paused;
}

function getDuration() {
    return mode === 'yt' ? (ytReady ? ytPlayer.getDuration() : 0) : audioPlayer.duration;
}

function getTime() {
    return mode === 'yt' ? (ytReady ? ytPlayer.getCurrentTime() : 0) : audioPlayer.currentTime;
}

function setTime(t) {
    const duration = getDuration();
    if (!Number.isFinite(duration) || duration <= 0) return;
    t = Math.min(Math.max(t, 0), duration);
    if (mode === 'yt') {
        ytPlayer.seekTo(t, true);
        updateProgress(t, duration);
    } else {
        audioPlayer.currentTime = t;
    }
}

function loadSong(index, autoplay = false) {
    const song = playlist[index];
    const id = getYouTubeId(song.src);
    resetProgress();
    songTitle.textContent = song.title || (id ? 'YouTube' : 'Unknown track');

    if (id) {
        mode = 'yt';
        audioPlayer.pause();
        audioPlayer.removeAttribute('src');
        showVideo(true);
        ensureYouTube(() => autoplay ? ytPlayer.loadVideoById(id) : ytPlayer.cueVideoById(id));
    } else {
        mode = 'audio';
        if (ytReady) { ytPlayer.pauseVideo(); ytPlaying = false; }
        showVideo(false);
        audioPlayer.src = song.src;
        loadCover(song, index);
        if (autoplay) playSong();
    }
}

function playSong() {
    if (mode === 'yt') {
        if (ytReady) {
            ytPlayer.playVideo();
        } else {
            const id = getYouTubeId(playlist[currentSongIndex].src);
            ensureYouTube(() => ytPlayer.loadVideoById(id));
        }
        return;
    }
    const p = audioPlayer.play();
    if (p && typeof p.catch === 'function') {
        p.catch(err => console.warn('Playback failed (file missing or blocked):', err));
    }
}

function pauseSong() {
    if (mode === 'yt') { if (ytReady) ytPlayer.pauseVideo(); }
    else audioPlayer.pause();
}

function changeSong(step, forcePlay = false) {
    const autoplay = forcePlay || isPlaying();
    currentSongIndex = (currentSongIndex + step + playlist.length) % playlist.length;
    loadSong(currentSongIndex, autoplay);
}

function handleEnded() {
    if (playlist.length > 1) {
        changeSong(1, true);
    } else if (mode === 'yt') {
        ytPlayer.cueVideoById(getYouTubeId(playlist[currentSongIndex].src)); // back to the start, stopped
        setPlayIcon(false);
    } else {
        audioPlayer.currentTime = 0;
        setPlayIcon(false);
    }
}

// ---------------- <audio> events (only when in audio mode) ----------------
audioPlayer.addEventListener('play',  () => { if (mode === 'audio') setPlayIcon(true); });
audioPlayer.addEventListener('pause', () => { if (mode === 'audio') setPlayIcon(false); });
audioPlayer.addEventListener('loadedmetadata', () => {
    if (mode === 'audio') durationTimeEl.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener('timeupdate', () => {
    if (mode === 'audio') updateProgress(audioPlayer.currentTime, audioPlayer.duration);
});
audioPlayer.addEventListener('ended', () => { if (mode === 'audio') handleEnded(); });
audioPlayer.addEventListener('error', () => {
    if (mode !== 'audio' || !audioPlayer.getAttribute('src')) return;
    songTitle.textContent = 'Audio unavailable (use a direct .mp3 or YouTube link)';
    setPlayIcon(false);
});

// ---------------- buttons & progress bar ----------------
playBtn.addEventListener('click', () => { if (isPlaying()) pauseSong(); else playSong(); });
nextBtn.addEventListener('click', () => changeSong(1));
prevBtn.addEventListener('click', () => changeSong(-1));

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const duration = getDuration();
    if (Number.isFinite(duration)) setTime(((e.clientX - rect.left) / rect.width) * duration);
});

progressBar.addEventListener('keydown', (e) => {
    const duration = getDuration();
    if (!Number.isFinite(duration) || duration <= 0) return;
    const keys = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 };
    if (e.key in keys) { e.preventDefault(); setTime(getTime() + keys[e.key]); }
    else if (e.key === 'Home') { e.preventDefault(); setTime(0); }
    else if (e.key === 'End')  { e.preventDefault(); setTime(duration); }
});

loadSong(currentSongIndex);
