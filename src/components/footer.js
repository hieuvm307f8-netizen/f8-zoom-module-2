// components/footer.js

export default function footer() {
  return /*html*/ `
    <footer class="footer player-bar" id="main-footer"> 
      <audio id="main-audio" src=""></audio> 
      
      <div class="progress-container">
        <input id="player-progress-bar" class="progress-bar" type="range" min="0" max="100" value="0">
      </div>

      <div class="player-wrapper">
        <div class="left-control">
          <button class="prev-btn prev-button">
            <i class="fa-solid fa-backward"></i>
          </button>

          <button class="player-btn toggle-play">
            <i class="fa-solid fa-play play-button-main"></i>
            <i class="fa-solid fa-pause pause-button-main" style="display: none;"></i>
          </button>
    
          <button class="next-btn next-button">
            <i class="fa-solid fa-forward"></i>
          </button>

          <div id="player-time" class="duration">
            <span class="current-time">0:00</span> / 
            <span class="total-duration">0:00</span>
          </div>
        </div>

        <div class="middle-control">
          <div class="middle-flex">
            <img class="song-thumb" src="https://via.placeholder.com/50" alt="song-thumbnail"/>
            <div class="song-info">
              <h3 class="song-name song-title">Tên Bài Hát</h3>
              <p class="singer-name song-artist">Ca Sĩ</p>
            </div>
            <div class="emotions">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-thumbs-down"></i>
            </div>
          </div>
        </div>

        <div class="right-control">
          <button class="volume-button">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <input type="range" class="volume-bar" value="100" min="0" max="100">
        </div>
      </div>
    </footer>
  `;
}

export function footerScript() {
  const audio = document.querySelector("#main-audio");
  const playerBar = document.querySelector("#main-footer");
  
  const playMainBtn = document.querySelector(".play-button-main");
  const pauseMainBtn = document.querySelector(".pause-button-main");
  
  const currentTimeEl = document.querySelector(".current-time");
  const totalDurationEl = document.querySelector(".total-duration");
  const progress = document.querySelector("#player-progress-bar");
  const volume = document.querySelector(".volume-bar");
  const nextBtn = document.querySelector(".next-button");
  const prevBtn = document.querySelector(".prev-button");
  
  const playerTitle = document.querySelector(".player-bar .song-title");
  const playerArtist = document.querySelector(".player-bar .song-artist");
  const playerThumb = document.querySelector(".player-bar .song-thumb");

  let currentList = [];
  let currentIndex = 0;
  let isPlaying = false; 

  function formatTime(time) {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function loadSong(song) {
    if (!song) return;
    playerTitle.textContent = song.title || "Unknown";
    playerArtist.textContent = song.artistsNames || "Unknown";
    playerThumb.src = (song.thumbnails && song.thumbnails[0]) ? song.thumbnails[0] : "https://via.placeholder.com/50";
    audio.src = song.url || song.audioUrl || ""; 

    window.dispatchEvent(new CustomEvent("song-changed", { 
      detail: { songId: song.id } 
    }));
  }

  function playAudio() {
    if (!audio.src) return;
    audio.play()
      .then(() => {
        isPlaying = true;
        playMainBtn.style.display = "none";
        pauseMainBtn.style.display = "inline-block";
        playerBar.classList.add("active"); 

        window.dispatchEvent(new CustomEvent("player-status", { 
          detail: { isPlaying: true, songId: currentList[currentIndex]?.id } 
        }));
      })
      .catch(error => console.error("Playback error:", error));
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playMainBtn.style.display = "inline-block";
    pauseMainBtn.style.display = "none";
    
  }

  window.playMusic = function(song, list) {
    if (list) currentList = list;
    
    const index = currentList.findIndex(s => String(s.id) === String(song.id));
    if (index !== -1) currentIndex = index;

    loadSong(song);
    playAudio();
  };

  // Events
  playMainBtn.addEventListener("click", playAudio);
  pauseMainBtn.addEventListener("click", pauseAudio);

  audio.ontimeupdate = () => {
    if(audio.duration) {
        currentTimeEl.innerText = formatTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
    }
  };

  audio.onloadedmetadata = () => {
    totalDurationEl.innerText = formatTime(audio.duration);
  };

  progress.oninput = (e) => {
    if (audio.duration) {
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
  };

  volume.oninput = () => {
    audio.volume = volume.value / 100;
  };

  nextBtn.addEventListener("click", () => {
    if (currentList.length === 0) return;
    currentIndex = (currentIndex + 1) % currentList.length;
    loadSong(currentList[currentIndex]);
    playAudio();
  });

  prevBtn.addEventListener("click", () => {
    if (currentList.length === 0) return;
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    loadSong(currentList[currentIndex]);
    playAudio();
  });

  audio.onended = () => nextBtn.click();
}