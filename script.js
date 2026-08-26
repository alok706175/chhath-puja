/* =========================================================
       LIVE CLOCK
       ========================================================= */

    function updateClock() {

      const now = new Date();

      let hours = now.getHours();

      const minutes =
        now.getMinutes()
          .toString()
          .padStart(2, "0");

      const suffix =
        hours >= 12 ? "pm" : "am";

      hours =
        hours % 12 || 12;

      const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
      ];

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      document.getElementById("currentTime").textContent =
        `${hours}:${minutes} ${suffix} IST`;

      document.getElementById("currentDate").textContent =
        `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    }

    updateClock();

    setInterval(
      updateClock,
      1000
    );


    /* =========================================================
       AUDIO PLAYER
       ========================================================= */

    let songs = [];

    let currentSong = 0;

    let isSeeking = false;

    let lastVolume = 1;


    const offlineAudio =
      document.getElementById("offlineAudio");

    const songName =
      document.getElementById("offlineSongName");

    const playButton =
      document.getElementById("offlinePlay");

    const progress =
      document.getElementById("offlineProgress");

    const currentTime =
      document.getElementById("currentSongTime");

    const totalTime =
      document.getElementById("totalSongTime");

    const muteBtn =
      document.getElementById("muteBtn");

    const volumeSlider =
      document.getElementById("volumeSlider");

    const playlistToggleBtn =
      document.getElementById("playlistToggleBtn");

    const playlistCloseBtn =
      document.getElementById("playlistCloseBtn");

    const playlistModal =
      document.getElementById("playlistModal");

    const playlistList =
      document.getElementById("playlistList");

    const playlistTitle =
      document.getElementById("playlistTitle");


    /* =========================================================
       LOAD SONGS
       ========================================================= */

    async function loadOfflineSongs() {

      try {

        const response =
          await fetch(
            "songs.json",
            {
              cache: "no-store"
            }
          );

        if (!response.ok) {
          throw new Error(
            "songs.json load nahi hui"
          );
        }

        songs =
          await response.json();

        if (
          !Array.isArray(songs) ||
          songs.length === 0
        ) {

          songName.textContent =
            "No Song Found";

          return;
        }

        playlistTitle.textContent =
          `🎵 Chhath Geet List (${songs.length})`;

        renderPlaylist();

        loadSong(0);

      } catch (error) {

        console.error(
          "Songs fetch failed:",
          error
        );

        songName.textContent =
          "The songs could not be loaded.";

      }

    }


    /* =========================================================
       PLAYLIST
       ========================================================= */

    function renderPlaylist() {

      const isPlaying =
        !offlineAudio.paused;

      playlistList.innerHTML =
        songs.map(
          (s, idx) => `

      <li
        class="playlist-item ${idx === currentSong
              ? "active"
              : ""
            }"
        data-index="${idx}"
      >

        <span>
          ${idx + 1}.
        </span>

        <span class="playlist-item-name">
          ${escapeHTML(s.name)}
        </span>

        ${idx === currentSong &&
              isPlaying
              ? `
              <span class="equalizer">

                <span class="equalizer-bar"></span>

                <span class="equalizer-bar"></span>

                <span class="equalizer-bar"></span>

              </span>
            `
              : ""
            }

      </li>

    `
        ).join("");


      playlistList
        .querySelectorAll(
          ".playlist-item"
        )
        .forEach(
          item => {

            item.addEventListener(
              "click",
              e => {

                e.stopPropagation();

                const songIdx =
                  parseInt(
                    item.getAttribute(
                      "data-index"
                    ),
                    10
                  );

                playSong(songIdx);

                playlistModal
                  .classList
                  .remove("open");

              }
            );

          }
        );

    }


    /* =========================================================
       FORMAT TIME
       ========================================================= */

    function formatTime(seconds) {

      if (
        !isFinite(seconds) ||
        isNaN(seconds)
      ) {
        return "0:00";
      }

      const m =
        Math.floor(
          seconds / 60
        );

      const s =
        Math.floor(
          seconds % 60
        )
          .toString()
          .padStart(2, "0");

      return `${m}:${s}`;

    }


    /* =========================================================
       MEDIA SESSION
       IMPORTANT:
       NO "STOP" HANDLER
       ========================================================= */

    const MEDIA_SESSION_SUPPORTED =
      "mediaSession" in navigator;


    function updateMediaSessionPosition() {

      if (
        !MEDIA_SESSION_SUPPORTED ||
        !(
          "setPositionState"
          in navigator.mediaSession
        )
      ) {
        return;
      }

      const duration =
        offlineAudio.duration;

      const position =
        offlineAudio.currentTime;

      const playbackRate =
        offlineAudio.playbackRate || 1;


      if (
        !isFinite(duration) ||
        duration <= 0 ||
        !isFinite(position) ||
        position < 0 ||
        !isFinite(playbackRate) ||
        playbackRate <= 0
      ) {
        return;
      }


      try {

        navigator.mediaSession.setPositionState({

          duration:
            duration,

          playbackRate:
            playbackRate,

          position:
            Math.min(
              position,
              duration
            )

        });

      } catch (error) {

        console.debug(
          "Media Session position error:",
          error
        );

      }

    }


    /* =========================================================
       MEDIA SESSION METADATA
       ========================================================= */

    function updateMediaSessionMetadata() {

      if (
        !MEDIA_SESSION_SUPPORTED ||
        !songs[currentSong]
      ) {
        return;
      }


      try {

        navigator.mediaSession.metadata =
          new MediaMetadata({

            title:
              songs[currentSong].name,

            artist:
              "छठ महापर्व",

            album:
              "छठ घाट",

            artwork: [

              {
                src:
                  "/favicon.io/favicon.png",

                sizes:
                  "96x96",

                type:
                  "image/png"
              },

              {
                src:
                  "/favicon.io/favicon.png",

                sizes:
                  "128x128",

                type:
                  "image/png"
              },

              {
                src:
                  "/favicon.io/favicon.png",

                sizes:
                  "192x192",

                type:
                  "image/png"
              },

              {
                src:
                  "/favicon.io/favicon.png",

                sizes:
                  "256x256",

                type:
                  "image/png"
              },

              {
                src:
                  "/favicon.io/favicon.png",

                sizes:
                  "512x512",

                type:
                  "image/png"
              }

            ]

          });

      } catch (error) {

        console.error(
          "Media Session metadata error:",
          error
        );

      }

    }


    /* =========================================================
       MEDIA SESSION ACTION HANDLERS
       ========================================================= */

    function setupMediaSessionHandlers() {

      if (!MEDIA_SESSION_SUPPORTED) {

        console.log(
          "Media Session API is not supported."
        );

        return;
      }


      /* PLAY */

      try {

        navigator.mediaSession.setActionHandler(
          "play",
          async () => {

            try {

              await offlineAudio.play();

              navigator.mediaSession.playbackState =
                "playing";

            } catch (error) {

              console.error(
                "Media Session play error:",
                error
              );

            }

          }
        );

      } catch (error) {

        console.debug(
          "Play action not supported:",
          error
        );

      }


      /* PAUSE */

      try {

        navigator.mediaSession.setActionHandler(
          "pause",
          () => {

            offlineAudio.pause();

            navigator.mediaSession.playbackState =
              "paused";

          }
        );

      } catch (error) {

        console.debug(
          "Pause action not supported:",
          error
        );

      }


      /* PREVIOUS TRACK */

      try {

        navigator.mediaSession.setActionHandler(
          "previoustrack",
          () => {

            if (!songs.length) {
              return;
            }

            currentSong =
              (
                currentSong -
                1 +
                songs.length
              ) %
              songs.length;

            playSong(
              currentSong
            );

          }
        );

      } catch (error) {

        console.debug(
          "Previous track not supported:",
          error
        );

      }


      /* NEXT TRACK */

      try {

        navigator.mediaSession.setActionHandler(
          "nexttrack",
          () => {

            if (!songs.length) {
              return;
            }

            currentSong =
              (
                currentSong +
                1
              ) %
              songs.length;

            playSong(
              currentSong
            );

          }
        );

      } catch (error) {

        console.debug(
          "Next track not supported:",
          error
        );

      }


      /* SEEK BACKWARD */

      try {

        navigator.mediaSession.setActionHandler(
          "seekbackward",
          details => {

            if (
              !isFinite(
                offlineAudio.duration
              )
            ) {
              return;
            }

            const skip =
              details.seekOffset || 10;

            offlineAudio.currentTime =
              Math.max(
                offlineAudio.currentTime -
                skip,
                0
              );

            updateMediaSessionPosition();

          }
        );

      } catch (error) {

        console.debug(
          "Seek backward not supported:",
          error
        );

      }


      /* SEEK FORWARD */

      try {

        navigator.mediaSession.setActionHandler(
          "seekforward",
          details => {

            if (
              !isFinite(
                offlineAudio.duration
              )
            ) {
              return;
            }

            const skip =
              details.seekOffset || 10;

            offlineAudio.currentTime =
              Math.min(
                offlineAudio.currentTime +
                skip,
                offlineAudio.duration
              );

            updateMediaSessionPosition();

          }
        );

      } catch (error) {

        console.debug(
          "Seek forward not supported:",
          error
        );

      }


      /* SEEK TO */

      try {

        navigator.mediaSession.setActionHandler(
          "seekto",
          details => {

            if (
              !isFinite(
                offlineAudio.duration
              ) ||
              !isFinite(
                details.seekTime
              )
            ) {
              return;
            }

            offlineAudio.currentTime =
              Math.max(
                0,
                Math.min(
                  details.seekTime,
                  offlineAudio.duration
                )
              );

            updateMediaSessionPosition();

          }
        );

      } catch (error) {

        console.debug(
          "Seek to not supported:",
          error
        );

      }


      /*
       ========================================================
       IMPORTANT CHANGE
    
       "stop" ACTION HANDLER INTENTIONALLY REMOVED.
    
       Pehle yahan:
    
       navigator.mediaSession.setActionHandler("stop", ...)
    
       tha jo pause + currentTime=0 +
       playbackState="none" karta tha.
    
       Ab browser/Android ke stop/dismiss behavior
       ko JavaScript se manually force nahi kiya ja raha.
       ========================================================
      */

    }


    /* =========================================================
       SETUP MEDIA SESSION
       ========================================================= */

    setupMediaSessionHandlers();


    /* =========================================================
       LOAD SONG
       ========================================================= */

    function loadSong(index) {

      if (!songs[index]) {
        return;
      }

      currentSong =
        index;

      offlineAudio.pause();

      offlineAudio.src =
        songs[index].file;

      offlineAudio.load();

      songName.textContent =
        songs[index].name;

      currentTime.textContent =
        "0:00";

      totalTime.textContent =
        "0:00";

      progress.value =
        0;

      renderPlaylist();

      updateMediaSessionMetadata();

    }


    /* =========================================================
       PLAY SONG
       ========================================================= */

    async function playSong(index) {

      if (!songs[index]) {
        return;
      }

      loadSong(index);

      try {

        await offlineAudio.play();

      } catch (error) {

        console.warn(
          "Play blocked:",
          error
        );

        playButton.textContent =
          "▶";

      }

    }


    /* =========================================================
       MAIN PLAY / PAUSE
       ========================================================= */

    playButton.addEventListener(
      "click",
      async () => {

        if (offlineAudio.paused) {

          try {

            await offlineAudio.play();

          } catch (error) {

            console.error(
              "Play error:",
              error
            );

          }

        } else {

          offlineAudio.pause();

        }

      }
    );


    /* =========================================================
       PREVIOUS
       ========================================================= */

    document
      .getElementById("prevSong")
      .addEventListener(
        "click",
        () => {

          if (!songs.length) {
            return;
          }

          currentSong =
            (
              currentSong -
              1 +
              songs.length
            ) %
            songs.length;

          playSong(
            currentSong
          );

        }
      );


    /* =========================================================
       NEXT
       ========================================================= */

    document
      .getElementById("nextSong")
      .addEventListener(
        "click",
        () => {

          if (!songs.length) {
            return;
          }

          currentSong =
            (
              currentSong +
              1
            ) %
            songs.length;

          playSong(
            currentSong
          );

        }
      );


    /* =========================================================
       AUDIO LOADED
       ========================================================= */

    offlineAudio.addEventListener(
      "loadedmetadata",
      () => {

        totalTime.textContent =
          formatTime(
            offlineAudio.duration
          );

        updateMediaSessionPosition();

      }
    );


    /* =========================================================
       AUDIO TIME UPDATE
       ========================================================= */

    offlineAudio.addEventListener(
      "timeupdate",
      () => {

        if (isSeeking) {
          return;
        }

        if (
          offlineAudio.duration &&
          isFinite(
            offlineAudio.duration
          )
        ) {

          progress.value =
            (
              offlineAudio.currentTime /
              offlineAudio.duration
            ) *
            100;

          updateMediaSessionPosition();

        }

        currentTime.textContent =
          formatTime(
            offlineAudio.currentTime
          );

      }
    );


    /* =========================================================
       SEEK START
       ========================================================= */

    progress.addEventListener(
      "mousedown",
      () => {
        isSeeking = true;
      }
    );

    progress.addEventListener(
      "touchstart",
      () => {
        isSeeking = true;
      }
    );


    /* =========================================================
       SEEK INPUT
       ========================================================= */

    progress.addEventListener(
      "input",
      () => {

        if (!offlineAudio.duration) {
          return;
        }

        isSeeking = true;

        currentTime.textContent =
          formatTime(
            (
              progress.value /
              100
            ) *
            offlineAudio.duration
          );

      }
    );


    /* =========================================================
       SEEK CHANGE
       ========================================================= */

    progress.addEventListener(
      "change",
      () => {

        if (!offlineAudio.duration) {
          return;
        }

        offlineAudio.currentTime =
          (
            progress.value /
            100
          ) *
          offlineAudio.duration;

        isSeeking = false;

        updateMediaSessionPosition();

      }
    );


    /* =========================================================
       AUDIO PLAY EVENT
       ========================================================= */

    offlineAudio.addEventListener(
      "play",
      () => {

        playButton.textContent =
          "❚❚";

        if (MEDIA_SESSION_SUPPORTED) {

          updateMediaSessionMetadata();

          navigator.mediaSession.playbackState =
            "playing";

        }

        renderPlaylist();

        updateMediaSessionPosition();

      }
    );


    /* =========================================================
       AUDIO PLAYING EVENT
       ========================================================= */

    offlineAudio.addEventListener(
      "playing",
      () => {

        if (MEDIA_SESSION_SUPPORTED) {

          updateMediaSessionMetadata();

          navigator.mediaSession.playbackState =
            "playing";

        }

        updateMediaSessionPosition();

      }
    );


    /* =========================================================
       AUDIO PAUSE EVENT
       ========================================================= */

    offlineAudio.addEventListener(
      "pause",
      () => {

        playButton.textContent =
          "▶";

        if (MEDIA_SESSION_SUPPORTED) {

          navigator.mediaSession.playbackState =
            "paused";

        }

        renderPlaylist();

        updateMediaSessionPosition();

      }
    );


    /* =========================================================
       AUDIO ENDED
       ========================================================= */

    offlineAudio.addEventListener(
      "ended",
      () => {

        if (!songs.length) {
          return;
        }

        currentSong =
          (
            currentSong +
            1
          ) %
          songs.length;

        playSong(
          currentSong
        );

      }
    );


    /* =========================================================
       VOLUME
       ========================================================= */

    volumeSlider.addEventListener(
      "input",
      () => {

        const vol =
          volumeSlider.value /
          100;

        offlineAudio.volume =
          vol;

        updateVolumeIcon(
          vol
        );

      }
    );


    /* =========================================================
       VOLUME ICONS
       ========================================================= */

    const VOL_HIGH_ICON = `
  <svg viewBox="0 0 24 24">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
