/* =========================================================
   छठ घाट (Chhath Ghat) - Audio Player & Interactive Script
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     0. BILINGUAL INTERNATIONALIZATION (HINDI / ENGLISH)
     ========================================================= */
  let currentLang = "en"; // Default English

  const i18n = {
    hi: {
      langBtnText: "हिंदी",
      langBtnTitle: "Switch to English (अंग्रेजी में बदलें)",
      timeWidgetTitle: "Indian Standard Time (IST)",
      navHomeText: "Home",
      navAboutText: "About",
      mainLogoText: "छठ घाट",
      taglineText: "॥ जय छठी मईया ॥",
      pillNum1: "१",
      pillText1: "नहाय-खाय",
      pillNum2: "२",
      pillText2: "खरना",
      pillNum3: "३",
      pillText3: "संध्या अर्घ्य",
      pillNum4: "४",
      pillText4: "उषा अर्घ्य",
      singerPrefix: "छठ महापर्व • ",
      loadingSong: "Loading Chhath Geet...",
      playlistTitle: "छठ गीत संग्रह",
      playlistSubtitle: "पसंदीदा गीत चुनें और सुनें",
      playlistSearchPlaceholder: "गीत या गायक का नाम खोजें...",
      noSongsFound: "कोई गीत नहीं मिला",
      prevSongTitle: "पिछला गीत",
      playBtnTitle: "चलाएं / रोकें",
      nextSongTitle: "अगला गीत",
      playlistBtnTitle: "गीत सूची (Playlist)",
      muteBtnTitle: "ध्वनि म्यूट / अनम्यूट",
      ritualsBadge: "पवित्र परंपरा",
      ritualsHeading: "छठ महापर्व: चार दिवसीय अनुष्ठान",
      ritualsSubtitle: "लोक आस्था और प्रकृति की आराधना का पावन विधान",
      ritual1DayBadge: "प्रथम दिवस",
      ritual1Title: "नहाय-खाय",
      ritual1Desc: "छठ पर्व की शुरुआत पवित्र स्नान और शुद्ध सात्विक भोजन से होती है। इस दिन व्रती नदी या जलाशय में स्नान कर अरवा चावल, चने की दाल और कद्दू (लौकी) का प्रसाद ग्रहण करते हैं।",
      ritual1Highlight: "विशेष प्रसाद: कद्दू-भात एवं चना दाल",
      ritual2DayBadge: "द्वितीय दिवस",
      ritual2Title: "खरना (लोहंडा)",
      ritual2Desc: "इस दिन व्रती दिनभर निर्जला उपवास रखते हैं और शाम को मिट्टी के चूल्हे पर गुड़, अरवा चावल और गाय के दूध से बनी खीर तथा रोटी का भोग छठी मईया को अर्पित कर प्रसाद ग्रहण करते हैं।",
      ritual2Highlight: "विशेष प्रसाद: गुड़ की खीर और रोटी",
      ritual3DayBadge: "तृतीय दिवस",
      ritual3Title: "संध्या अर्घ्य (पहला अर्घ्य)",
      ritual3Desc: "कार्तिक शुक्ल षष्ठी की शाम को सूप, दउरा में ठेकुआ, मौसमी फल लेकर नदी/तालाब के घाट पर जाकर कमर तक जल में खड़े होकर अस्ताचलगामी (डूबते हुए) भगवान सूर्य को अर्घ्य दिया जाता है।",
      ritual3Highlight: "विशेष अर्घ्य: अस्ताचलगामी सूर्य देव को अर्घ्य",
      ritual4DayBadge: "चतुर्थ दिवस",
      ritual4Title: "उषा अर्घ्य (पारन)",
      ritual4Desc: "सप्तमी की भोर में उदीयमान (उगते हुए) सूर्य को अर्घ्य देकर 36 घंटे के कठिन निर्जला व्रत का समापन (पारन) होता है। छठी मईया से परिवार के सुख, स्वास्थ्य एवं दीर्घायु की प्रार्थना की जाती है।",
      ritual4Highlight: "विशेष अर्घ्य: उदीयमान सूर्य देव को अर्घ्य व पारन",
      mantraTitle: "॥ श्री सूर्य गायत्री मंत्र ॥",
      shareBtnLabel: "शेयर",
      copyMantraBtnText: "Copy",
      shareMantraBtnText: "Share on WhatsApp",
      toastOnline: "🌐 ऑनलाइन वीडियो मोड चालू (YouTube Background)",
      toastOffline: "📴 ऑफ़लाइन ऑडियो मोड चालू (MP3 Music)",
      toastLangSwitched: "भाषा बदलकर 'हिन्दी' कर दी गई है",
      toastMantraCopied: "✅ सूर्य गायत्री मंत्र कॉपी हो गया!",
      toastMuted: "🔇 म्यूट किया गया",
      toastUnmuted: "🔊 ध्वनि चालू",
      toastSpeed: "⚡ प्लेबैक गति: ",
      nowPlayingPrefix: "🎶 अब बज रहा है: "
    },
    en: {
      langBtnText: "English",
      langBtnTitle: "Switch to Hindi (हिंदी में बदलें)",
      timeWidgetTitle: "Indian Standard Time (IST)",
      navHomeText: "Home",
      navAboutText: "About",
      mainLogoText: "Chhath Ghat",
      taglineText: "॥ Jai Chhathi Maiya ॥",
      pillNum1: "1",
      pillText1: "Nahay-Khay",
      pillNum2: "2",
      pillText2: "Kharna",
      pillNum3: "3",
      pillText3: "Sandhya Arghya",
      pillNum4: "4",
      pillText4: "Usha Arghya",
      singerPrefix: "Chhath Mahaparv • ",
      loadingSong: "Loading Chhath Songs...",
      playlistTitle: "Chhath Songs Collection",
      playlistSubtitle: "Select & listen to devotional songs",
      playlistSearchPlaceholder: "Search song or singer name...",
      noSongsFound: "No songs found",
      prevSongTitle: "Previous Track",
      playBtnTitle: "Play / Pause",
      nextSongTitle: "Next Track",
      playlistBtnTitle: "Playlist",
      muteBtnTitle: "Mute / Unmute Volume",
      ritualsBadge: "Sacred Tradition",
      ritualsHeading: "Chhath Mahaparv : 4-Day Sacred Rituals",
      ritualsSubtitle: "The sacred celebration of cosmic solar energy, faith, and nature worship",
      ritual1DayBadge: "Day 1",
      ritual1Title: "Nahay-Khay",
      ritual1Desc: "The festival begins with a holy bath and pure satvik meal. Devotees take a sacred bath in holy water bodies and consume pumpkin-rice and chana dal prasad.",
      ritual1Highlight: "Special Prasad: Bottle Gourd Rice & Chana Dal",
      ritual2DayBadge: "Day 2",
      ritual2Title: "Kharna (Lohanda)",
      ritual2Desc: "Devotees observe a strict day-long fast without water, and in the evening offer jaggery kheer made with cow milk and roti to Chhathi Maiya before breaking the fast.",
      ritual2Highlight: "Special Prasad: Jaggery Rice Kheer & Roti",
      ritual3DayBadge: "Day 3",
      ritual3Title: "Sandhya Arghya (Evening Offering)",
      ritual3Desc: "On the evening of Kartik Shukla Shashthi, devotees gather at river ghats with bamboo baskets filled with thekua and fruits, standing in water to offer Arghya to the setting Sun.",
      ritual3Highlight: "Special Offering: Arghya to the Setting Sun",
      ritual4DayBadge: "Day 4",
      ritual4Title: "Usha Arghya (Morning Offering)",
      ritual4Desc: "At dawn on Saptami, devotees offer the final Arghya to the rising Sun, concluding the 36-hour fast with prayers for peace, prosperity and family longevity.",
      ritual4Highlight: "Special Offering: Arghya to Rising Sun & Paran",
      mantraTitle: "॥ Shri Surya Gayatri Mantra ॥",
      shareBtnLabel: "Share",
      copyMantraBtnText: "Copy",
      shareMantraBtnText: "Share on WhatsApp",
      toastOnline: "🌐 Online Video Mode Active (YouTube Background)",
      toastOffline: "📴 Offline Audio Mode Active (MP3 Music)",
      toastLangSwitched: "Language switched to English",
      toastMantraCopied: "✅ Surya Gayatri Mantra copied!",
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
    hi: [
      "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ],
    en: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
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

    const days = langDays[currentLang] || langDays.hi;
    const months = langMonths[currentLang] || langMonths.hi;

    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");

    if (timeEl) {
      if (isClockHovered) {
        timeEl.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
      } else {
        timeEl.textContent = `${hours}:${minutes} ${suffix}`;
      }
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
     3. WEB AUDIO SPIRITUAL CHIME / BELL
     ========================================================= */
  function playSpiritualChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

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

  /* Share Dropdown Trigger & Mobile Tap Support */
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
      const mantraMsg = currentLang === "en"
        ? `☀️ *Shri Surya Gayatri Mantra:*\n` +
        `Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi |\nTanno Adityah Prachodayat ||\n\n` +
        `"May we meditate upon the radiant Sun God, the supreme source of cosmic light. May that luminous deity illuminate our intellect."\n\n` +
        `Listen to devotional Chhath songs on Chhath Ghat: ${SHARE_URL}`
        : `☀️ *श्री सूर्य गायत्री मंत्र:*\n` +
        `ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि।\nतन्नो आदित्यः प्रचोदयात्॥\n\n` +
        `"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।"\n\n` +
        `छठ घाट पर सुनें भक्तिमय छठ गीत: ${SHARE_URL}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mantraMsg)}`, "_blank");
    });
  }

  const copyMantraBtn = document.getElementById("copyMantraBtn");
  if (copyMantraBtn) {
    copyMantraBtn.addEventListener("click", async () => {
      const mantra = currentLang === "en"
        ? "Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi | Tanno Adityah Prachodayat || - \"May we meditate upon the radiant Sun God, the supreme source of cosmic light. May that luminous deity illuminate our intellect.\""
        : "ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि। तन्नो आदित्यः प्रचोदयात्॥ - \"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।\"";
      try {
        await navigator.clipboard.writeText(mantra);
        showToast(currentLang === "en" ? "📋 Surya Gayatri Mantra copied!" : "📋 सूर्य गायत्री मंत्र भावार्थ सहित कॉपी हो गया!");
      } catch (err) {
        showToast((currentLang === "en" ? "📋 Copied: " : "📋 कॉपी हुआ: ") + mantra);
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
     7. UNIFIED DEVOTIONAL MUSIC & BACKGROUND VIDEO CONTROLLER
     ========================================================= */
  let songs = [];
  let currentSong = 0;
  let isSeeking = false;
  let lastVolume = 1;
  let isPlaying = false;
  let isOnlineMode = false; // Default: Offline Mode
  let ytPlayer = null;
  let isYtReady = false;
  let progressInterval = null;

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
  const speedBtn = document.getElementById("speedBtn");
  const speedLabel = document.getElementById("speedLabel");
  const playerElem = document.getElementById("offlinePlayer");

  let currentSpeedIndex = 0;
  const PLAYBACK_SPEEDS = [
    { value: 1.0, label: "1.0x" },
    { value: 1.25, label: "1.25x" },
    { value: 1.5, label: "1.50x" },
    { value: 1.75, label: "1.75x" },
    { value: 2.0, label: "2.0x" },
    { value: 0.5, label: "0.5x" },
    { value: 0.75, label: "0.75x" }
  ];

  const playlistToggleBtn = document.getElementById("playlistToggleBtn");
  const playlistCloseBtn = document.getElementById("playlistCloseBtn");
  const playlistModal = document.getElementById("playlistModal");
  const playlistList = document.getElementById("playlistList");
  const playlistTitle = document.getElementById("playlistTitle");
  const playlistTitleText = document.getElementById("playlistTitleText");
  const playlistSearch = document.getElementById("playlistSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");

  const modeToggleBtn = document.getElementById("modeToggleBtn");
  const modeText = document.getElementById("modeText");
  const bgVideoContainer = document.getElementById("bgVideoContainer");

  const langToggleBtn = document.getElementById("langToggleBtn");
  const langText = document.getElementById("langText");
  const mainLogoText = document.getElementById("mainLogoText");
  const taglineText = document.getElementById("taglineText");

  const ritualsHeading = document.getElementById("ritualsHeading");

  const ritual1DayBadge = document.getElementById("ritual1DayBadge");
  const ritual1Title = document.getElementById("ritual1Title");
  const ritual1Desc = document.getElementById("ritual1Desc");
  const ritual1Highlight = document.getElementById("ritual1Highlight");

  const ritual2DayBadge = document.getElementById("ritual2DayBadge");
  const ritual2Title = document.getElementById("ritual2Title");
  const ritual2Desc = document.getElementById("ritual2Desc");
  const ritual2Highlight = document.getElementById("ritual2Highlight");

  const ritual3DayBadge = document.getElementById("ritual3DayBadge");
  const ritual3Title = document.getElementById("ritual3Title");
  const ritual3Desc = document.getElementById("ritual3Desc");
  const ritual3Highlight = document.getElementById("ritual3Highlight");

  const ritual4DayBadge = document.getElementById("ritual4DayBadge");
  const ritual4Title = document.getElementById("ritual4Title");
  const ritual4Desc = document.getElementById("ritual4Desc");
  const ritual4Highlight = document.getElementById("ritual4Highlight");

  const mantraTitle = document.getElementById("mantraTitle");
  const mantraText = document.getElementById("mantraText");
  const copyMantraBtnText = document.getElementById("copyMantraBtnText");
  const shareMantraBtnText = document.getElementById("shareMantraBtnText");

  /* Function to switch language between Hindi and English */
  function setLanguage(lang, showToastMsg = false) {
    if (!i18n[lang]) return;
    currentLang = lang;
    const t = i18n[lang];

    document.documentElement.lang = currentLang;

    if (langToggleBtn) {
      langToggleBtn.setAttribute("data-lang", lang);
      langToggleBtn.title = t.langBtnTitle;
    }
    if (langText) langText.textContent = t.langBtnText;

    if (mainLogoText) mainLogoText.textContent = t.mainLogoText;
    if (taglineText) taglineText.textContent = t.taglineText;

    if (prevBtn) prevBtn.title = t.prevSongTitle;
    if (playButton) playButton.title = t.playBtnTitle;
    if (nextBtn) nextBtn.title = t.nextSongTitle;
    if (playlistToggleBtn) playlistToggleBtn.title = t.playlistBtnTitle;
    if (muteBtn) muteBtn.title = t.muteBtnTitle;

    const playlistTitleText = document.getElementById("playlistTitleText");
    if (playlistTitleText) {
      playlistTitleText.textContent = `${t.playlistTitle} (${songs.length || 8})`;
    } else if (playlistTitle) {
      playlistTitle.textContent = `${t.playlistTitle} (${songs.length || 8})`;
    }
    if (playlistSearch) playlistSearch.placeholder = t.playlistSearchPlaceholder;

    if (ritualsHeading) ritualsHeading.textContent = t.ritualsHeading;

    if (ritual1DayBadge) ritual1DayBadge.textContent = t.ritual1DayBadge;
    if (ritual1Title) ritual1Title.textContent = t.ritual1Title;
    if (ritual1Desc) ritual1Desc.textContent = t.ritual1Desc;
    if (ritual1Highlight) ritual1Highlight.textContent = t.ritual1Highlight;

    if (ritual2DayBadge) ritual2DayBadge.textContent = t.ritual2DayBadge;
    if (ritual2Title) ritual2Title.textContent = t.ritual2Title;
    if (ritual2Desc) ritual2Desc.textContent = t.ritual2Desc;
    if (ritual2Highlight) ritual2Highlight.textContent = t.ritual2Highlight;

    if (ritual3DayBadge) ritual3DayBadge.textContent = t.ritual3DayBadge;
    if (ritual3Title) ritual3Title.textContent = t.ritual3Title;
    if (ritual3Desc) ritual3Desc.textContent = t.ritual3Desc;
    if (ritual3Highlight) ritual3Highlight.textContent = t.ritual3Highlight;

    if (ritual4DayBadge) ritual4DayBadge.textContent = t.ritual4DayBadge;
    if (ritual4Title) ritual4Title.textContent = t.ritual4Title;
    if (ritual4Desc) ritual4Desc.textContent = t.ritual4Desc;
    if (ritual4Highlight) ritual4Highlight.textContent = t.ritual4Highlight;

    if (mantraTitle) mantraTitle.textContent = t.mantraTitle;
    if (mantraText) {
      if (currentLang === "en") {
        mantraText.innerHTML = `
          Om Bhaskaraya Vidmahe Mahadyutikaraya Dhimahi |<br>
          Tanno Adityah Prachodayat ||
          <span class="mantra-translation">"May we meditate upon the radiant Sun God, the supreme source of cosmic light. May that luminous deity illuminate our intellect."</span>
        `;
      } else {
        mantraText.innerHTML = `
          ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि।<br>
          तन्नो आदित्यः प्रचोदयात्॥
          <span class="mantra-translation">"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।"</span>
        `;
      }
    }

    const navHomeText = document.getElementById("navHomeText");
    const navAboutText = document.getElementById("navAboutText");
    if (navHomeText && t.navHomeText) navHomeText.textContent = t.navHomeText;
    if (navAboutText && t.navAboutText) navAboutText.textContent = t.navAboutText;
    const shareBtnLabel = document.getElementById("shareBtnLabel");
    if (shareBtnLabel && t.shareBtnLabel) shareBtnLabel.textContent = t.shareBtnLabel;
    if (copyMantraBtnText) copyMantraBtnText.textContent = t.copyMantraBtnText;
    if (shareMantraBtnText) shareMantraBtnText.textContent = t.shareMantraBtnText;

    displaySongInfo(currentSong);
    renderSEOContent();
    updateClock();
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    updateMediaSessionMetadata();

    if (showToastMsg) {
      showToast(t.toastLangSwitched);
    }
  }

  function renderSEOContent() {
    const seoContainer = document.getElementById("seoContentDynamic");
    if (!seoContainer) return;

    if (currentLang === "en") {
      seoContainer.innerHTML = `
        <h2 id="seoHeading">Chhath Puja Geet, Devotional Songs & Mahaparv Significance</h2>
        <p>
          Welcome to <strong>Chhath Ghat (छठ घाट)</strong>, a dedicated spiritual platform to listen to traditional Chhath Puja Geet, Bhojpuri Chhath songs, Chhathi Maiya Bhajan, and Lord Surya Dev devotional music online. Our high-definition music player brings you soul-stirring melodies by legends like Sharda Sinha, Anuradha Paudwal, Pawan Singh, Kalpana Patowary, Devi, and Neelkamal Singh.
        </p>

        <h2>Mythological & Cultural Significance of Chhath Mahaparv</h2>
        <p>
          Chhath Mahaparv is one of the most sacred, ancient, and austere Vedic festivals in Hindu culture, dedicated to the visible cosmic deity Lord Surya (the Sun God) and His sister Shashthi Devi (Chhathi Maiya). Celebrated on the Shashthi of Kartik Shukla Paksha, this four-day festival represents unwavering faith, deep spiritual purity, and intimate communion with nature. It is enthusiastically celebrated in Bihar, Jharkhand, Uttar Pradesh, the Terai of Nepal, and across the globe by millions of devotees.
        </p>
        <p>
          Chhath Puja is renowned for its profound environmental and social harmony. Devotees offer gratitude to the life-giving Sun, celebrating nature, water conservation, and cleanliness. Without any priestly intermediaries or caste barriers, people from all walks of life gather together at riverbanks to venerate both the setting and the rising Sun.
        </p>

        <h2>Popular Chhath Devotional Songs Collection</h2>
        <ul class="seo-song-list">
          <li><strong>Ugi Hey Dinanath</strong> — Kalpana Patowary</li>
          <li><strong>Kelwa Ke Paat Par</strong> — Sharda Sinha</li>
          <li><strong>Jal Beech Khada Hoyi</strong> — Pawan Singh</li>
          <li><strong>Uga Ho Surujdev Bhel Bhinsarwa</strong> — Anuradha Paudwal</li>
          <li><strong>Kerwa Ke Patwa Pe Newta</strong> — Pawan Singh</li>
          <li><strong>Dihi Darshan Suruj Gosaiya</strong> — Devi</li>
          <li><strong>Kaanch Hi Baans Ke Bahangiya</strong> — Sharda Sinha</li>
          <li><strong>Koshiya Bharaye Lagal</strong> — Neelkamal Singh & Priyanka Singh</li>
        </ul>

        <div class="seo-footer-credit">
          <p class="seo-note">
            ॥ Jai Chhathi Maiya • Om Suryaya Namah ॥ — Warm greetings and divine blessings on Chhath Mahaparv to all devotees from Chhath Ghat.
          </p>
        </div>
      `;
    } else {
      seoContainer.innerHTML = `
        <h2 id="seoHeading">छठ पूजा के मधुर गीत एवं महापर्व का महत्व</h2>
        <p>
          <strong>छठ घाट (Chhath Ghat)</strong> पर आपका हार्दिक स्वागत है। यह पारंपरिक छठ पूजा के मधुर गीत, भोजपुरी छठ गीत, छठी मईया के भजन और प्रत्यक्ष देव भगवान सूर्य की उपासना का एक पावन भक्ति मंच है। हमारे आधुनिक प्लेयर पर आप शारदा सिन्हा, अनुराधा पौडवाल, पवन सिंह, कल्पना पटवारी, देवी और नीलकमल सिंह जैसे महान कलाकारों के पावन भजन सुन सकते हैं।
        </p>

        <h2>छठ पर्व का पौराणिक एवं सांस्कृतिक महत्व</h2>
        <p>
          छठ पर्व (छठि या षष्ठी पूजा) सनातन धर्म का अत्यंत पवित्र, कठिन और लोक-आस्था का महापर्व है जिसमें प्रत्यक्ष देव भगवान भास्कर (सूर्य) तथा उनकी बहन षष्ठी देवी (छठी मईया) की आराधना की जाती है। यह पर्व कार्तिक मास के शुक्ल पक्ष की षष्ठी को श्रद्धाभाव से मनाया जाता है। यह महापर्व मुख्य रूप से बिहार, झारखण्ड, उत्तर प्रदेश, नेपाल के तराई क्षेत्रों सहित अब संपूर्ण विश्व में भारतीय समुदाय द्वारा धूमधाम से मनाया जाता है।
        </p>
        <p>
          छठ व्रत केवल एक धार्मिक अनुष्ठान नहीं बल्कि प्रकृति संरक्षण, जल-शुद्धता और स्वच्छता का अनुपम संदेश देने वाला महापर्व है। इसमें बिना किसी पुरोहित और बिना किसी भेदभाव के समाज के सभी वर्ग एक साथ घाटों पर एकत्रित होकर अस्ताचलगामी और उदीयमान भगवान सूर्य को नमन करते हैं।
        </p>

        <h2>लोकप्रिय छठ पूजा गीत संग्रह (Popular Chhath Geet Collection)</h2>
        <ul class="seo-song-list">
          <li><strong>उगी हे दीनानाथ</strong> — कल्पना पटवारी</li>
          <li><strong>केलवा के पात पर</strong> — शारदा सिन्हा</li>
          <li><strong>जल बीच खड़ा होई जोड़े जोड़े फलवा</strong> — पवन सिंह</li>
          <li><strong>उगा हो सुरुजदेव भेल भिनसरवा</strong> — अनुराधा पौडवाल</li>
          <li><strong>केरवा के पातवा पे नेवता</strong> — पवन सिंह</li>
          <li><strong>दिही दर्शन सुरुज गोसइया</strong> — देवी</li>
          <li><strong>काँच ही बाँस के बहंगिया</strong> — शारदा सिन्हा</li>
          <li><strong>कोशिया भराये लागल</strong> — नीलकमल सिंह व प्रियंका सिंह</li>
        </ul>

        <div class="seo-footer-credit">
          <p class="seo-note">
            ॥ जय छठी मईया • ॐ सूर्याय नमः ॥ — छठ घाट की ओर से सभी भक्तों को पावन छठ महापर्व की कोटि-कोटि शुभकामनाएं।
          </p>
        </div>
      `;
    }
  }

  /* Escape helper */
  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  /* Format seconds to M:SS */
  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  /* =========================================================
     7.1 DYNAMIC YOUTUBE IFRAME API LAZY LOADER
     ========================================================= */
  let isSwitchingTrack = false;
  let isYtScriptLoading = false;

  function ensureYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      if (!ytPlayer) {
        initYouTubePlayer();
      }
      return;
    }

    if (isYtScriptLoading) return;
    isYtScriptLoading = true;

    window.onYouTubeIframeAPIReady = function () {
      initYouTubePlayer();
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(tag, firstScript);
    } else {
      document.head.appendChild(tag);
    }
  }

  function initYouTubePlayer() {
    if (ytPlayer || !window.YT || !window.YT.Player) return;
    try {
      const initialVideoId = (songs[currentSong] && songs[currentSong].videoId) || "W34L_i63B0g";

      const playerVars = {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        disablekb: 1,
        fs: 0
      };

      ytPlayer = new YT.Player("ytBgPlayer", {
        height: "100%",
        width: "100%",
        videoId: initialVideoId,
        playerVars: playerVars,
        events: {
          onReady: onYTPlayerReady,
          onStateChange: onYTPlayerStateChange,
          onError: onYTPlayerError
        }
      });
    } catch (e) {
      console.warn("YouTube API init error:", e);
    }
  }

  function onYTPlayerReady(event) {
    isYtReady = true;
    try {
      event.target.mute();
      if (isPlaying && isOnlineMode) {
        event.target.playVideo();
      }
    } catch (e) { }

    // If playback was triggered in Online mode before ready event
    if (isPlaying && isOnlineMode) {
      const s = songs[currentSong];
      if (s && s.videoId) {
        try {
          const curSec = (offlineAudio && offlineAudio.currentTime) ? offlineAudio.currentTime : 0;
          event.target.loadVideoById({ videoId: s.videoId, startSeconds: curSec });
          event.target.mute();
          event.target.playVideo();
        } catch (e) {
          event.target.playVideo();
        }
      } else {
        event.target.playVideo();
      }
    }
  }

  function onYTPlayerStateChange(event) {
    if (!window.YT) return;

    if (event.data === YT.PlayerState.PLAYING) {
      isSwitchingTrack = false;
      if (isOnlineMode) {
        setPlaybackState(true);
        if (offlineAudio && !offlineAudio.paused) {
          offlineAudio.pause();
        }
      }
    } else if (event.data === YT.PlayerState.PAUSED) {
      if (isOnlineMode && !isSwitchingTrack) {
        setPlaybackState(false);
      }
    } else if (event.data === YT.PlayerState.ENDED) {
      if (isOnlineMode) {
        playNext();
      }
    } else if (event.data === YT.PlayerState.BUFFERING) {
      if (albumCover && isOnlineMode) albumCover.classList.add("spinning");
    }
  }

  function onYTPlayerError(e) {
    console.warn("YouTube player error, falling back to seamless audio:", e);
    if (isOnlineMode && offlineAudio) {
      const s = songs[currentSong];
      if (s && offlineAudio.src !== s.file) {
        offlineAudio.src = s.file;
      }
      const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
      offlineAudio.volume = volNum / 100;
      offlineAudio.play().catch(console.warn);
      setPlaybackState(true);
    }
  }

  /* =========================================================
     7.2 DUAL MODE (OFFLINE / ONLINE) SWITCHER
     ========================================================= */
  function setMode(online, showNotification = true) {
    isOnlineMode = Boolean(online);

    if (modeToggleBtn) {
      modeToggleBtn.setAttribute("data-mode", isOnlineMode ? "online" : "offline");
      modeToggleBtn.title = isOnlineMode
        ? "वर्तमान: ऑनलाइन वीडियो मोड (क्लिक करके ऑफ़लाइन मोड पर जाएं)"
        : "वर्तमान: ऑफ़लाइन ऑडियो मोड (क्लिक करके ऑनलाइन वीडियो चलाएं)";
    }

    if (modeText) {
      modeText.textContent = isOnlineMode ? "Online" : "Offline";
    }

    if (isOnlineMode) {
      // Dynamically load YouTube API on demand (Lazy Loading for faster FCP)
      ensureYouTubeAPI();

      // Switched to Online Mode: activate video background and sync video
      document.body.classList.add("live-video-active");
      if (bgVideoContainer) {
        bgVideoContainer.classList.add("active");
        bgVideoContainer.setAttribute("aria-hidden", "false");
      }
      if (isPlaying && isYtReady && ytPlayer && songs[currentSong]) {
        try {
          const curSec = (offlineAudio && offlineAudio.currentTime) ? offlineAudio.currentTime : 0;
          ytPlayer.loadVideoById({ videoId: songs[currentSong].videoId, startSeconds: curSec });
          ytPlayer.mute();
          ytPlayer.playVideo();
        } catch (e) { }
      }
      if (showNotification) {
        const msg = (i18n[currentLang] && i18n[currentLang].toastOnline) || "🌐 Online Video Mode Active";
        showToast(msg);
      }
    } else {
      // Switched to Offline Mode: deactivate video background and pause YouTube video
      document.body.classList.remove("live-video-active");
      if (bgVideoContainer) {
        bgVideoContainer.classList.remove("active");
        bgVideoContainer.setAttribute("aria-hidden", "true");
      }
      if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
        try {
          ytPlayer.pauseVideo();
        } catch (e) { }
      }
      if (showNotification) {
        const msg = (i18n[currentLang] && i18n[currentLang].toastOffline) || "📴 Offline Audio Mode Active";
        showToast(msg);
      }
    }

    renderPlaylist(playlistSearch ? playlistSearch.value : "");
  }

  const navHomeBtn = document.getElementById("navHomeBtn");
  if (navHomeBtn) {
    navHomeBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const navAboutBtn = document.getElementById("navAboutBtn");
  if (navAboutBtn) {
    navAboutBtn.addEventListener("click", () => {
      const footer = document.getElementById("appFooter") || document.querySelector(".app-footer") || document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    });
  }

  if (modeToggleBtn) {
    modeToggleBtn.addEventListener("click", () => {
      setMode(!isOnlineMode, true);
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "hi" : "en";
      setLanguage(nextLang, true);
    });
  }

  /* =========================================================
     7.3 PLAYBACK STATE MANAGEMENT
     ========================================================= */
  function setPlaybackState(playing) {
    isPlaying = playing;

    if (playing) {
      if (isOnlineMode) {
        document.body.classList.add("live-video-active");
        if (bgVideoContainer) {
          bgVideoContainer.classList.add("active");
          bgVideoContainer.setAttribute("aria-hidden", "false");
        }
      } else {
        document.body.classList.remove("live-video-active");
        if (bgVideoContainer) {
          bgVideoContainer.classList.remove("active");
          bgVideoContainer.setAttribute("aria-hidden", "true");
        }
      }

      if (playIcon) playIcon.textContent = "❚❚";
      if (albumCover) albumCover.classList.add("spinning");
      if (playerElem) playerElem.classList.add("playing");

      startProgressSync();
    } else {
      if (isOnlineMode) {
        document.body.classList.remove("live-video-active");
        if (bgVideoContainer) {
          bgVideoContainer.classList.remove("active");
          bgVideoContainer.setAttribute("aria-hidden", "true");
        }
      }

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
    if (isSeeking) return;

    let cur = 0;
    let dur = 0;

    if (offlineAudio && offlineAudio.duration && isFinite(offlineAudio.duration)) {
      cur = offlineAudio.currentTime || 0;
      dur = offlineAudio.duration || 0;
    } else if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getCurrentTime === "function") {
      try {
        cur = ytPlayer.getCurrentTime() || 0;
        dur = ytPlayer.getDuration() || 0;
      } catch (e) { }
    }

    if (dur > 0 && isFinite(dur)) {
      const pct = (cur / dur) * 100;
      if (progress) progress.value = pct;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (totalTime) totalTime.textContent = formatTime(dur);
    }
    if (currentTime) currentTime.textContent = formatTime(cur);
    updateMediaSessionPosition(cur, dur);
  }

  /* =========================================================
     7.4 SONG & PLAYLIST MANAGEMENT
     ========================================================= */
  async function loadOfflineSongs() {
    try {
      const response = await fetch("songs.json", { cache: "no-store" });
      if (!response.ok) throw new Error("songs.json fetch failed");
      songs = await response.json();

      if (!Array.isArray(songs) || songs.length === 0) {
        if (songName) songName.textContent = "No Song Found";
        return;
      }

      const t = i18n[currentLang] || i18n.en;
      if (playlistTitleText) {
        playlistTitleText.textContent = `${t.playlistTitle} (${songs.length})`;
      } else if (playlistTitle) {
        playlistTitle.textContent = `${t.playlistTitle} (${songs.length})`;
      }

      renderPlaylist();
      displaySongInfo(0);

      // Preload first song file in offline audio
      if (offlineAudio && songs[0] && songs[0].file) {
        offlineAudio.src = songs[0].file;
      }
    } catch (error) {
      console.error("Songs fetch failed:", error);
      if (songName) songName.textContent = currentLang === "en" ? "Failed to load songs" : "गीत लोड नहीं हो सके";
    }
  }

  function displaySongInfo(index) {
    if (!songs[index]) return;
    currentSong = index;
    const s = songs[index];
    const t = i18n[currentLang] || i18n.en;

    const title = currentLang === "en" ? (s.nameEn || s.name) : s.name;
    const singer = currentLang === "en" ? (s.singerEn || s.singer) : s.singer;

    if (songName) songName.textContent = title;
    if (songSinger) songSinger.textContent = `${t.singerPrefix}${singer || (currentLang === "en" ? "Devotional Song" : "भक्ति गीत")}`;
    if (currentTime) currentTime.textContent = "0:00";
    if (totalTime) totalTime.textContent = "0:00";
    if (progress) progress.value = 0;
    if (progressFill) progressFill.style.width = "0%";

    renderPlaylist(playlistSearch ? playlistSearch.value : "");
    updateMediaSessionMetadata();
  }

  function renderPlaylist(filterQuery = "") {
    if (!playlistList) return;
    const query = filterQuery.toLowerCase().trim();
    const t = i18n[currentLang] || i18n.en;

    const filtered = songs
      .map((s, idx) => ({ ...s, originalIndex: idx }))
      .filter((s) => {
        if (!query) return true;
        const name = currentLang === "en" ? (s.nameEn || s.name) : s.name;
        const singer = currentLang === "en" ? (s.singerEn || s.singer) : (s.singer || "");
        return (
          name.toLowerCase().includes(query) ||
          singer.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          (s.nameEn && s.nameEn.toLowerCase().includes(query)) ||
          (s.singer && s.singer.toLowerCase().includes(query)) ||
          (s.singerEn && s.singerEn.toLowerCase().includes(query))
        );
      });

    if (filtered.length === 0) {
      playlistList.innerHTML = `
        <li class="no-songs-found">
          <svg class="no-songs-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span class="no-songs-text">${escapeHTML(t.noSongsFound)}</span>
        </li>
      `;
      return;
    }

    playlistList.innerHTML = filtered
      .map((s) => {
        const idx = s.originalIndex;
        const isActive = idx === currentSong;
        const songTitle = currentLang === "en" ? (s.nameEn || s.name) : s.name;
        const songSingerName = currentLang === "en" ? (s.singerEn || s.singer) : (s.singer || (currentLang === "en" ? "Devotional Song" : "भक्ति गीत"));
        return `
          <li class="playlist-item ${isActive ? "active" : ""}" data-index="${idx}">
            <span class="playlist-item-num">${idx + 1}</span>
            <div class="playlist-item-details">
              <div class="playlist-item-name">${escapeHTML(songTitle)}</div>
              <div class="playlist-item-singer">${escapeHTML(songSingerName)}</div>
            </div>
            ${isActive && isPlaying
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

  function playSong(index) {
    if (!songs[index]) return;
    currentSong = index;
    displaySongInfo(index);

    if (isOnlineMode) {
      playOnlineSong(index);
    } else {
      playOfflineSong(index);
    }

    setPlaybackState(true);
    const s = songs[index];
    const t = i18n[currentLang] || i18n.en;
    const nowTitle = currentLang === "en" ? (s.nameEn || s.name) : s.name;
    showToast(`${t.nowPlayingPrefix || "🎶 Now Playing: "}${nowTitle}`);
  }

  function playOfflineSong(index) {
    const s = songs[index];
    if (!s) return;

    // Pause YouTube video if running
    if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
      try { ytPlayer.pauseVideo(); } catch (e) { }
    }
    document.body.classList.remove("live-video-active");
    if (bgVideoContainer) {
      bgVideoContainer.classList.remove("active");
      bgVideoContainer.setAttribute("aria-hidden", "true");
    }

    if (offlineAudio) {
      if (offlineAudio.src !== s.file) {
        offlineAudio.src = s.file;
      }
      const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
      const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;
      offlineAudio.volume = volNum / 100;
      offlineAudio.playbackRate = activeRate;
      offlineAudio.play().catch((err) => {
        console.warn("Audio play blocked/error:", err);
      });
    }
  }

  function playOnlineSong(index) {
    const s = songs[index];
    if (!s) return;

    document.body.classList.add("live-video-active");
    if (bgVideoContainer) {
      bgVideoContainer.classList.add("active");
      bgVideoContainer.setAttribute("aria-hidden", "false");
    }

    const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
    const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;

    // 1. Play crystal-clear audio directly via offlineAudio so audio ALWAYS plays reliably
    if (offlineAudio) {
      if (offlineAudio.src !== s.file) {
        offlineAudio.src = s.file;
      }
      offlineAudio.volume = volNum / 100;
      offlineAudio.playbackRate = activeRate;
      offlineAudio.play().catch((err) => {
        console.warn("Audio play blocked/error:", err);
      });
    }

    // 2. Play live YouTube background video in sync
    if (isYtReady && ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      try {
        if (s.videoId) {
          ytPlayer.loadVideoById({ videoId: s.videoId, startSeconds: 0 });
          ytPlayer.mute();
          ytPlayer.playVideo();
          if (typeof ytPlayer.setPlaybackRate === "function") {
            ytPlayer.setPlaybackRate(activeRate);
          }
        }
      } catch (e) {
        console.warn("YouTube video load error:", e);
      }
    } else {
      initYouTubePlayer();
    }
  }

  function togglePlayback() {
    if (isPlaying) {
      // Pause
      if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
        try { ytPlayer.pauseVideo(); } catch (e) { }
      }
      if (offlineAudio && !offlineAudio.paused) {
        offlineAudio.pause();
      }
      setPlaybackState(false);
      showToast("⏸️ गीत पॉज़ किया गया");
    } else {
      // Play
      if (isOnlineMode) {
        if (isYtReady && ytPlayer && typeof ytPlayer.playVideo === "function") {
          try {
            ytPlayer.playVideo();
          } catch (e) { }
        }
      }
      if (offlineAudio) {
        const s = songs[currentSong];
        if (s && offlineAudio.src !== s.file) {
          offlineAudio.src = s.file;
        }
        const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
        offlineAudio.volume = volNum / 100;
        offlineAudio.play().catch((err) => {
          console.warn("Audio play error:", err);
          playSong(currentSong);
        });
      }
      setPlaybackState(true);
      showToast("▶️ छठ गीत शुरू हुआ!");
    }
  }

  function playPrevious() {
    if (!songs.length) return;
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong(currentSong);
  }

  function playNext() {
    if (!songs.length) return;
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
  }

  /* Advance when audio track ends (in both modes) */
  if (offlineAudio) {
    offlineAudio.addEventListener("ended", () => {
      playNext();
    });
  }

  /* =========================================================
     7.5 EVENT LISTENERS & USER CONTROLS
     ========================================================= */
  if (playButton) {
    playButton.addEventListener("click", togglePlayback);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", playPrevious);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", playNext);
  }

  /* Seek interactions (Forward / Backward Scrubbing) */
  if (progress) {
    const handleSeekInput = () => {
      isSeeking = true;
      let dur = 0;
      if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getDuration === "function") {
        try {
          dur = ytPlayer.getDuration() || 0;
        } catch (e) { }
      }
      if (!dur && offlineAudio && offlineAudio.duration) {
        dur = offlineAudio.duration;
      }
      const pct = parseFloat(progress.value) || 0;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (currentTime && dur > 0) {
        currentTime.textContent = formatTime((pct / 100) * dur);
      }
    };

    const handleSeekChange = () => {
      let dur = 0;
      if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getDuration === "function") {
        try {
          dur = ytPlayer.getDuration() || 0;
        } catch (e) { }
      }
      if (!dur && offlineAudio && offlineAudio.duration) {
        dur = offlineAudio.duration;
      }
      const pct = parseFloat(progress.value) || 0;
      const targetSec = (pct / 100) * dur;

      if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.seekTo === "function") {
        try {
          ytPlayer.seekTo(targetSec, true);
        } catch (e) { }
      }
      if (offlineAudio && offlineAudio.duration) {
        offlineAudio.currentTime = targetSec;
      }

      isSeeking = false;
      updateLiveProgress();
    };

    progress.addEventListener("mousedown", () => { isSeeking = true; });
    progress.addEventListener("touchstart", () => { isSeeking = true; }, { passive: true });
    progress.addEventListener("input", handleSeekInput);
    progress.addEventListener("change", handleSeekChange);
  }

  /* Volume & Mute Controls */
  const VOL_HIGH_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
      <path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M13.5 9.5C14.3 10.3 14.8 11.1 14.8 12s-.5 1.7-1.3 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.5 7.5C17.9 8.9 18.7 10.4 18.7 12s-.8 3.1-2.2 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.5 5.5C21.5 7.5 22.6 9.7 22.6 12s-1.1 4.5-3.1 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  const VOL_MED_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
      <path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M13.5 9.5C14.3 10.3 14.8 11.1 14.8 12s-.5 1.7-1.3 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M16.5 7.5C17.9 8.9 18.7 10.4 18.7 12s-.8 3.1-2.2 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  const VOL_LOW_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
      <path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M13.5 9.5C14.3 10.3 14.8 11.1 14.8 12s-.5 1.7-1.3 2.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  const VOL_MUTE_ICON = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
      <path d="M10 5L5 9H2v6h3l5 4V5z" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
      <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `;

  function updateVolumeIcon(vol) {
    if (!muteBtn) return;
    if (vol === 0) {
      muteBtn.innerHTML = VOL_MUTE_ICON;
    } else if (vol <= 0.33) {
      muteBtn.innerHTML = VOL_LOW_ICON;
    } else if (vol <= 0.66) {
      muteBtn.innerHTML = VOL_MED_ICON;
    } else {
      muteBtn.innerHTML = VOL_HIGH_ICON;
    }
  }

  function updateVolumeTrack(volNum) {
    if (volumeSlider) {
      volumeSlider.style.setProperty('--vol-percent', `${volNum}%`);
    }
  }

  if (volumeSlider) {
    updateVolumeTrack(parseInt(volumeSlider.value, 10) || 100);

    volumeSlider.addEventListener("input", () => {
      const volNum = parseInt(volumeSlider.value, 10);
      const volFraction = volNum / 100;

      updateVolumeTrack(volNum);

      if (isYtReady && ytPlayer && typeof ytPlayer.setVolume === "function") {
        try {
          ytPlayer.setVolume(volNum);
          if (volNum > 0 && typeof ytPlayer.isMuted === "function" && ytPlayer.isMuted()) {
            ytPlayer.unMute();
          }
        } catch (e) { }
      }

      if (offlineAudio) {
        offlineAudio.volume = volFraction;
      }

      updateVolumeIcon(volFraction);
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      let isCurrentlyMuted = false;
      if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.isMuted === "function") {
        try {
          isCurrentlyMuted = ytPlayer.isMuted() || (typeof ytPlayer.getVolume === "function" && ytPlayer.getVolume() === 0);
        } catch (e) { }
      } else if (offlineAudio) {
        isCurrentlyMuted = offlineAudio.volume === 0;
      } else {
        isCurrentlyMuted = volumeSlider ? parseInt(volumeSlider.value, 10) === 0 : false;
      }

      if (isCurrentlyMuted) {
        // Unmute
        const targetVol = lastVolume > 0 ? Math.round(lastVolume * 100) : 100;
        if (isYtReady && ytPlayer) {
          try {
            if (typeof ytPlayer.unMute === "function") ytPlayer.unMute();
            if (typeof ytPlayer.setVolume === "function") ytPlayer.setVolume(targetVol);
          } catch (e) { }
        }
        if (offlineAudio) {
          offlineAudio.volume = targetVol / 100;
        }
        if (volumeSlider) volumeSlider.value = targetVol;
        updateVolumeTrack(targetVol);
        updateVolumeIcon(targetVol / 100);
        showToast((i18n[currentLang] && i18n[currentLang].toastUnmuted) || "🔊 Volume Unmuted");
      } else {
        // Mute
        const currentVol = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
        if (currentVol > 0) {
          lastVolume = currentVol / 100;
        }
        if (isYtReady && ytPlayer) {
          try {
            if (typeof ytPlayer.mute === "function") ytPlayer.mute();
            if (typeof ytPlayer.setVolume === "function") ytPlayer.setVolume(0);
          } catch (e) { }
        }
        if (offlineAudio) {
          offlineAudio.volume = 0;
        }
        if (volumeSlider) volumeSlider.value = 0;
        updateVolumeTrack(0);
        updateVolumeIcon(0);
        showToast((i18n[currentLang] && i18n[currentLang].toastMuted) || "🔇 Volume Muted");
      }
    });
  }

  /* Playback Speed Controller Function */
  function setPlaybackRate(speedObj) {
    const rateItem = (typeof speedObj === "object" && speedObj !== null)
      ? speedObj
      : (PLAYBACK_SPEEDS.find((s) => s.value === parseFloat(speedObj)) || { value: parseFloat(speedObj) || 1.0, label: `${speedObj}x` });

    const r = parseFloat(rateItem.value) || 1.0;
    const label = rateItem.label || `${r}x`;

    if (offlineAudio) {
      offlineAudio.playbackRate = r;
    }
    if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.setPlaybackRate === "function") {
      try {
        ytPlayer.setPlaybackRate(r);
      } catch (e) { }
    }

    if (speedLabel) {
      speedLabel.textContent = label;
    }
    if (speedBtn) {
      if (r !== 1.0) {
        speedBtn.classList.add("custom-speed");
      } else {
        speedBtn.classList.remove("custom-speed");
      }
    }

    const t = i18n[currentLang] || i18n.hi;
    const speedMsg = (t.toastSpeed || "⚡ प्लेबैक गति: ") + label;
    showToast(speedMsg);
  }

  function cyclePlaybackSpeed() {
    currentSpeedIndex = (currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
    const nextSpeed = PLAYBACK_SPEEDS[currentSpeedIndex];
    setPlaybackRate(nextSpeed);
  }

  if (speedBtn) {
    speedBtn.addEventListener("click", cyclePlaybackSpeed);
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

  function scrollActivePlaylistItemIntoView() {
    if (!playlistList) return;
    const activeItem = playlistList.querySelector(".playlist-item.active");
    if (activeItem) {
      activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  if (playlistToggleBtn && playlistModal) {
    playlistToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = playlistModal.classList.toggle("open");
      if (isOpen) {
        scrollActivePlaylistItemIntoView();
        if (playlistSearch) {
          setTimeout(() => playlistSearch.focus(), 150);
        }
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
      const songTitle = currentLang === "en" ? (s.nameEn || s.name) : s.name;
      const songSingerName = currentLang === "en" ? (s.singerEn || s.singer) : s.singer;
      const art192 = new URL("favicon.io/android-chrome-192x192.png", window.location.href).href;
      const art512 = new URL("favicon.io/android-chrome-512x512.png", window.location.href).href;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songTitle,
        artist: songSingerName || (currentLang === "en" ? "Chhath Mahaparv" : "छठ महापर्व"),
        album: currentLang === "en" ? "Chhath Ghat" : "छठ घाट",
        artwork: [
          { src: art192, sizes: "192x192", type: "image/png" },
          { src: art512, sizes: "512x512", type: "image/png" }
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
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime && isFinite(details.seekTime)) {
          if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.seekTo === "function") {
            ytPlayer.seekTo(details.seekTime, true);
          } else if (offlineAudio) {
            offlineAudio.currentTime = details.seekTime;
          }
        }
      });
    } catch (e) { }
  }

  /* =========================================================
     8.5 KEYBOARD SHORTCUTS & ACCESSIBILITY CONTROLS
     ========================================================= */
  function seekRelative(deltaSeconds) {
    let dur = 0;
    let cur = 0;

    if (offlineAudio && offlineAudio.duration && isFinite(offlineAudio.duration)) {
      dur = offlineAudio.duration;
      cur = offlineAudio.currentTime || 0;
    } else if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getDuration === "function") {
      try {
        dur = ytPlayer.getDuration() || 0;
        cur = ytPlayer.getCurrentTime() || 0;
      } catch (e) { }
    }

    const target = Math.max(0, Math.min(dur || 9999, cur + deltaSeconds));

    if (offlineAudio) {
      offlineAudio.currentTime = target;
    }
    if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.seekTo === "function") {
      try {
        ytPlayer.seekTo(target, true);
      } catch (e) { }
    }

    updateLiveProgress();

    const sign = deltaSeconds > 0 ? `⏩ +${deltaSeconds}s` : `⏪ ${deltaSeconds}s`;
    showToast(`${sign} (${formatTime(target)})`);
  }

  window.addEventListener("keydown", (e) => {
    // Ignore keyboard shortcuts if the user is typing in an input field or textarea
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
    if (activeTag === "input" || activeTag === "textarea" || (document.activeElement && document.activeElement.isContentEditable)) {
      if (e.key === "Escape" && playlistModal && playlistModal.classList.contains("open")) {
        playlistModal.classList.remove("open");
        if (playlistSearch) playlistSearch.blur();
      }
      return;
    }

    // Spacebar or 'k'/'K' -> Toggle Play / Pause
    if (e.code === "Space" || e.key === " " || e.key === "k" || e.key === "K") {
      e.preventDefault();
      togglePlayback();
      return;
    }

    // 'm' or 'M' -> Toggle Mute / Unmute
    if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      if (muteBtn) {
        muteBtn.click();
      }
      return;
    }

    // Arrow Right -> Seek Forward +5s
    if (e.key === "ArrowRight") {
      e.preventDefault();
      seekRelative(5);
      return;
    }

    // Arrow Left -> Seek Backward -5s
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekRelative(-5);
      return;
    }

    // Arrow Up -> Volume Up +5%
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (volumeSlider) {
        const curVol = parseInt(volumeSlider.value, 10) || 0;
        const newVol = Math.min(100, curVol + 5);
        volumeSlider.value = newVol;
        volumeSlider.dispatchEvent(new Event("input"));
        showToast(`🔊 ${newVol}%`);
      }
      return;
    }

    // Arrow Down -> Volume Down -5%
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (volumeSlider) {
        const curVol = parseInt(volumeSlider.value, 10) || 0;
        const newVol = Math.max(0, curVol - 5);
        volumeSlider.value = newVol;
        volumeSlider.dispatchEvent(new Event("input"));
        showToast(newVol === 0 ? "🔇 Muted" : `🔉 ${newVol}%`);
      }
      return;
    }

    // Shift + '>' (Period) -> Increase/Cycle Speed
    if ((e.shiftKey && e.key === ">") || (e.shiftKey && e.key === ".")) {
      e.preventDefault();
      cyclePlaybackSpeed();
      return;
    }

    // Shift + '<' (Comma) -> Decrease Speed
    if ((e.shiftKey && e.key === "<") || (e.shiftKey && e.key === ",")) {
      e.preventDefault();
      currentSpeedIndex = (currentSpeedIndex - 1 + PLAYBACK_SPEEDS.length) % PLAYBACK_SPEEDS.length;
      setPlaybackRate(PLAYBACK_SPEEDS[currentSpeedIndex]);
      return;
    }

    // Escape -> Close Playlist Modal
    if (e.key === "Escape") {
      if (playlistModal && playlistModal.classList.contains("open")) {
        e.preventDefault();
        playlistModal.classList.remove("open");
      }
    }
  });

  /* =========================================================
     9. STARTUP INITIALIZATION
     ========================================================= */
  if (volumeSlider) volumeSlider.value = 100;
  updateVolumeIcon(1);
  setLanguage("en", false);
  loadOfflineSongs();
})();