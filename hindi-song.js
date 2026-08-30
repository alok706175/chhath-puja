/* =========================================================
   छठ घाट (Chhath Ghat) - Superhit Hindi Songs Interactive Script
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     0. BILINGUAL INTERNATIONALIZATION (HINDI / ENGLISH)
     ========================================================= */
  let currentLang = "en"; // Default English
  let selectedCategory = "all";

  const i18n = {
    hi: {
      langBtnText: "हिंदी",
      langBtnTitle: "भाषा: हिंदी (अंग्रेज़ी में बदलने के लिए क्लिक करें)",
      langBtnAria: "अंग्रेज़ी भाषा में बदलें",
      timeWidgetTitle: "भारतीय मानक समय (IST)",
      navBackText: "वापस जाएं",
      navBackTitle: "मुख्य पृष्ठ पर वापस जाएं",
      navBackAria: "वापस जाएं",
      navAboutText: "परिचय",
      navAboutTitle: "गीत संग्रह के बारे में",
      navAboutAria: "गीत संग्रह के बारे में",
      navHindiSongText: "हिंदी गीत",
      navHindiSongTitle: "हिंदी गीत संग्रह (सक्रिय)",
      navHindiSongAria: "हिंदी गीत संग्रह",
      hindiBadgeText: "✨ 78 सुपरहिट बॉलीवुड गीत",
      mainLogoText: "हिंदी गीत संग्रह",
      taglineText: "॥ बॉलीवुड क्लासिक्स • रोमांटिक हिट्स • डांस बीट्स ॥",
      loadingSong: "गीत लोड हो रहा है...",
      playlistTitle: "हिंदी गीत सूची",
      playlistSearchPlaceholder: "गीत या गायक का नाम खोजें...",
      noSongsFound: "कोई गीत नहीं मिला",
      prevSongTitle: "पिछला गीत",
      playBtnTitle: "चलाएं / रोकें",
      nextSongTitle: "अगला गीत",
      playlistBtnTitle: "गीत सूची (Playlist)",
      playlistCloseTitle: "गीत सूची बंद करें",
      muteBtnTitle: "ध्वनि म्यूट / अनम्यूट",
      speedBtnTitle: "प्लेबैक स्पीड बदलें (Playback Speed)",
      volumeSliderTitle: "वॉल्यूम कम या ज्यादा करें",
      seekSliderTitle: "गीत को आगे या पीछे करें",
      gridTitleText: "हिंदी सुपरहिट बॉलीवुड संग्रह (78 Songs)",
      gridSubtitleText: "किसी भी गीत पर क्लिक करके 320 Kbps HD में सुनें",
      shareBtnLabel: "शेयर",
      shareBtnTitle: "हिंदी गीत संग्रह शेयर करें",
      shareBtnAria: "शेयर विकल्प",
      whatsappLabel: "व्हाट्सएप",
      facebookLabel: "फेसबुक",
      instagramLabel: "इंस्टाग्राम",
      toastLangSwitched: "भाषा बदलकर हिंदी कर दी गई है",
      toastMuted: "🔇 ध्वनि म्यूट की गई",
      toastUnmuted: "🔊 ध्वनि अनम्यूट की गई",
      toastSpeed: "⚡ प्लेबैक स्पीड: ",
      nowPlayingPrefix: "🎶 बज रहा है: "
    },
    en: {
      langBtnText: "English",
      langBtnTitle: "Language: English (Click to switch to Hindi)",
      langBtnAria: "Switch language to Hindi",
      timeWidgetTitle: "Indian Standard Time (IST)",
      navBackText: "Go Back",
      navBackTitle: "Go Back to Home",
      navBackAria: "Go Back",
      navAboutText: "About",
      navAboutTitle: "About Songs Collection",
      navAboutAria: "About Songs Collection",
      navHindiSongText: "Hindi Song",
      navHindiSongTitle: "Hindi Songs Collection (Active)",
      navHindiSongAria: "Hindi Songs Collection",
      hindiBadgeText: "✨ 78 Superhit Bollywood Songs",
      mainLogoText: "Hindi Songs Collection",
      taglineText: "॥ Bollywood Classics • Romantic Hits • Dance Beats ॥",
      loadingSong: "Loading Hindi Songs...",
      playlistTitle: "Hindi Songs Playlist",
      playlistSearchPlaceholder: "Search song, movie, or singer name...",
      noSongsFound: "No songs found",
      prevSongTitle: "Previous Track",
      playBtnTitle: "Play / Pause",
      nextSongTitle: "Next Track",
      playlistBtnTitle: "Playlist",
      playlistCloseTitle: "Close Playlist",
      muteBtnTitle: "Mute / Unmute Volume",
      speedBtnTitle: "Playback Speed",
      volumeSliderTitle: "Adjust Volume",
      seekSliderTitle: "Seek Track",
      gridTitleText: "Superhit Bollywood Collection (78 Songs)",
      gridSubtitleText: "Click any song card to play in 320 Kbps HD",
      shareBtnLabel: "Share",
      shareBtnTitle: "Share Hindi Songs Collection",
      shareBtnAria: "Share Options",
      whatsappLabel: "WhatsApp",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      toastLangSwitched: "Language switched to English",
      toastMuted: "🔇 Volume Muted",
      toastUnmuted: "🔊 Volume Unmuted",
      toastSpeed: "⚡ Playback Speed: ",
      nowPlayingPrefix: "🎶 Now Playing: "
    }
  };

  /* =========================================================
     1. LIVE CLOCK (IST)
     ========================================================= */
  const langDays = {
    hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };
  const langMonths = {
    hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };

  let isClockHovered = false;
  const timeWidget = document.getElementById("timeWidget");
  if (timeWidget) {
    timeWidget.addEventListener("mouseenter", () => {
      isClockHovered = true;
      updateClock();
    });
    timeWidget.addEventListener("mouseleave", () => {
      isClockHovered = false;
      updateClock();
    });
  }

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const days = langDays[currentLang] || langDays.en;
    const months = langMonths[currentLang] || langMonths.en;

    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");

    if (timeEl) {
      timeEl.textContent = isClockHovered ? `${hours}:${minutes}:${seconds} ${suffix}` : `${hours}:${minutes} ${suffix}`;
    }
    if (dateEl) {
      dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
    }
    if (timeWidget && i18n[currentLang]) {
      timeWidget.title = i18n[currentLang].timeWidgetTitle;
    }
  }
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
     3. WHATSAPP & SOCIAL SHARING
     ========================================================= */
  const SHARE_URL = window.location.href;

  function shareOnWhatsApp(customHeading) {
    const title = customHeading || "🎶 78 सुपरहिट हिंदी बॉलीवुड गीत संग्रह 🎧";
    const body =
      `${title}\n\n` +
      `सुनिए सदाबहार 90s क्लासिक्स, रोमांटिक हिट्स और डांस बीट्स 320 Kbps HD ऑडियो में:\n\n` +
      `▶️ *ऑनलाइन गीत यहां सुनें:* \n${SHARE_URL}\n\n` +
      `✨ लता मंगेशकर, कुमार सानु, उदित नारायण, सोनू निगम, अरिजीत सिंह और श्रेया घोषाल के सुपरहिट गीत! 🎵`;

    const waLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(body)}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
    showToast("✨ व्हाट्सएप पर साझा किया जा रहा है...");
  }

  const shareDropdown = document.getElementById("shareDropdown");
  const shareMainBtn = document.getElementById("shareMainBtn");
  if (shareMainBtn && shareDropdown) {
    shareMainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = shareDropdown.classList.toggle("open");
      shareMainBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.addEventListener("click", (e) => {
    if (shareDropdown && !shareDropdown.contains(e.target)) {
      shareDropdown.classList.remove("open");
      if (shareMainBtn) shareMainBtn.setAttribute("aria-expanded", "false");
    }
  });

  const waShareBtn = document.getElementById("whatsappShareBtn");
  if (waShareBtn) {
    waShareBtn.addEventListener("click", () => {
      shareOnWhatsApp("🎶 78 सुपरहिट हिंदी बॉलीवुड गीत संग्रह 🎧");
    });
  }

  const fbShareBtn = document.getElementById("facebookShareBtn");
  if (fbShareBtn) {
    fbShareBtn.addEventListener("click", () => {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent("🎶 78 सुपरहिट हिंदी बॉलीवुड गीत संग्रह ऑनलाइन सुनें 🎧")}`;
      window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      showToast("✨ फेसबुक पर साझा किया जा रहा है...");
    });
  }

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

  /* =========================================================
     4. PARTICLES ANIMATION (DISABLED)
     ========================================================= */

/* =========================================================
     5. HINDI SONGS AUDIO PLAYER CONTROLLER
     ========================================================= */
  let songs = [];
  let currentSong = 0;
  let isPlaying = false;
  let isSeeking = false;
  let progressInterval = null;
  let seekDebounceTimeout = null;
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
  const speedDropdown = document.getElementById("speedDropdown");
  const speedBtn = document.getElementById("speedBtn");
  const speedLabel = document.getElementById("speedLabel");
  const speedDropdownMenu = document.getElementById("speedDropdownMenu");
  const speedMenuItems = document.querySelectorAll(".speed-menu-item");
  const playerElem = document.getElementById("offlinePlayer");

  let currentSpeedIndex = 2; // Default 1.0x
  const PLAYBACK_SPEEDS = [
    { value: 0.5, label: "0.5x" },
    { value: 0.75, label: "0.75x" },
    { value: 1.0, label: "1.0x" },
    { value: 1.25, label: "1.25x" },
    { value: 1.5, label: "1.50x" },
    { value: 1.75, label: "1.75x" },
    { value: 2.0, label: "2.0x" }
  ];

  const playlistToggleBtn = document.getElementById("playlistToggleBtn");
  const playlistCloseBtn = document.getElementById("playlistCloseBtn");
  const playlistModal = document.getElementById("playlistModal");
  const playlistList = document.getElementById("playlistList");
  const playlistTitleText = document.getElementById("playlistTitleText");
  const playlistSearch = document.getElementById("playlistSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");

  const langToggleBtn = document.getElementById("langToggleBtn");
  const langText = document.getElementById("langText");
  const mainLogoText = document.getElementById("mainLogoText");
  const taglineText = document.getElementById("taglineText");
const gridTitleText = document.getElementById("gridTitleText");
/* Format seconds to M:SS */
  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  /* Load Hindi songs dataset from data/hindi_songs/hindi_songs.json */
  async function loadHindiSongs() {
    try {
      const res = await fetch("data/hindi_songs/hindi_songs.json", { cache: "no-store" });
      if (res.ok) {
        songs = await res.json();
      }
    } catch (e) {
      console.warn("Hindi songs fetch error:", e);
    }

    if (!Array.isArray(songs) || songs.length === 0) {
      if (songName) songName.textContent = "No Hindi Song Found";
      return;
    }

    const t = i18n[currentLang] || i18n.en;
    if (playlistTitleText) {
      playlistTitleText.textContent = `${t.playlistTitle} (${songs.length})`;
    }

    renderPlaylist();
    renderSongCardsGrid();
    displaySongInfo(0);

    // Preload first song
    if (offlineAudio && songs[0] && songs[0].file) {
      offlineAudio.src = songs[0].file;
      offlineAudio.load();
    }
  }

  function displaySongInfo(index) {
    if (!songs[index]) return;
    currentSong = index;
    const s = songs[index];
    const isEn = currentLang === "en";

    const title = isEn ? (s.nameEn || s.name) : s.name;
    const singer = isEn ? (s.singerEn || s.singer) : s.singer;

    if (songName) songName.textContent = title;
    if (songSinger) songSinger.textContent = singer;

    // Highlight current playing card in the grid
    const cards = document.querySelectorAll(".song-card");
    cards.forEach((card) => {
      const cardSongId = parseInt(card.getAttribute("data-song-idx"), 10);
      if (cardSongId === index) {
        card.classList.add("now-playing");
      } else {
        card.classList.remove("now-playing");
      }
    });
  }

  function playSong(index) {
    if (!songs[index]) return;
    currentSong = index;
    displaySongInfo(index);

    if (offlineAudio) {
      const s = songs[index];
      if (offlineAudio.src !== s.file) {
        offlineAudio.src = s.file;
        offlineAudio.load();
      }

      const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
      const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;
      offlineAudio.volume = volNum / 100;
      offlineAudio.playbackRate = activeRate;

      offlineAudio.play().then(() => {
        setPlaybackState(true);
        const prefix = (i18n[currentLang] && i18n[currentLang].nowPlayingPrefix) || "🎶 Now Playing: ";
        showToast(prefix + (currentLang === "en" ? (s.nameEn || s.name) : s.name));
      }).catch(err => {
        console.warn("Playback error:", err);
      });
    }
  }

  function togglePlayback() {
    if (isPlaying) {
      if (offlineAudio && !offlineAudio.paused) {
        offlineAudio.pause();
      }
      setPlaybackState(false);
      showToast("⏸️ गीत पॉज़ किया गया");
    } else {
      if (offlineAudio) {
        const s = songs[currentSong];
        if (s && offlineAudio.src !== s.file) {
          offlineAudio.src = s.file;
        }
        const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
        const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;
        offlineAudio.volume = volNum / 100;
        offlineAudio.playbackRate = activeRate;
        offlineAudio.play().catch(console.warn);
      }
      setPlaybackState(true);
      showToast("▶️ हिंदी गीत शुरू हुआ!");
    }
  }

  function playPrevious() {
    if (!songs.length) return;
    const prevPos = (currentSong - 1 + songs.length) % songs.length;
    playSong(prevPos);
  }

  function playNext() {
    if (!songs.length) return;
    const nextPos = (currentSong + 1) % songs.length;
    playSong(nextPos);
  }

  if (offlineAudio) {
    offlineAudio.addEventListener("ended", () => {
      playNext();
    });
  }

  function setPlaybackState(playing) {
    isPlaying = playing;
    if (playing) {
      if (playIcon) playIcon.textContent = "❚❚";
      if (albumCover) albumCover.classList.add("spinning");
      if (playerElem) playerElem.classList.add("playing");
      startProgressSync();
    } else {
      if (playIcon) playIcon.textContent = "▶";
      if (albumCover) albumCover.classList.remove("spinning");
      if (playerElem) playerElem.classList.remove("playing");
      stopProgressSync();
    }
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    updateMediaSessionMetadata();
  }

  function startProgressSync() {
    stopProgressSync();
    progressInterval = setInterval(updateLiveProgress, 250);
  }

  function stopProgressSync() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  function updateLiveProgress() {
    if (!offlineAudio || isSeeking) return;
    const dur = offlineAudio.duration || 0;
    const cur = offlineAudio.currentTime || 0;

    if (dur > 0) {
      const pct = (cur / dur) * 100;
      if (progress) progress.value = pct;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (totalTime) totalTime.textContent = formatTime(dur);
    }
    if (currentTime) currentTime.textContent = formatTime(cur);
    updateMediaSessionPosition(cur, dur);
  }

  /* Seek interactions */
  if (progress) {
    const handleSeekInput = () => {
      isSeeking = true;
      if (seekDebounceTimeout) clearTimeout(seekDebounceTimeout);
      const dur = offlineAudio ? offlineAudio.duration || 0 : 0;
      const pct = parseFloat(progress.value) || 0;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (currentTime && dur > 0) {
        currentTime.textContent = formatTime((pct / 100) * dur);
      }
    };

    const handleSeekCommit = () => {
      const dur = offlineAudio ? offlineAudio.duration || 0 : 0;
      const pct = parseFloat(progress.value) || 0;
      if (dur > 0 && offlineAudio) {
        offlineAudio.currentTime = (pct / 100) * dur;
      }
      isSeeking = false;
    };

    progress.addEventListener("input", handleSeekInput);
    progress.addEventListener("change", handleSeekCommit);
    progress.addEventListener("mouseup", handleSeekCommit);
    progress.addEventListener("touchend", handleSeekCommit);
  }

  /* Volume & Mute Controls */
  const VOL_HIGH_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M13.5 9.5C14.3 10.3 14.8 11.1 14.8 12s-.5 1.7-1.3 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 7.5C17.9 8.9 18.7 10.4 18.7 12s-.8 3.1-2.2 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19.5 5.5C21.5 7.5 22.6 9.7 22.6 12s-1.1 4.5-3.1 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  const VOL_MUTE_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;

  function updateVolumeTrack(volNum) {
    if (volumeSlider) {
      volumeSlider.style.setProperty('--vol-percent', `${volNum}%`);
    }
  }

  if (volumeSlider) {
    updateVolumeTrack(100);
    volumeSlider.addEventListener("input", () => {
      const volNum = parseInt(volumeSlider.value, 10);
      updateVolumeTrack(volNum);
      if (offlineAudio) offlineAudio.volume = volNum / 100;
      if (muteBtn) muteBtn.innerHTML = volNum === 0 ? VOL_MUTE_ICON : VOL_HIGH_ICON;
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      const isMuted = offlineAudio ? offlineAudio.volume === 0 : false;
      if (isMuted) {
        const targetVol = lastVolume > 0 ? Math.round(lastVolume * 100) : 100;
        if (offlineAudio) offlineAudio.volume = targetVol / 100;
        if (volumeSlider) volumeSlider.value = targetVol;
        updateVolumeTrack(targetVol);
        muteBtn.innerHTML = VOL_HIGH_ICON;
        showToast((i18n[currentLang] && i18n[currentLang].toastUnmuted) || "🔊 Volume Unmuted");
      } else {
        const currentVol = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
        if (currentVol > 0) lastVolume = currentVol / 100;
        if (offlineAudio) offlineAudio.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
        updateVolumeTrack(0);
        muteBtn.innerHTML = VOL_MUTE_ICON;
        showToast((i18n[currentLang] && i18n[currentLang].toastMuted) || "🔇 Volume Muted");
      }
    });
  }

  /* Playback Speed */
  function setPlaybackRate(r) {
    if (offlineAudio) offlineAudio.playbackRate = r;
    if (speedLabel) speedLabel.textContent = `${r}x`;
    if (speedMenuItems) {
      speedMenuItems.forEach(item => {
        const sp = parseFloat(item.getAttribute("data-speed"));
        if (Math.abs(sp - r) < 0.01) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
    const t = i18n[currentLang] || i18n.en;
    showToast((t.toastSpeed || "⚡ Playback Speed: ") + `${r}x`);
  }

  if (speedBtn && speedDropdown) {
    speedBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      speedDropdown.classList.toggle("open");
    });
  }

  if (speedMenuItems) {
    speedMenuItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const sp = parseFloat(item.getAttribute("data-speed"));
        if (!isNaN(sp)) setPlaybackRate(sp);
        if (speedDropdown) speedDropdown.classList.remove("open");
      });
    });
  }

  document.addEventListener("click", () => {
    if (speedDropdown) speedDropdown.classList.remove("open");
  });

  /* =========================================================
     6. PLAYLIST DRAWER & CATEGORY FILTERING
     ========================================================= */
  function renderPlaylist(query = "") {
    if (!playlistList) return;
    playlistList.innerHTML = "";

    const q = query.trim().toLowerCase();
    const isEn = currentLang === "en";

    const filtered = songs.map((s, originalIdx) => ({ ...s, originalIdx })).filter(s => {
      const matchCat = selectedCategory === "all" || s.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const title = (isEn ? (s.nameEn || s.name) : s.name).toLowerCase();
      const singer = (isEn ? (s.singerEn || s.singer) : s.singer).toLowerCase();
      return title.includes(q) || singer.includes(q);
    });

    if (filtered.length === 0) {
      const t = i18n[currentLang] || i18n.en;
      playlistList.innerHTML = `<div class="playlist-empty">${t.noSongsFound}</div>`;
      return;
    }

    filtered.forEach((s) => {
      const item = document.createElement("div");
      item.className = "playlist-item" + (s.originalIdx === currentSong ? " active" : "");
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", s.originalIdx === currentSong ? "true" : "false");

      const title = isEn ? (s.nameEn || s.name) : s.name;
      const singer = isEn ? (s.singerEn || s.singer) : s.singer;

      item.innerHTML = `
        <div class="item-num">${s.originalIdx === currentSong ? (isPlaying ? "❚❚" : "▶") : (s.id || s.originalIdx + 1)}</div>
        <div class="item-info">
          <div class="item-title">${title}</div>
          <div class="item-singer">${singer} • <span style="color:#71717a;font-size:11px;">${s.category || "Bollywood"}</span></div>
        </div>
        <div class="item-duration">${s.duration || "320K"}</div>
      `;

      item.addEventListener("click", () => {
        playSong(s.originalIdx);
        if (playlistModal) playlistModal.classList.remove("open");
      });

      playlistList.appendChild(item);
    });
  }

  /* Render Song Cards Grid Section */
  function renderSongCardsGrid() {
    const grid = document.getElementById("songsCardsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const isEn = currentLang === "en";

    songs.forEach((s, idx) => {
      if (selectedCategory !== "all" && s.category !== selectedCategory) return;

      const card = document.createElement("div");
      card.className = "song-card" + (idx === currentSong ? " now-playing" : "");
      card.setAttribute("data-song-idx", idx);

      const title = isEn ? (s.nameEn || s.name) : s.name;
      const singer = isEn ? (s.singerEn || s.singer) : s.singer;

      card.innerHTML = `
        <div class="song-card-header">
          <div class="song-card-number">${s.id || idx + 1}</div>
          <div class="song-card-cat">${s.category || "Bollywood"}</div>
        </div>
        <div class="song-card-body">
          <div class="song-card-title">${title}</div>
          <div class="song-card-singer">🎤 ${singer}</div>
        </div>
        <div class="song-card-footer">
          <div class="song-card-duration">⏱️ ${s.duration || "320 Kbps"}</div>
          <button class="song-card-play-btn" type="button" aria-label="Play ${title}">
            <span>▶</span> <span>${isEn ? "Play" : "सुनें"}</span>
          </button>
        </div>
      `;

      card.addEventListener("click", () => {
        playSong(idx);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      grid.appendChild(card);
    });
  }

  /* Category chips filter listener */
  const categoryChips = document.querySelectorAll(".category-chip");
  if (categoryChips) {
    categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        selectedCategory = chip.getAttribute("data-cat") || "all";
        renderPlaylist(playlistSearch ? playlistSearch.value : "");
        renderSongCardsGrid();
      });
    });
  }

  /* Playlist Search & Drawer */
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

  if (playlistToggleBtn && playlistModal) {
    playlistToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = playlistModal.classList.toggle("open");
      if (isOpen && playlistSearch) {
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

  document.addEventListener("click", (e) => {
    if (playlistModal && !playlistModal.contains(e.target) && e.target !== playlistToggleBtn && !playlistToggleBtn.contains(e.target)) {
      playlistModal.classList.remove("open");
    }
  });

  /* =========================================================
     7. BILINGUAL LANGUAGE TOGGLE
     ========================================================= */
  function setLanguage(lang, showToastMsg = false) {
    if (!i18n[lang]) return;
    currentLang = lang;
    const t = i18n[lang];

    document.documentElement.lang = currentLang;

    if (langToggleBtn) {
      langToggleBtn.setAttribute("data-lang", lang);
      langToggleBtn.title = t.langBtnTitle;
      langToggleBtn.setAttribute("aria-label", t.langBtnAria);
    }
    if (langText) langText.textContent = t.langBtnText;

    const navBackText = document.getElementById("navBackText");
    const navBackBtn = document.getElementById("navBackBtn");
    if (navBackText) navBackText.textContent = t.navBackText;
    if (navBackBtn && t.navBackTitle) navBackBtn.title = t.navBackTitle;

    const navAboutText = document.getElementById("navAboutText");
    if (navAboutText) navAboutText.textContent = t.navAboutText;

    

    const shareBtnLabel = document.getElementById("shareBtnLabel");
    if (shareBtnLabel) shareBtnLabel.textContent = t.shareBtnLabel;
    if (mainLogoText) mainLogoText.textContent = t.mainLogoText;
    if (taglineText) taglineText.textContent = t.taglineText;
    if (gridTitleText) gridTitleText.textContent = t.gridTitleText;
if (playlistSearch) playlistSearch.placeholder = t.playlistSearchPlaceholder;

    displaySongInfo(currentSong);
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    renderSongCardsGrid();
    updateClock();

    if (showToastMsg) {
      showToast(t.toastLangSwitched);
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const next = currentLang === "en" ? "hi" : "en";
      setLanguage(next, true);
    });
  }

  const navAboutBtn = document.getElementById("navAboutBtn");
  if (navAboutBtn) {
    navAboutBtn.addEventListener("click", () => {
      const footer = document.getElementById("appFooter");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* Player button event listeners */
  if (playButton) playButton.addEventListener("click", togglePlayback);
  if (prevBtn) prevBtn.addEventListener("click", playPrevious);
  if (nextBtn) nextBtn.addEventListener("click", playNext);

  /* =========================================================
     8. MEDIA SESSION API & KEYBOARD SHORTCUTS
     ========================================================= */
  const MEDIA_SESSION_SUPPORTED = "mediaSession" in navigator;

  function updateMediaSessionPosition(pos = 0, dur = 0) {
    if (!MEDIA_SESSION_SUPPORTED || !("setPositionState" in navigator.mediaSession)) return;
    if (!isFinite(dur) || dur <= 0 || !isFinite(pos) || pos < 0) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: dur,
        playbackRate: 1,
        position: Math.min(pos, dur)
      });
    } catch (e) { }
  }

  function updateMediaSessionMetadata() {
    if (!MEDIA_SESSION_SUPPORTED || !songs[currentSong]) return;
    try {
      const s = songs[currentSong];
      const title = currentLang === "en" ? (s.nameEn || s.name) : s.name;
      const singer = currentLang === "en" ? (s.singerEn || s.singer) : s.singer;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: singer || "Bollywood Hits",
        album: "Superhit Hindi Songs",
        artwork: [
          { src: "favicon.io/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "favicon.io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
        ]
      });
    } catch (e) { }
  }

  if (MEDIA_SESSION_SUPPORTED) {
    try {
      navigator.mediaSession.setActionHandler("play", togglePlayback);
      navigator.mediaSession.setActionHandler("pause", togglePlayback);
      navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
      navigator.mediaSession.setActionHandler("nexttrack", playNext);
    } catch (e) { }
  }

  window.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (activeTag === "input" || activeTag === "textarea") {
      if (e.key === "Escape" && playlistModal) playlistModal.classList.remove("open");
      return;
    }

    if (e.code === "Space" || e.key === " " || e.key === "k" || e.key === "K") {
      e.preventDefault();
      togglePlayback();
    } else if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      if (muteBtn) muteBtn.click();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (offlineAudio) {
        offlineAudio.currentTime = Math.min(offlineAudio.duration || 9999, (offlineAudio.currentTime || 0) + 5);
        showToast("⏩ +5s");
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (offlineAudio) {
        offlineAudio.currentTime = Math.max(0, (offlineAudio.currentTime || 0) - 5);
        showToast("⏪ -5s");
      }
    } else if (e.key === "Escape") {
      if (playlistModal) playlistModal.classList.remove("open");
      if (speedDropdown) speedDropdown.classList.remove("open");
    }
  });

  /* =========================================================
     9. STARTUP INITIALIZATION
     ========================================================= */
  setLanguage("en", false);
  loadHindiSongs();
})();