`;

    const VOL_LOW_ICON = `
  <svg viewBox="0 0 24 24">
    <path d="M7 9v6h4l5 5V4L11 9H7zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25-2.5-4.02z"/>
  </svg>
`;

    const VOL_MUTE_ICON = `
  <svg viewBox="0 0 24 24">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
`;


    function updateVolumeIcon(vol) {

      if (vol === 0) {

        muteBtn.innerHTML =
          VOL_MUTE_ICON;

      } else if (vol < 0.5) {

        muteBtn.innerHTML =
          VOL_LOW_ICON;

      } else {

        muteBtn.innerHTML =
          VOL_HIGH_ICON;

      }

    }


    /* =========================================================
       MUTE
       ========================================================= */

    muteBtn.addEventListener(
      "click",
      () => {

        if (offlineAudio.volume > 0) {

          lastVolume =
            offlineAudio.volume;

          offlineAudio.volume =
            0;

          volumeSlider.value =
            0;

          updateVolumeIcon(0);

        } else {

          offlineAudio.volume =
            lastVolume;

          volumeSlider.value =
            lastVolume * 100;

          updateVolumeIcon(
            lastVolume
          );

        }

      }
    );


    /* =========================================================
       PLAYLIST OPEN
       ========================================================= */

    playlistToggleBtn.addEventListener(
      "click",
      e => {

        e.stopPropagation();

        playlistModal.classList.toggle(
          "open"
        );

      }
    );


    /* =========================================================
       PLAYLIST CLOSE
       ========================================================= */

    playlistCloseBtn.addEventListener(
      "click",
      e => {

        e.stopPropagation();

        playlistModal.classList.remove(
          "open"
        );

      }
    );


    playlistModal.addEventListener(
      "click",
      e => {

        e.stopPropagation();

      }
    );


    document.addEventListener(
      "click",
      e => {

        if (
          !playlistModal.contains(
            e.target
          ) &&
          e.target !==
          playlistToggleBtn
        ) {

          playlistModal.classList.remove(
            "open"
          );

        }

      }
    );


    /* =========================================================
       HTML ESCAPE
       ========================================================= */

    function escapeHTML(text) {

      const div =
        document.createElement("div");

      div.textContent =
        text;

      return div.innerHTML;

    }


    /* =========================================================
       INITIAL VOLUME
       ========================================================= */

    offlineAudio.volume =
      1;

    volumeSlider.value =
      100;

    updateVolumeIcon(1);


    /* =========================================================
       START
       ========================================================= */

    loadOfflineSongs();