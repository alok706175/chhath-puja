/* =========================================================
   छठ घाट (Chhath Ghat) - Audio Player & Interactive Script
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     1. LIVE CLOCK (IST)
     ========================================================= */
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const days = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
    const months = [
      "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ];

    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");

    if (timeEl) {
      timeEl.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
    }
    if (dateEl) {
      dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* =========================================================
     2. TOAST NOTIFICATION UTILITY
     ========================================================= */
  let toastTimeout = null;
  function showToast(message) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* =========================================================
     3. WEB AUDIO SPIRITUAL CHIME / BELL
     ========================================================= */
  function playSpiritualChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const freqs = [528, 792, 1056]; // Auspicious harmonic frequencies
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12 / (i + 1), ctx.currentTime + 0.05 + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2 + i * 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + 2.8 + i * 0.3);
      });
    } catch (e) {
      console.debug("AudioContext error:", e);
    }
  }

  /* =========================================================
     4. WHATSAPP SHARING
     ========================================================= */
  const SHARE_URL = "https://chhath-puja.onrender.com/";

  function shareOnWhatsApp(customHeading) {
    const title = customHeading || "🌅 छठ महापर्व की हार्दिक शुभकामनाएं! 🙏";
    const body = 
      `${title}\n\n` +
      `सूर्य देव और छठी मईया की कृपा आप और आपके पूरे परिवार पर सदा बनी रहे।\n\n` +
      `🎶 *छठ पूजा के पावन एवं मधुर गीत यहां सुनें:* \n${SHARE_URL}\n\n` +
      `॥ जय छठी मईया • ॐ सूर्याय नमः ॥ ☀️`;

    const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
    showToast("✨ व्हाट्सएप पर साझा किया जा रहा है...");
  }

  const waShareBtn = document.getElementById("whatsappShareBtn");
  if (waShareBtn) {
    waShareBtn.addEventListener("click", () => {
      shareOnWhatsApp("🌅 छठ घाट — पावन छठ महापर्व के मधुर गीत 🙏");
    });
  }

  /* Facebook Share */
  const fbShareBtn = document.getElementById("facebookShareBtn");
  if (fbShareBtn) {
    fbShareBtn.addEventListener("click", () => {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent("🌅 छठ महापर्व की हार्दिक शुभकामनाएं! 🙏 सुनिए पावन छठ पूजा के गीत")}`;
      window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      showToast("✨ फेसबुक पर साझा किया जा रहा है...");
    });
  }

  /* Instagram Share */
  const instaShareBtn = document.getElementById("instagramShareBtn");
  if (instaShareBtn) {
    instaShareBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SHARE_URL);
        showToast("✨ लिंक कॉपी हुआ! Instagram पर शेयर करें 📸");
      } catch (e) {
        showToast("✨ Instagram खोला जा रहा है...");
      }
      setTimeout(() => {
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      }, 500);
    });
  }

  const shareMantraBtn = document.getElementById("shareMantraBtn");
  if (shareMantraBtn) {
    shareMantraBtn.addEventListener("click", () => {
      const mantraMsg = 
        `☀️ *श्री सूर्य गायत्री मंत्र:*\n` +
        `ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि।\nतन्नो आदित्यः प्रचोदयात्॥\n\n` +
        `छठ घाट पर सुनें भक्तिमय छठ गीत: ${SHARE_URL}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mantraMsg)}`, "_blank");
    });
  }

  const copyMantraBtn = document.getElementById("copyMantraBtn");
  if (copyMantraBtn) {
    copyMantraBtn.addEventListener("click", async () => {
      const mantra = "ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि। तन्नो आदित्यः प्रचोदयात्॥";
      try {
        await navigator.clipboard.writeText(mantra);
        showToast("📋 सूर्य गायत्री मंत्र कॉपी हो गया!");
      } catch (err) {
        showToast("📋 मंत्र कॉपी हुआ: " + mantra);
      }
    });
  }

  /* =========================================================
     5. FESTIVE FLOATING PARTICLES CANVAS
     ========================================================= */
  const canvas = document.getElementById("festiveCanvas");
  let ctx = canvas ? canvas.getContext("2d") : null;
  let particles = [];
  let sparks = [];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
      this.y = -20;
      this.size = Math.random() * 6 + 4;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * 4) * 0.6;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = Math.random() > 0.4 ? "#ffb84d" : "#ff7043";
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.4;
      this.angle += this.spin;
      if (canvas && this.y > canvas.height + 20) {
        this.reset();
      }
    }
    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Spark {
    constructor(x, y) {
      this.x = x || (canvas ? canvas.width / 2 : window.innerWidth / 2);
      this.y = y || (canvas ? canvas.height / 2 : window.innerHeight / 2);
      this.vx = (Math.random() - 0.5) * 5;
      this.vy = (Math.random() - 0.5) * 5 - 2;
      this.size = Math.random() * 4 + 2;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.color = Math.random() > 0.3 ? "#ffd54f" : "#ff6f00";
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.06;
      this.life -= this.decay;
    }
    draw() {
      if (!ctx || this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  if (canvas) {
    for (let i = 0; i < 20; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }
  }

  function spawnFestiveSparks(count) {
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4;
    for (let i = 0; i < count; i++) {
      sparks.push(new Spark(centerX + (Math.random() - 0.5) * 80, centerY + (Math.random() - 0.5) * 40));
    }
  }

  function animateParticles() {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      sparks = sparks.filter((s) => s.life > 0);
      sparks.forEach((s) => {
        s.update();
        s.draw();
      });
    }
    requestAnimationFrame(animateParticles);
  }
  requestAnimationFrame(animateParticles);

  /* =========================================================
     7. AUDIO PLAYER & PLAYLIST LOGIC
     ========================================================= */
  let songs = [];
  let currentSong = 0;
  let isSeeking = false;
  let lastVolume = 1;

  const offlineAudio = document.getElementById("offlineAudio");
  const songName = document.getElementById("offlineSongName");
  const songSinger = document.getElementById("offlineSinger");
  const playButton = document.getElementById("offlinePlay");
  const playIcon = document.getElementById("playIcon");
  const albumCover = document.getElementById("albumCover");
  const prevBtn = document.getElementById("prevSong");
  const nextBtn = document.getElementById("nextSong");
  const progress = document.getElementById("offlineProgress");
  const progressFill = document.getElementById("progressFill");
  const currentTime = document.getElementById("currentSongTime");
  const totalTime = document.getElementById("totalSongTime");
  const muteBtn = document.getElementById("muteBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const playerElem = document.getElementById("offlinePlayer");

  const playlistToggleBtn = document.getElementById("playlistToggleBtn");
  const playlistCloseBtn = document.getElementById("playlistCloseBtn");
  const playlistModal = document.getElementById("playlistModal");
  const playlistList = document.getElementById("playlistList");
  const playlistTitle = document.getElementById("playlistTitle");
  const playlistSearch = document.getElementById("playlistSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");

  /* Escape helper */
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  /* Format seconds to M:SS */
  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  /* Load songs from songs.json */
  async function loadOfflineSongs() {
    try {
      const response = await fetch("songs.json", { cache: "no-store" });
      if (!response.ok) throw new Error("songs.json fetch failed");
      songs = await response.json();

      if (!Array.isArray(songs) || songs.length === 0) {
        if (songName) songName.textContent = "No Song Found";
        return;
      }

      if (playlistTitle) playlistTitle.textContent = `🎵 छठ गीत संग्रह (${songs.length})`;

      renderPlaylist();
      loadSong(0, false);
    } catch (error) {
      console.error("Songs fetch failed:", error);
      if (songName) songName.textContent = "गीत लोड नहीं हो सके";
    }
  }

  /* Render Playlist with optional search query */
  function renderPlaylist(filterQuery = "") {
    if (!playlistList) return;
    const isPlaying = offlineAudio && !offlineAudio.paused;
    const query = filterQuery.toLowerCase().trim();

    const filtered = songs
      .map((s, idx) => ({ ...s, originalIndex: idx }))
      .filter((s) => {
        if (!query) return true;
        return (
          s.name.toLowerCase().includes(query) ||
          (s.singer && s.singer.toLowerCase().includes(query))
        );
      });

    if (filtered.length === 0) {
      playlistList.innerHTML = `
        <li class="no-songs-found">
          <span>🔍 कोई गीत नहीं मिला</span>
        </li>
      `;
      return;
    }

    playlistList.innerHTML = filtered
      .map((s) => {
        const idx = s.originalIndex;
        const isActive = idx === currentSong;
        return `
          <li class="playlist-item ${isActive ? "active" : ""}" data-index="${idx}">
            <span class="playlist-item-num">${idx + 1}</span>
            <div class="playlist-item-details">
              <div class="playlist-item-name">${escapeHTML(s.name)}</div>
              <div class="playlist-item-singer">${escapeHTML(s.singer || "छठ महापर्व")}</div>
            </div>
            ${
              isActive && isPlaying
                ? `
              <div class="equalizer playing" aria-hidden="true">
                <span class="equalizer-bar"></span>
                <span class="equalizer-bar"></span>
                <span class="equalizer-bar"></span>
              </div>
            `
                : ""
            }
          </li>
        `;
      })
      .join("");

    playlistList.querySelectorAll(".playlist-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const songIdx = parseInt(item.getAttribute("data-index"), 10);
        playSong(songIdx);
        if (playlistModal) playlistModal.classList.remove("open");
      });
    });
  }

  /* Search Input Event */
  if (playlistSearch) {
    playlistSearch.addEventListener("input", (e) => {
      const q = e.target.value;
      if (searchClearBtn) searchClearBtn.style.display = q ? "block" : "none";
      renderPlaylist(q);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (playlistSearch) {
        playlistSearch.value = "";
        searchClearBtn.style.display = "none";
        renderPlaylist("");
      }
    });
  }

  /* Load Song */
  function loadSong(index, shouldAutoPlay = false) {
    if (!songs[index]) return;
    currentSong = index;

    offlineAudio.pause();
    offlineAudio.src = songs[index].file;
    offlineAudio.load();

    if (songName) songName.textContent = songs[index].name;
    if (songSinger) songSinger.textContent = `छठ महापर्व • ${songs[index].singer || "भक्ति गीत"}`;
    if (currentTime) currentTime.textContent = "0:00";
    if (totalTime) totalTime.textContent = "0:00";
    if (progress) progress.value = 0;
    if (progressFill) progressFill.style.width = "0%";

    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    updateMediaSessionMetadata();

    if (shouldAutoPlay) {
      offlineAudio.play().catch((err) => console.warn("Auto-play blocked:", err));
    }
  }

  /* Play Specific Song */
  async function playSong(index) {
    if (!songs[index]) return;
    loadSong(index, true);
  }

  /* Play / Pause Toggle */
  if (playButton) {
    playButton.addEventListener("click", async () => {
      if (!offlineAudio.src && songs.length > 0) {
        loadSong(0, true);
        return;
      }

      if (offlineAudio.paused) {
        try {
          await offlineAudio.play();
        } catch (err) {
          console.error("Play error:", err);
        }
      } else {
        offlineAudio.pause();
      }
    });
  }

  /* Previous Song */
  function playPrevious() {
    if (!songs.length) return;
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
  }

  if (prevBtn) prevBtn.addEventListener("click", playPrevious);

  /* Next Song */
  function playNext() {
    if (!songs.length) return;
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
  }

  if (nextBtn) nextBtn.addEventListener("click", playNext);

  /* Audio Events */
  offlineAudio.addEventListener("loadedmetadata", () => {
    if (totalTime) totalTime.textContent = formatTime(offlineAudio.duration);
    updateMediaSessionPosition();
  });

  offlineAudio.addEventListener("timeupdate", () => {
    if (isSeeking) return;

    const cur = offlineAudio.currentTime;
    const dur = offlineAudio.duration;

    if (dur && isFinite(dur)) {
      const pct = (cur / dur) * 100;
      if (progress) progress.value = pct;
      if (progressFill) progressFill.style.width = `${pct}%`;
      updateMediaSessionPosition();
    }
    if (currentTime) currentTime.textContent = formatTime(cur);
  });

  /* Seek interactions */
  if (progress) {
    const handleSeekInput = () => {
      if (!offlineAudio.duration) return;
      isSeeking = true;
      const pct = progress.value;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (currentTime) {
        currentTime.textContent = formatTime((pct / 100) * offlineAudio.duration);
      }
    };

    const handleSeekChange = () => {
      if (!offlineAudio.duration) return;
      offlineAudio.currentTime = (progress.value / 100) * offlineAudio.duration;
      isSeeking = false;
      updateMediaSessionPosition();
    };

    progress.addEventListener("mousedown", () => { isSeeking = true; });
    progress.addEventListener("touchstart", () => { isSeeking = true; }, { passive: true });
    progress.addEventListener("input", handleSeekInput);
    progress.addEventListener("change", handleSeekChange);
  }

  offlineAudio.addEventListener("play", () => {
    if (playIcon) playIcon.textContent = "❚❚";
    if (albumCover) albumCover.classList.add("spinning");
    if (playerElem) playerElem.classList.add("playing");
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    updateMediaSessionMetadata();
  });

  offlineAudio.addEventListener("pause", () => {
    if (playIcon) playIcon.textContent = "▶";
    if (albumCover) albumCover.classList.remove("spinning");
    if (playerElem) playerElem.classList.remove("playing");
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
  });

  offlineAudio.addEventListener("ended", () => {
    playNext();
  });

  /* Volume & Mute */
  const VOL_HIGH_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  `;
  const VOL_LOW_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M7 9v6h4l5 5V4L11 9H7zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25-2.5-4.02z"/>
    </svg>
  `;
  const VOL_MUTE_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  `;

  function updateVolumeIcon(vol) {
    if (!muteBtn) return;
    if (vol === 0) muteBtn.innerHTML = VOL_MUTE_ICON;
    else if (vol < 0.5) muteBtn.innerHTML = VOL_LOW_ICON;
    else muteBtn.innerHTML = VOL_HIGH_ICON;
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      const vol = volumeSlider.value / 100;
      offlineAudio.volume = vol;
      updateVolumeIcon(vol);
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      if (offlineAudio.volume > 0) {
        lastVolume = offlineAudio.volume;
        offlineAudio.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
        updateVolumeIcon(0);
      } else {
        offlineAudio.volume = lastVolume || 1;
        if (volumeSlider) volumeSlider.value = (lastVolume || 1) * 100;
        updateVolumeIcon(lastVolume || 1);
      }
    });
  }

  /* Playlist Drawer open / close */
  if (playlistToggleBtn && playlistModal) {
    playlistToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      playlistModal.classList.toggle("open");
      if (playlistModal.classList.contains("open") && playlistSearch) {
        setTimeout(() => playlistSearch.focus(), 150);
      }
    });
  }

  if (playlistCloseBtn && playlistModal) {
    playlistCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      playlistModal.classList.remove("open");
    });
  }

  if (playlistModal) {
    playlistModal.addEventListener("click", (e) => e.stopPropagation());
  }

  document.addEventListener("click", (e) => {
    if (
      playlistModal &&
      !playlistModal.contains(e.target) &&
      e.target !== playlistToggleBtn &&
      !playlistToggleBtn.contains(e.target)
    ) {
      playlistModal.classList.remove("open");
    }
  });

  /* =========================================================
     8. MEDIA SESSION API INTEGRATION
     ========================================================= */
  const MEDIA_SESSION_SUPPORTED = "mediaSession" in navigator;

  function updateMediaSessionPosition() {
    if (!MEDIA_SESSION_SUPPORTED || !("setPositionState" in navigator.mediaSession)) return;
    const dur = offlineAudio.duration;
    const pos = offlineAudio.currentTime;
    const rate = offlineAudio.playbackRate || 1;

    if (!isFinite(dur) || dur <= 0 || !isFinite(pos) || pos < 0) return;

    try {
      navigator.mediaSession.setPositionState({
        duration: dur,
        playbackRate: rate,
        position: Math.min(pos, dur)
      });
    } catch (e) {
      console.debug("MediaSession position error:", e);
    }
  }

  function updateMediaSessionMetadata() {
    if (!MEDIA_SESSION_SUPPORTED || !songs[currentSong]) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songs[currentSong].name,
        artist: songs[currentSong].singer || "छठ महापर्व",
        album: "छठ घाट",
        artwork: [
          { src: "/favicon.io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/favicon.io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
        ]
      });
    } catch (e) {
      console.debug("MediaSession metadata error:", e);
    }
  }

  if (MEDIA_SESSION_SUPPORTED) {
    try {
      navigator.mediaSession.setActionHandler("play", () => offlineAudio.play());
      navigator.mediaSession.setActionHandler("pause", () => offlineAudio.pause());
      navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
      navigator.mediaSession.setActionHandler("nexttrack", playNext);
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime && isFinite(details.seekTime)) {
          offlineAudio.currentTime = details.seekTime;
        }
      });
    } catch (e) {
      console.debug("MediaSession action handler error:", e);
    }
  }

  /* =========================================================
     8.5 YOUTUBE VIDEO THEATER & BACKGROUND VIDEO PLAYER
     ========================================================= */
  const CHHATH_VIDEOS = [
    {
      id: "W34L_i63B0g",
      title: "केलवा के पात पर — शारदा सिन्हा (Official Video)",
      label: "केलवा के पात पर"
    },
    {
      id: "j1uN5NfM2Fw",
      title: "उगी हे दीनानाथ — शारदा सिन्हा (पारंपरिक छठ गीत)",
      label: "उगी हे दीनानाथ"
    },
    {
      id: "7nJjS0oT-Z0",
      title: "पहिले पहिल हम कईनी — अनुराधा पौडवाल",
      label: "पहिले पहिल छठी मईया"
    },
    {
      id: "9U1hQ3_x8v4",
      title: "कांच ही बांस के बहंगिया — कल्पना पटवारी",
      label: "कांच ही बांस के बहंगिया"
    },
    {
      id: "a-vC7bJqD1M",
      title: "छठ घाटे बाजे बाजनवा — पवन सिंह",
      label: "छठ घाटे बाजे बाजनवा"
    }
  ];

  let currentVideoIndex = 0;
  let isBackgroundVideoMode = false;

  const videoPlayBtn = document.getElementById("videoPlayBtn");
  const videoTheaterModal = document.getElementById("videoTheaterModal");
  const videoBackdrop = document.getElementById("videoBackdrop");
  const videoFrameContainer = document.getElementById("videoFrameContainer");
  const videoChipsList = document.getElementById("videoChipsList");
  const currentVideoTitle = document.getElementById("currentVideoTitle");
  const bgModeToggleBtn = document.getElementById("bgModeToggleBtn");
  const bgModeLabel = document.getElementById("bgModeLabel");
  const bgModeIcon = document.getElementById("bgModeIcon");
  const closeVideoBtn = document.getElementById("closeVideoBtn");

  function renderVideoChips() {
    if (!videoChipsList) return;
    videoChipsList.innerHTML = CHHATH_VIDEOS.map((vid, idx) => `
      <button class="video-chip ${idx === currentVideoIndex ? "active" : ""}" data-idx="${idx}" type="button">
        ▶ ${escapeHTML(vid.label)}
      </button>
    `).join("");

    videoChipsList.querySelectorAll(".video-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const idx = parseInt(chip.getAttribute("data-idx"), 10);
        loadYouTubeVideo(idx);
      });
    });
  }

  function loadYouTubeVideo(index) {
    if (!CHHATH_VIDEOS[index] || !videoFrameContainer) return;
    currentVideoIndex = index;
    const video = CHHATH_VIDEOS[index];

    if (currentVideoTitle) {
      currentVideoTitle.textContent = video.title;
    }

    // Pause offline audio player to avoid overlapping sound
    if (offlineAudio && !offlineAudio.paused) {
      offlineAudio.pause();
      showToast("🎵 ऑडियो प्लेयर पॉज़ किया गया (Video Play Active)");
    }

    // Inject responsive iframe with autoplay
    videoFrameContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1" 
        title="${escapeHTML(video.title)}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    renderVideoChips();
  }

  function openVideoTheater(index = 0) {
    if (!videoTheaterModal) return;
    videoTheaterModal.classList.add("open");
    videoTheaterModal.setAttribute("aria-hidden", "false");
    loadYouTubeVideo(index);
    showToast("🎬 छठ पूजा वीडियो दर्शन चालू हुआ");
  }

  function closeVideoTheater() {
    if (!videoTheaterModal) return;
    videoTheaterModal.classList.remove("open", "background-mode");
    videoTheaterModal.setAttribute("aria-hidden", "true");
    isBackgroundVideoMode = false;
    if (bgModeLabel) bgModeLabel.textContent = "Background Mode";
    if (bgModeIcon) bgModeIcon.textContent = "🖼️";

    // Cleanly remove iframe to stop audio/video
    if (videoFrameContainer) {
      videoFrameContainer.innerHTML = "";
    }
  }

  function toggleBackgroundVideoMode() {
    if (!videoTheaterModal) return;
    isBackgroundVideoMode = !isBackgroundVideoMode;
    videoTheaterModal.classList.toggle("background-mode", isBackgroundVideoMode);

    if (isBackgroundVideoMode) {
      if (bgModeLabel) bgModeLabel.textContent = "Full View";
      if (bgModeIcon) bgModeIcon.textContent = "🖥️";
      showToast("🖼️ बैकग्राउंड वीडियो मोड चालू (Mini Player Active)");
    } else {
      if (bgModeLabel) bgModeLabel.textContent = "Background Mode";
      if (bgModeIcon) bgModeIcon.textContent = "🖼️";
      showToast("🖥️ फुल थिएटर मोड चालू");
    }
  }

  if (videoPlayBtn) {
    videoPlayBtn.addEventListener("click", () => {
      openVideoTheater(currentVideoIndex);
    });
  }

  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", closeVideoTheater);
  }

  if (videoBackdrop) {
    videoBackdrop.addEventListener("click", () => {
      if (!isBackgroundVideoMode) {
        closeVideoTheater();
      }
    });
  }

  if (bgModeToggleBtn) {
    bgModeToggleBtn.addEventListener("click", toggleBackgroundVideoMode);
  }

  /* =========================================================
     9. STARTUP INITIALIZATION
     ========================================================= */
  offlineAudio.volume = 1;
  if (volumeSlider) volumeSlider.value = 100;
  updateVolumeIcon(1);
  loadOfflineSongs();
})();