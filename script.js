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
      langBtnTitle: "भाषा: हिंदी (अंग्रेज़ी में बदलने के लिए क्लिक करें)",
      langBtnAria: "अंग्रेज़ी भाषा में बदलें",
      timeWidgetTitle: "भारतीय मानक समय (IST)",
      navHomeText: "होम",
      navHomeTitle: "होम",
      navHomeAria: "होम पर जाएं",
      navAboutText: "परिचय",
      navAboutTitle: "छठ महापर्व के बारे में",
      navAboutAria: "छठ महापर्व के बारे में",
      modeOfflineText: "ऑफलाइन",
      modeOfflineTitle: "ऑफलाइन मोड (ऑनलाइन वीडियो मोड चालू करने के लिए क्लिक करें)",
      modeOfflineAria: "ऑनलाइन वीडियो मोड पर जाएं",
      modeOnlineText: "ऑनलाइन",
      modeOnlineTitle: "ऑनलाइन मोड (ऑफलाइन ऑडियो मोड पर जाने के लिए क्लिक करें)",
      modeOnlineAria: "ऑफलाइन ऑडियो मोड पर जाएं",
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
      loadingSong: "Loading Chhath Geet...",
      playlistTitleOffline: "छठ गीत संग्रह (ऑफलाइन)",
      playlistTitleOnline: "छठ वीडियो संग्रह (ऑनलाइन)",
      playlistTitle: "छठ गीत संग्रह",
      playlistSubtitle: "पसंदीदा गीत चुनें और सुनें",
      playlistSearchPlaceholder: "गीत या गायक का नाम खोजें...",
      playlistSearchPlaceholderOffline: "गीत या गायक का नाम खोजें...",
      playlistSearchPlaceholderOnline: "वीडियो या गायक का नाम खोजें...",
      noSongsFound: "कोई गीत नहीं मिला",
      prevSongTitle: "पिछला गीत",
      playBtnTitle: "चलाएं / रोकें",
      nextSongTitle: "अगला गीत",
      playlistBtnTitle: "गीत सूची (Playlist)",
      playlistCloseTitle: "गीत सूची बंद करें",
      muteBtnTitle: "ध्वनि म्यूट / अनम्यूट",
      speedBtnTitle: "प्लेबैक स्पीड बदलें (Playback Speed)",
      speedMenuHeader: "स्पीड चुनें",
      speedMenuSlow: "धीमा",
      speedMenuSlowLight: "हल्का धीमा",
      speedMenuNormal: "सामान्य",
      speedMenuFastLight: "हल्का तेज़",
      speedMenuFast: "तेज़",
      speedMenuFastMore: "काफ़ी तेज़",
      volumeSliderTitle: "वॉल्यूम कम या ज्यादा करें",
      seekSliderTitle: "गीत को आगे या पीछे करें",
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
      shareBtnTitle: "छठ घाट शेयर करें",
      shareBtnAria: "शेयर विकल्प",
      whatsappLabel: "व्हाट्सएप",
      whatsappTitle: "व्हाट्सएप पर शेयर करें",
      whatsappAria: "व्हाट्सएप पर शेयर करें",
      facebookLabel: "फेसबुक",
      facebookTitle: "फेसबुक पर शेयर करें",
      facebookAria: "फेसबुक पर शेयर करें",
      instagramLabel: "इंस्टाग्राम",
      instagramTitle: "इंस्टाग्राम पर शेयर करें",
      instagramAria: "इंस्टाग्राम पर शेयर करें",
      copyMantraBtnText: "कॉपी",
      copyMantraTitle: "सूर्य गायत्री मंत्र कॉपी करें",
      shareMantraBtnText: "व्हाट्सएप पर शेयर करें",
      shareMantraTitle: "सूर्य गायत्री मंत्र व्हाट्सएप पर शेयर करें",
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
      langBtnTitle: "Language: English (Click to switch to Hindi)",
      langBtnAria: "Switch language to Hindi",
      timeWidgetTitle: "Indian Standard Time (IST)",
      navHomeText: "Home",
      navHomeTitle: "Home",
      navHomeAria: "Go to Home",
      navAboutText: "About",
      navAboutTitle: "About Chhath Mahaparv",
      navAboutAria: "About Chhath Mahaparv",
      modeOfflineText: "Offline",
      modeOfflineTitle: "Offline Mode (Click to switch to Online Video Mode)",
      modeOfflineAria: "Switch to Online Video Mode",
      modeOnlineText: "Online",
      modeOnlineTitle: "Online Mode (Click to switch to Offline Audio Mode)",
      modeOnlineAria: "Switch to Offline Audio Mode",
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
      loadingSong: "Loading Chhath Songs...",
      playlistTitleOffline: "Offline Chhath Songs",
      playlistTitleOnline: "Online Live Videos",
      playlistTitle: "Chhath Songs Collection",
      playlistSubtitle: "Select & listen to devotional songs",
      playlistSearchPlaceholder: "Search song or singer name...",
      playlistSearchPlaceholderOffline: "Search song or singer name...",
      playlistSearchPlaceholderOnline: "Search video or singer name...",
      noSongsFound: "No songs found",
      prevSongTitle: "Previous Track",
      playBtnTitle: "Play / Pause",
      nextSongTitle: "Next Track",
      playlistBtnTitle: "Playlist",
      playlistCloseTitle: "Close Playlist",
      muteBtnTitle: "Mute / Unmute Volume",
      speedBtnTitle: "Change Playback Speed",
      speedMenuHeader: "Select Speed",
      speedMenuSlow: "Very Slow",
      speedMenuSlowLight: "Slow",
      speedMenuNormal: "Normal",
      speedMenuFastLight: "Slightly Fast",
      speedMenuFast: "Fast",
      speedMenuFastMore: "Faster",
      volumeSliderTitle: "Adjust Volume",
      seekSliderTitle: "Seek Track",
      ritualsBadge: "Sacred Tradition",
      ritualsHeading: "Chhath Mahaparv : 4-Day Sacred Rituals",
      ritualsSubtitle: "The sacred celebration of cosmic solar energy, faith, and nature worship",
      ritual1DayBadge: "Day 1",
      ritual1Title: "Nahay-Khay",
      ritual1Desc: "The festival begins with a holy bath and pure satvik meal. Devotees take a sacred bath in holy water bodies and consume pumpkin-rice and chana dal prasad.",
      ritual1Highlight: "Special Prasad: Bottle Gourd Rice & Chana Dal",
      ritual2DayBadge: "Day 2",
      ritual2Title: "Kharna",
      ritual2Desc: "Devotees observe a strict day-long fast without water, and in the evening offer jaggery kheer made with cow milk and roti to Chhathi Maiya before breaking the fast.",
      ritual2Highlight: "Special Prasad: Jaggery Rice Kheer & Roti",
      ritual3DayBadge: "Day 3",
      ritual3Title: "Sandhya Arghya",
      ritual3Desc: "On the evening of Kartik Shukla Shashthi, devotees gather at river ghats with bamboo baskets filled with thekua and fruits, standing in water to offer Arghya to the setting Sun.",
      ritual3Highlight: "Special Offering: Arghya to the Setting Sun",
      ritual4DayBadge: "Day 4",
      ritual4Title: "Usha Arghya",
      ritual4Desc: "At dawn on Saptami, devotees offer the final Arghya to the rising Sun, concluding the 36-hour fast with prayers for peace, prosperity and family longevity.",
      ritual4Highlight: "Special Offering: Arghya to Rising Sun & Paran",
      mantraTitle: "॥ Shri Surya Gayatri Mantra ॥",
      shareBtnLabel: "Share",
      shareBtnTitle: "Share Chhath Ghat",
      shareBtnAria: "Share options",
      whatsappLabel: "WhatsApp",
      whatsappTitle: "Share on WhatsApp",
      whatsappAria: "Share on WhatsApp",
      facebookLabel: "Facebook",
      facebookTitle: "Share on Facebook",
      facebookAria: "Share on Facebook",
      instagramLabel: "Instagram",
      instagramTitle: "Share on Instagram",
      instagramAria: "Share on Instagram",
      copyMantraBtnText: "Copy",
      copyMantraTitle: "Copy Surya Gayatri Mantra",
      shareMantraBtnText: "Share on WhatsApp",
      shareMantraTitle: "Share Surya Gayatri Mantra on WhatsApp",
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
        `Om Adityaaya Vidmahe Divakaraya Dhimahi\nTannah Suryaah Prachodayat\n\n` +
        `"Om, let me meditate on the Sun God, the maker of the day. Give me higher intellect, and let the Sun God illuminate my mind."\n\n` +
        `Listen to devotional Chhath songs on Chhath Ghat: ${SHARE_URL}`
        : `☀️ *श्री सूर्य गायत्री मंत्र:*\n` +
        `ॐ आदित्याय विद्महे दिवाकराय धीमहि।\nतन्नः सूर्यः प्रचोदयात् ॥\n\n` +
        `"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।"` +
        `\n\nछठ घाट पर सुनें भक्तिमय छठ गीत: ${SHARE_URL}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mantraMsg)}`, "_blank");
    });
  }

  const copyMantraBtn = document.getElementById("copyMantraBtn");
  if (copyMantraBtn) {
    copyMantraBtn.addEventListener("click", async () => {
      const mantra = currentLang === "en"
        ? "Om Adityaaya Vidmahe Divakaraya Dhimahi Tannah Suryaah Prachodayat - \"Om, let me meditate on the Sun God, the maker of the day. Give me higher intellect, and let the Sun God illuminate my mind.\""
        : "ॐ आदित्याय विद्महे दिवाकराय धीमहि तन्नः सूर्यः प्रचोदयात् ॥ - \"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।\"";
      try {
        await navigator.clipboard.writeText(mantra);
        const originalText = copyMantraBtnText ? copyMantraBtnText.textContent : "Copy";
        if (copyMantraBtnText) copyMantraBtnText.textContent = currentLang === "en" ? "✓ Copied!" : "✓ कॉपी हुआ!";
        copyMantraBtn.style.background = "linear-gradient(135deg, #107C41 0%, #0B6A35 100%)";
        copyMantraBtn.style.borderColor = "#2ae772";
        showToast(currentLang === "en" ? "📋 Surya Gayatri Mantra copied!" : "📋 सूर्य गायत्री मंत्र भावार्थ सहित कॉपी हो गया!");
        setTimeout(() => {
          if (copyMantraBtnText) copyMantraBtnText.textContent = originalText;
          copyMantraBtn.style.background = "";
          copyMantraBtn.style.borderColor = "";
        }, 2200);
      } catch (err) {
        showToast((currentLang === "en" ? "📋 Copied: " : "📋 कॉपी हुआ: ") + mantra);
      }
    });
  }

  /* =========================================================
     5. FESTIVE FLOATING PARTICLES & GLOWING EMBERS CANVAS
     ========================================================= */
  const canvas = document.getElementById("festiveCanvas");
  let ctx = canvas ? canvas.getContext("2d") : null;
  let particles = [];
  let sparks = [];
  let embers = [];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Petal {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
      this.y = initial ? Math.random() * (canvas ? canvas.height : window.innerHeight) : -25;
      this.size = Math.random() * 6.5 + 4;
      this.speedY = Math.random() * 0.75 + 0.35;
      this.speedX = Math.sin(Math.random() * 4) * 0.6;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 1.6;
      this.opacity = Math.random() * 0.45 + 0.35;
      this.color = Math.random() > 0.35 ? "#ffb84d" : "#ff7043";
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.5;
      this.angle += this.spin;
      if (canvas && this.y > canvas.height + 25) {
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

  class GlowEmber {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
      this.y = initial ? Math.random() * (canvas ? canvas.height : window.innerHeight) : (canvas ? canvas.height + 15 : window.innerHeight + 15);
      this.size = Math.random() * 2.5 + 1.2;
      this.speedY = -(Math.random() * 0.5 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.pulse = Math.random() * Math.PI;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.3;
      this.pulse += 0.04;
      if (canvas && this.y < -20) {
        this.reset();
      }
    }
    draw() {
      if (!ctx) return;
      const alpha = Math.max(0, this.opacity * (0.6 + 0.4 * Math.sin(this.pulse)));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#ffe082";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ffb300";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Spark {
    constructor(x, y) {
      this.x = x || (canvas ? canvas.width / 2 : window.innerWidth / 2);
      this.y = y || (canvas ? canvas.height / 2 : window.innerHeight / 2);
      this.vx = (Math.random() - 0.5) * 4.5;
      this.vy = (Math.random() - 0.5) * 4.5 - 1.5;
      this.size = Math.random() * 3.5 + 1.5;
      this.life = 1;
      this.decay = Math.random() * 0.025 + 0.015;
      this.color = Math.random() > 0.3 ? "#ffe082" : "#ff9100";
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.life -= this.decay;
    }
    draw() {
      if (!ctx || this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#ffa000";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  if (canvas) {
    for (let i = 0; i < 24; i++) {
      particles.push(new Petal());
    }
    for (let i = 0; i < 20; i++) {
      embers.push(new GlowEmber());
    }

    // Interactive pointer trails
    window.addEventListener("pointermove", (e) => {
      if (Math.random() > 0.55 && sparks.length < 40) {
        sparks.push(new Spark(e.clientX, e.clientY));
      }
    }, { passive: true });
  }

  function spawnFestiveSparks(count) {
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4;
    for (let i = 0; i < count; i++) {
      sparks.push(new Spark(centerX + (Math.random() - 0.5) * 100, centerY + (Math.random() - 0.5) * 50));
    }
  }

  function animateParticles() {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((emb) => {
        emb.update();
        emb.draw();
      });
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
  let seekDebounceTimeout = null;

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

  let currentSpeedIndex = 2; // Default: 1.0x
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

  function updateModeButtonUI() {
    const t = i18n[currentLang] || i18n.en;
    if (modeToggleBtn) {
      modeToggleBtn.setAttribute("data-mode", isOnlineMode ? "online" : "offline");
      modeToggleBtn.title = isOnlineMode ? t.modeOnlineTitle : t.modeOfflineTitle;
      modeToggleBtn.setAttribute("aria-label", isOnlineMode ? t.modeOnlineAria : t.modeOfflineAria);
    }
    if (modeText) {
      modeText.textContent = isOnlineMode ? t.modeOnlineText : t.modeOfflineText;
    }
  }

  /* Function to switch language between Hindi and English */
  function setLanguage(lang, showToastMsg = false) {
    if (!i18n[lang]) return;
    currentLang = lang;
    const t = i18n[lang];

    document.documentElement.lang = currentLang;

    // 1. Language Toggle Button
    if (langToggleBtn) {
      langToggleBtn.setAttribute("data-lang", lang);
      langToggleBtn.title = t.langBtnTitle;
      langToggleBtn.setAttribute("aria-label", t.langBtnAria);
    }
    if (langText) langText.textContent = t.langBtnText;

    // 2. Offline / Online Mode Toggle Button
    updateModeButtonUI();

    // 3. Navigation Buttons (Home & About)
    const navHomeBtn = document.getElementById("navHomeBtn");
    const navHomeText = document.getElementById("navHomeText");
    if (navHomeBtn) {
      navHomeBtn.title = t.navHomeTitle;
      navHomeBtn.setAttribute("aria-label", t.navHomeAria);
    }
    if (navHomeText) navHomeText.textContent = t.navHomeText;

    const navAboutBtn = document.getElementById("navAboutBtn");
    const navAboutText = document.getElementById("navAboutText");
    if (navAboutBtn) {
      navAboutBtn.title = t.navAboutTitle;
      navAboutBtn.setAttribute("aria-label", t.navAboutAria);
    }
    if (navAboutText) navAboutText.textContent = t.navAboutText;

    // 4. Main Share Button
    const shareMainBtn = document.getElementById("shareMainBtn");
    const shareBtnLabel = document.getElementById("shareBtnLabel");
    if (shareMainBtn) {
      shareMainBtn.title = t.shareBtnTitle;
      shareMainBtn.setAttribute("aria-label", t.shareBtnAria);
    }
    if (shareBtnLabel) shareBtnLabel.textContent = t.shareBtnLabel;

    // 5. Social Share Menu Buttons (WhatsApp, Facebook, Instagram)
    const waShareBtn = document.getElementById("whatsappShareBtn");
    const fbShareBtn = document.getElementById("facebookShareBtn");
    const instaShareBtn = document.getElementById("instagramShareBtn");
    const whatsappShareText = document.getElementById("whatsappShareText");
    const facebookShareText = document.getElementById("facebookShareText");
    const instagramShareText = document.getElementById("instagramShareText");

    if (waShareBtn) {
      waShareBtn.title = t.whatsappTitle;
      waShareBtn.setAttribute("aria-label", t.whatsappAria);
    }
    if (whatsappShareText) whatsappShareText.textContent = t.whatsappLabel;

    if (fbShareBtn) {
      fbShareBtn.title = t.facebookTitle;
      fbShareBtn.setAttribute("aria-label", t.facebookAria);
    }
    if (facebookShareText) facebookShareText.textContent = t.facebookLabel;

    if (instaShareBtn) {
      instaShareBtn.title = t.instagramTitle;
      instaShareBtn.setAttribute("aria-label", t.instagramAria);
    }
    if (instagramShareText) instagramShareText.textContent = t.instagramLabel;

    // 6. Time Widget Tooltip
    if (timeWidget) {
      timeWidget.title = t.timeWidgetTitle;
    }

    // 7. Audio Player Controls & Seekbar Tooltips
    if (prevBtn) prevBtn.title = t.prevSongTitle;
    if (playButton) playButton.title = t.playBtnTitle;
    if (nextBtn) nextBtn.title = t.nextSongTitle;
    if (playlistToggleBtn) playlistToggleBtn.title = t.playlistBtnTitle;
    if (muteBtn) muteBtn.title = t.muteBtnTitle;
    if (speedBtn) speedBtn.title = t.speedBtnTitle;
    if (playlistCloseBtn) playlistCloseBtn.title = t.playlistCloseTitle;
    if (volumeSlider) volumeSlider.title = t.volumeSliderTitle;
    if (progress) progress.title = t.seekSliderTitle;

    // 8. Headlines, Mantras, Rituals
    if (mainLogoText) mainLogoText.textContent = t.mainLogoText;
    if (taglineText) taglineText.textContent = t.taglineText;

    updatePlaylistHeaderUI();

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
          Om Adityaaya Vidmahe Divakaraya Dhimahi <br>
          Tannah Suryaah Prachodayat
          <span class="mantra-translation">"Om, let me meditate on the Sun God, the maker of the day. Give me higher intellect, and let the Sun God illuminate my mind."</span>
        `;
      } else {
        mantraText.innerHTML = `
          ॐ आदित्याय विद्महे दिवाकराय धीमहि <br>
          तन्नः सूर्यः प्रचोदयात् ॥
          <span class="mantra-translation">"हम समस्त संसार को प्रकाशित करने वाले परम तेजस्वी भगवान सूर्य देव का ध्यान करते हैं। वे भुवन भास्कर हमारी बुद्धि को ज्ञान और सन्मार्ग की ओर प्रेरित करें।"</span>
        `;
      }
    }

    if (copyMantraBtn) copyMantraBtn.title = t.copyMantraTitle;
    if (copyMantraBtnText) copyMantraBtnText.textContent = t.copyMantraBtnText;
    if (shareMantraBtn) shareMantraBtn.title = t.shareMantraTitle;
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
        mute: 0,
        controls: 0,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        disablekb: 1,
        fs: 0,
        cc_load_policy: 0,
        cc_lang_pref: "none",
        vq: "hd1080"
      };

      ytPlayer = new YT.Player("ytBgPlayer", {
        height: "100%",
        width: "100%",
        videoId: initialVideoId,
        playerVars: playerVars,
        events: {
          onReady: onYTPlayerReady,
          onStateChange: onYTPlayerStateChange,
          onPlaybackQualityChange: onYTPlaybackQualityChange,
          onError: onYTPlayerError
        }
      });
    } catch (e) {
      console.warn("YouTube API init error:", e);
    }
  }

  function onYTPlaybackQualityChange(event) {
    const actualQuality = event.data;
    console.log("YouTube actual playback quality updated to:", actualQuality);
  }

  function disableCaptions(player) {
    if (!player) return;
    try {
      if (typeof player.unloadModule === "function") {
        player.unloadModule("captions");
        player.unloadModule("cc");
      }
      if (typeof player.setOption === "function") {
        player.setOption("captions", "track", {});
        player.setOption("cc", "track", {});
        player.setOption("captions", "fontSize", 0);
      }
    } catch (e) { }
  }

  function onYTPlayerReady(event) {
    isYtReady = true;
    disableCaptions(event.target);
    const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
    try {
      if (typeof event.target.setPlaybackQuality === "function") {
        event.target.setPlaybackQuality("hd1080");
      }
      if (typeof event.target.setPlaybackQualityRange === "function") {
        event.target.setPlaybackQualityRange("hd1080", "highres");
      }
    } catch (e) { }

    try {
      if (isOnlineMode) {
        event.target.unMute();
        event.target.setVolume(volNum);
        if (isPlaying) {
          event.target.playVideo();
        }
      } else {
        event.target.mute();
        event.target.pauseVideo();
      }
    } catch (e) { }

    // If playback was triggered in Online mode before ready event
    if (isPlaying && isOnlineMode) {
      const s = songs[currentSong];
      if (s && s.videoId) {
        try {
          event.target.loadVideoById({
            videoId: s.videoId,
            startSeconds: 0,
            suggestedQuality: "hd1080"
          });
          event.target.unMute();
          event.target.setVolume(volNum);
          if (typeof event.target.setPlaybackQuality === "function") {
            event.target.setPlaybackQuality("hd1080");
          }
          disableCaptions(event.target);
          event.target.playVideo();
        } catch (e) {
          event.target.playVideo();
        }
      } else {
        event.target.playVideo();
      }
    }
  }

  function setBufferingState(isBuffering) {
    // Clean seamless playback without spinner animations
  }

  function onYTPlayerStateChange(event) {
    if (!window.YT) return;

    if (event.data === YT.PlayerState.PLAYING) {
      isSwitchingTrack = false;
      disableCaptions(event.target);
      try {
        if (typeof event.target.setPlaybackQuality === "function") {
          event.target.setPlaybackQuality("hd1080");
        }
      } catch (e) { }
      setBufferingState(false);
      document.body.classList.remove("video-paused", "video-buffering");
      if (isOnlineMode) {
        setPlaybackState(true);
        displaySongInfo(currentSong);
      }
    } else if (event.data === YT.PlayerState.PAUSED) {
      setBufferingState(false);
      if (isOnlineMode) {
        document.body.classList.add("video-paused");
        if (!isSwitchingTrack) {
          setPlaybackState(false);
        }
      }
    } else if (event.data === YT.PlayerState.ENDED) {
      setBufferingState(false);
      if (isOnlineMode) {
        playNext();
      }
    } else if (event.data === YT.PlayerState.BUFFERING) {
      if (isOnlineMode) {
        setBufferingState(true);
        document.body.classList.add("video-buffering");
      }
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

    updateModeButtonUI();

    if (isOnlineMode) {
      // Dynamically load YouTube API on demand (Lazy Loading for faster FCP)
      ensureYouTubeAPI();

      // Switched to Online Mode: activate video background
      document.body.classList.add("live-video-active");
      if (bgVideoContainer) {
        bgVideoContainer.classList.add("active");
        bgVideoContainer.setAttribute("aria-hidden", "false");
      }

      // Pick a random song when switching to Online Mode
      if (songs && songs.length > 0) {
        const validIndices = [];
        songs.forEach((s, idx) => {
          if (s && (s.videoId || s.embedUrl)) validIndices.push(idx);
        });
        const pool = validIndices.length > 0 ? validIndices : songs.map((_, i) => i);
        if (pool.length > 1) {
          const otherChoices = pool.filter(idx => idx !== currentSong);
          const choices = otherChoices.length > 0 ? otherChoices : pool;
          currentSong = choices[Math.floor(Math.random() * choices.length)];
        } else {
          currentSong = pool[0];
        }
      }

      // Automatically start playback of the selected song
      playSong(currentSong);

      if (showNotification) {
        const msg = (i18n[currentLang] && i18n[currentLang].toastOnline) || "🌐 Online Video Mode Active";
        showToast(msg);
      }
    } else {
      // Switched to Offline Mode: deactivate video background and completely stop YouTube video
      document.body.classList.remove("live-video-active", "video-paused", "video-buffering");
      if (bgVideoContainer) {
        bgVideoContainer.classList.remove("active");
        bgVideoContainer.setAttribute("aria-hidden", "true");
      }
      if (isYtReady && ytPlayer) {
        try {
          if (typeof ytPlayer.pauseVideo === "function") ytPlayer.pauseVideo();
          if (typeof ytPlayer.stopVideo === "function") ytPlayer.stopVideo();
        } catch (e) { }
      }

      // Automatically start offline audio playback immediately
      playSong(currentSong);

      if (showNotification) {
        const msg = (i18n[currentLang] && i18n[currentLang].toastOffline) || "📴 Offline Audio Mode Active";
        showToast(msg);
      }
    }

    displaySongInfo(currentSong);
    updatePlaylistHeaderUI();
    renderPlaylist(playlistSearch ? playlistSearch.value : "");
  }

  function updatePlaylistHeaderUI() {
    const t = i18n[currentLang] || i18n.hi;
    const titleText = isOnlineMode
      ? (t.playlistTitleOnline || "छठ वीडियो संग्रह (ऑनलाइन)")
      : (t.playlistTitleOffline || "छठ गीत संग्रह (ऑफलाइन)");
    const placeholderText = isOnlineMode
      ? (t.playlistSearchPlaceholderOnline || "वीडियो या गायक का नाम खोजें...")
      : (t.playlistSearchPlaceholderOffline || "गीत या गायक का नाम खोजें...");

    const playlistTitleText = document.getElementById("playlistTitleText");
    if (playlistTitleText) {
      playlistTitleText.textContent = `${titleText} (${songs.length || 8})`;
    } else if (playlistTitle) {
      playlistTitle.textContent = `${titleText} (${songs.length || 8})`;
    }
    if (playlistSearch) {
      playlistSearch.placeholder = placeholderText;
    }
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

    if (isOnlineMode) {
      document.body.classList.add("live-video-active");
      if (bgVideoContainer) {
        bgVideoContainer.classList.add("active");
        bgVideoContainer.setAttribute("aria-hidden", "false");
      }
      if (playing) {
        document.body.classList.remove("video-paused", "video-buffering");
      } else {
        document.body.classList.add("video-paused");
      }
    } else {
      document.body.classList.remove("live-video-active", "video-paused", "video-buffering");
      if (bgVideoContainer) {
        bgVideoContainer.classList.remove("active");
        bgVideoContainer.setAttribute("aria-hidden", "true");
      }
    }

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

  function getActiveDuration() {
    let dur = 0;
    if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getDuration === "function") {
      try {
        dur = ytPlayer.getDuration() || 0;
      } catch (e) { }
    }
    if (!dur && offlineAudio && offlineAudio.duration && isFinite(offlineAudio.duration)) {
      dur = offlineAudio.duration || 0;
    }
    return dur > 0 ? dur : 0;
  }

  function getActiveCurrentTime() {
    let cur = 0;
    if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.getCurrentTime === "function") {
      try {
        cur = ytPlayer.getCurrentTime() || 0;
      } catch (e) { }
    } else if (offlineAudio && offlineAudio.currentTime && isFinite(offlineAudio.currentTime)) {
      cur = offlineAudio.currentTime || 0;
    }
    return cur > 0 ? cur : 0;
  }

  function updateLiveProgress() {
    if (isSeeking) return;

    const cur = getActiveCurrentTime();
    const dur = getActiveDuration();

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
      let cloudList = [];
      let ytList = [];

      // 1. Fetch Cloudinary songs from data/cloudinary folder
      try {
        const cloudRes = await fetch("data/cloudinary/cloudinary_songs.json", { cache: "no-store" });
        if (cloudRes.ok) cloudList = await cloudRes.json();
      } catch (e) {
        console.warn("Cloudinary songs fetch warning:", e);
      }

      // 2. Fetch YouTube songs from data/youtube folder
      try {
        const ytRes = await fetch("data/youtube/youtube_songs.json", { cache: "no-store" });
        if (ytRes.ok) ytList = await ytRes.json();
      } catch (e) {
        console.warn("YouTube songs fetch warning:", e);
      }

      const maxLen = Math.max(cloudList.length, ytList.length);
      songs = [];
      for (let i = 0; i < maxLen; i++) {
        const c = cloudList[i] || {};
        const y = ytList[i] || {};
        songs.push({
          name: c.name || y.name || `Song ${i + 1}`,
          nameEn: c.nameEn || y.nameEn || `Song ${i + 1}`,
          singer: c.singer || y.singer || "Chhath Bhakti",
          singerEn: c.singerEn || y.singerEn || "Chhath Bhakti",
          file: c.file || "",
          ytName: y.name || c.name || "",
          ytNameEn: y.nameEn || c.nameEn || "",
          ytSinger: y.singer || c.singer || "",
          ytSingerEn: y.singerEn || c.singerEn || "",
          videoId: y.videoId || c.videoId || "",
          embedUrl: y.embedUrl || ""
        });
      }

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

      // Preload current song file in offline audio with .load() for 0ms latency start
      if (offlineAudio && songs[0] && songs[0].file) {
        offlineAudio.src = songs[0].file;
        offlineAudio.load();
      }

      // Preload all audio tracks in background cache for instant zero-delay playback
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          songs.forEach((s) => {
            if (s.file) {
              const a = new Audio();
              a.preload = "auto";
              a.src = s.file;
            }
          });
        });
      } else {
        setTimeout(() => {
          songs.forEach((s) => {
            if (s.file) {
              const a = new Audio();
              a.preload = "auto";
              a.src = s.file;
            }
          });
        }, 1200);
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

    let title = "";
    let singer = "";

    if (isOnlineMode) {
      title = currentLang === "en"
        ? (s.ytNameEn || s.nameEn || s.ytName || s.name)
        : (s.ytName || s.name);
      singer = currentLang === "en"
        ? (s.ytSingerEn || s.singerEn || s.ytSinger || s.singer)
        : (s.ytSinger || s.singer);
    } else {
      title = currentLang === "en" ? (s.nameEn || s.name) : s.name;
      singer = currentLang === "en" ? (s.singerEn || s.singer) : s.singer;
    }

    const fullSinger = singer || (currentLang === "en" ? "Devotional Song" : "भक्ति गीत");

    if (songName) songName.textContent = title;
    if (songSinger) songSinger.textContent = fullSinger;

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
        const name = isOnlineMode
          ? (currentLang === "en" ? (s.ytNameEn || s.nameEn || s.ytName || s.name) : (s.ytName || s.name))
          : (currentLang === "en" ? (s.nameEn || s.name) : s.name);
        const singer = isOnlineMode
          ? (currentLang === "en" ? (s.ytSingerEn || s.singerEn || s.ytSinger || s.singer) : (s.ytSinger || s.singer || ""))
          : (currentLang === "en" ? (s.singerEn || s.singer) : (s.singer || ""));
        return (
          name.toLowerCase().includes(query) ||
          singer.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          (s.nameEn && s.nameEn.toLowerCase().includes(query)) ||
          (s.singer && s.singer.toLowerCase().includes(query)) ||
          (s.singerEn && s.singerEn.toLowerCase().includes(query)) ||
          (s.ytName && s.ytName.toLowerCase().includes(query)) ||
          (s.ytNameEn && s.ytNameEn.toLowerCase().includes(query))
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
        const songTitle = isOnlineMode
          ? (currentLang === "en" ? (s.ytNameEn || s.nameEn || s.ytName || s.name) : (s.ytName || s.name))
          : (currentLang === "en" ? (s.nameEn || s.name) : s.name);
        const songSingerName = isOnlineMode
          ? (currentLang === "en" ? (s.ytSingerEn || s.singerEn || s.ytSinger || s.singer) : (s.ytSinger || s.singer || (currentLang === "en" ? "Devotional Song" : "भक्ति गीत")))
          : (currentLang === "en" ? (s.singerEn || s.singer) : (s.singer || (currentLang === "en" ? "Devotional Song" : "भक्ति गीत")));
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
    displaySongInfo(index);

    // Completely pause and stop YouTube video if running
    if (isYtReady && ytPlayer) {
      try {
        if (typeof ytPlayer.pauseVideo === "function") ytPlayer.pauseVideo();
        if (typeof ytPlayer.stopVideo === "function") ytPlayer.stopVideo();
      } catch (e) { }
    }
    document.body.classList.remove("live-video-active", "video-paused", "video-buffering");
    if (bgVideoContainer) {
      bgVideoContainer.classList.remove("active");
      bgVideoContainer.setAttribute("aria-hidden", "true");
    }

    // Play high quality audio directly from Cloudinary MP3 file ONLY in offline mode
    if (offlineAudio) {
      if (offlineAudio.src !== s.file) {
        offlineAudio.src = s.file;
        offlineAudio.load();
      }
      const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
      const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;
      offlineAudio.volume = volNum / 100;
      offlineAudio.playbackRate = activeRate;

      const playPromise = offlineAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaybackState(true);
          })
          .catch((err) => {
            console.warn("Audio play blocked/error:", err);
          });
      }
    }
  }

  function playOnlineSong(index) {
    const s = songs[index];
    if (!s) return;
    displaySongInfo(index);

    // 1. Completely stop and pause Cloudinary audio so it NEVER plays in Online mode
    if (offlineAudio) {
      offlineAudio.pause();
      offlineAudio.currentTime = 0;
    }

    document.body.classList.add("live-video-active");
    if (bgVideoContainer) {
      bgVideoContainer.classList.add("active");
      bgVideoContainer.setAttribute("aria-hidden", "false");
    }

    const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
    const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;

    // 2. Play live YouTube video with audio directly in Online mode
    setBufferingState(true);
    if (isYtReady && ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      try {
        if (s.videoId) {
          ytPlayer.loadVideoById({
            videoId: s.videoId,
            startSeconds: 0,
            suggestedQuality: "hd1080"
          });
          ytPlayer.unMute();
          ytPlayer.setVolume(volNum);
          ytPlayer.playVideo();
          if (typeof ytPlayer.setPlaybackRate === "function") {
            ytPlayer.setPlaybackRate(activeRate);
          }
          if (typeof ytPlayer.setPlaybackQuality === "function") {
            ytPlayer.setPlaybackQuality("hd1080");
          }
          if (typeof ytPlayer.setPlaybackQualityRange === "function") {
            ytPlayer.setPlaybackQualityRange("hd1080", "highres");
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
      if (isOnlineMode) {
        if (isYtReady && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
          try { ytPlayer.pauseVideo(); } catch (e) { }
        }
      } else {
        if (offlineAudio && !offlineAudio.paused) {
          offlineAudio.pause();
        }
      }
      setPlaybackState(false);
      showToast("⏸️ गीत पॉज़ किया गया");
    } else {
      // Play
      if (isOnlineMode) {
        if (offlineAudio && !offlineAudio.paused) {
          offlineAudio.pause();
        }
        if (isYtReady && ytPlayer && typeof ytPlayer.playVideo === "function") {
          try {
            const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
            ytPlayer.unMute();
            ytPlayer.setVolume(volNum);
            ytPlayer.playVideo();
          } catch (e) { }
        } else {
          playOnlineSong(currentSong);
        }
      } else {
        // Offline Mode: Play Cloudinary audio ONLY
        if (offlineAudio) {
          const s = songs[currentSong];
          if (s && offlineAudio.src !== s.file) {
            offlineAudio.src = s.file;
          }
          const volNum = volumeSlider ? parseInt(volumeSlider.value, 10) : 100;
          const activeRate = PLAYBACK_SPEEDS[currentSpeedIndex] ? PLAYBACK_SPEEDS[currentSpeedIndex].value : 1.0;
          offlineAudio.volume = volNum / 100;
          offlineAudio.playbackRate = activeRate;
          offlineAudio.play().catch((err) => {
            console.warn("Audio play error:", err);
            playSong(currentSong);
          });
        }
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

  /* Robust Seek Controller (Online & Offline) */
  function seekToTime(targetSec) {
    const dur = getActiveDuration();
    const safeSec = Math.max(0, dur > 0 ? Math.min(dur, targetSec) : targetSec);

    // Apply seek to online YouTube player
    if (isOnlineMode && isYtReady && ytPlayer && typeof ytPlayer.seekTo === "function") {
      try {
        ytPlayer.seekTo(safeSec, true);
        if (isPlaying && typeof ytPlayer.playVideo === "function") {
          ytPlayer.playVideo();
        }
      } catch (e) {
        console.warn("YouTube seekTo error:", e);
      }
    }

    // Apply seek to offline audio
    if (offlineAudio && offlineAudio.duration && isFinite(offlineAudio.duration)) {
      try {
        offlineAudio.currentTime = safeSec;
      } catch (e) { }
    }

    // Immediately update visual UI so it doesn't flicker or snap
    if (dur > 0) {
      const pct = (safeSec / dur) * 100;
      if (progress) progress.value = pct;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (currentTime) currentTime.textContent = formatTime(safeSec);
    }

    // Keep isSeeking true for 350ms to allow YouTube time to catch up and prevent snapback
    isSeeking = true;
    if (seekDebounceTimeout) clearTimeout(seekDebounceTimeout);
    seekDebounceTimeout = setTimeout(() => {
      isSeeking = false;
      updateLiveProgress();
    }, 350);
  }

  function seekRelative(deltaSec) {
    const cur = getActiveCurrentTime();
    const dur = getActiveDuration();
    if (dur > 0) {
      const target = Math.max(0, Math.min(dur, cur + deltaSec));
      seekToTime(target);
      showToast(deltaSec > 0 ? `⏩ +${deltaSec}s` : `⏪ ${deltaSec}s`);
    }
  }

  /* Seek interactions (Forward / Backward Scrubbing) */
  if (progress) {
    const handleSeekInput = () => {
      isSeeking = true;
      if (seekDebounceTimeout) clearTimeout(seekDebounceTimeout);
      const dur = getActiveDuration();
      const pct = parseFloat(progress.value) || 0;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (currentTime && dur > 0) {
        currentTime.textContent = formatTime((pct / 100) * dur);
      }
    };

    const handleSeekCommit = () => {
      const dur = getActiveDuration();
      const pct = parseFloat(progress.value) || 0;
      if (dur > 0) {
        const targetSec = (pct / 100) * dur;
        seekToTime(targetSec);
      } else {
        isSeeking = false;
      }
    };

    progress.addEventListener("mousedown", () => { isSeeking = true; });
    progress.addEventListener("touchstart", () => { isSeeking = true; }, { passive: true });
    progress.addEventListener("input", handleSeekInput);
    progress.addEventListener("change", handleSeekCommit);
    progress.addEventListener("mouseup", handleSeekCommit);
    progress.addEventListener("touchend", handleSeekCommit);
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

  /* =========================================================
     PLAYBACK SPEED DROPDOWN CONTROLLER
     ========================================================= */
  function openSpeedDropdown() {
    if (!speedDropdown) return;
    speedDropdown.classList.add("open");
    if (speedBtn) speedBtn.setAttribute("aria-expanded", "true");
  }

  function closeSpeedDropdown() {
    if (!speedDropdown) return;
    speedDropdown.classList.remove("open");
    if (speedBtn) speedBtn.setAttribute("aria-expanded", "false");
  }

  function toggleSpeedDropdown() {
    if (!speedDropdown) return;
    if (speedDropdown.classList.contains("open")) {
      closeSpeedDropdown();
    } else {
      openSpeedDropdown();
    }
  }

  /* Playback Speed Controller Function */
  function setPlaybackRate(speedObj) {
    const rateItem = (typeof speedObj === "object" && speedObj !== null)
      ? speedObj
      : (PLAYBACK_SPEEDS.find((s) => Math.abs(s.value - parseFloat(speedObj)) < 0.01) || { value: parseFloat(speedObj) || 1.0, label: `${speedObj}x` });

    const r = parseFloat(rateItem.value) || 1.0;
    const label = rateItem.label || `${r}x`;

    const foundIdx = PLAYBACK_SPEEDS.findIndex((s) => Math.abs(s.value - r) < 0.01);
    if (foundIdx !== -1) {
      currentSpeedIndex = foundIdx;
    }

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
      if (Math.abs(r - 1.0) > 0.01) {
        speedBtn.classList.add("custom-speed");
      } else {
        speedBtn.classList.remove("custom-speed");
      }
    }

    // Sync active item in dropdown
    if (speedMenuItems && speedMenuItems.length > 0) {
      speedMenuItems.forEach((item) => {
        const itemSpeed = parseFloat(item.getAttribute("data-speed"));
        if (Math.abs(itemSpeed - r) < 0.01) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
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
    speedBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSpeedDropdown();
    });
  }

  if (speedMenuItems && speedMenuItems.length > 0) {
    speedMenuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const sp = parseFloat(item.getAttribute("data-speed"));
        if (!isNaN(sp)) {
          setPlaybackRate(sp);
        }
        closeSpeedDropdown();
      });
    });
  }

  if (speedDropdownMenu) {
    speedDropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener("click", (e) => {
    if (speedDropdown && !speedDropdown.contains(e.target)) {
      closeSpeedDropdown();
    }
  });

  document.addEventListener("touchstart", (e) => {
    if (speedDropdown && !speedDropdown.contains(e.target)) {
      closeSpeedDropdown();
    }
  }, { passive: true });

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

    // Escape -> Close Playlist Modal or Speed Dropdown
    if (e.key === "Escape") {
      if (playlistModal && playlistModal.classList.contains("open")) {
        e.preventDefault();
        playlistModal.classList.remove("open");
      }
      closeSpeedDropdown();
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