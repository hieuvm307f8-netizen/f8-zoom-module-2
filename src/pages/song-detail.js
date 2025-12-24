import instance from "../axios";

export default function detailSong() {
  return /*html*/ `
    <div class="content padding-content">
      <div class="playlist-detail__flex">
        <div class="playlist-detail__info"></div>
        <ul class="playlist-detail__songs"></ul>
      </div>
    </div>
    
    <footer class="footer player-bar" style="display:none;"> <audio id="main-audio" src=""></audio> 
      <div class="w-full h-1 bg-gray-700 relative">
        <input id="player-progress-bar" class="progress-bar" type="range" min="0" max="100" value="0">
      </div>

      <div class="player-wrapper">
        <div class="left-control">
          <button class="prev-btn prev-button">
            <i class="fa-solid fa-backward"></i>
          </button>

          <button class="player-btn">
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

        <div class="middle-control middle">
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
            <div class="options">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div class="right-control">
          <input type="range" class="volume-bar" value="100" min="0" max="100">
          <button class="volume-button">
            <i class="fa fa-volume-high"></i>
          </button>
        </div>
      </div>
    </footer>
    `;
}

export async function detailSongScript(id) {
  // 1. Select các element cha để render dữ liệu
  const playlistInfoEl = document.querySelector(".playlist-detail__info");
  const tracksHTML = document.querySelector(".playlist-detail__songs");

  // 2. Fetch dữ liệu
  let songs = []; // Khai báo biến songs để dùng chung
  try {
    const res = await instance.get(`/songs/details/${id}`);
    const data = res.data;
    
    // Giả sử API trả về mảng tracks nằm trong data.album.tracks
    // Nếu cấu trúc API khác, bạn cần sửa dòng này
    songs = data.album.tracks; 

    // Render Album info
    playlistInfoEl.innerHTML = `
      <img class="playlist-detail__thumb" src="${data.thumbnails ? data.thumbnails[0] : ''}" />
      <h1 class="title">${data.title}</h1>
      <p class="sub-title">${data.popularity || 0} lượt thích</p>
    `;

    // Render danh sách bài hát
    tracksHTML.innerHTML = songs
      .map(
        (track, index) => `
      <li class="playlist-detail__song-item song-item" data-id="${track.id}">
          <i class="fa-solid fa-play"></i>
          <span class="song-item__index">${index + 1}</span>
          <img class="song-item__thumb song-thumbnail" src="${track.thumbnails ? track.thumbnails[0] : ''}" />

          <div class="song-item__info song-info">
            <h3 class="song-item__title song-title">${track.title}</h3>
            <p class="song-item__artist">${track.artistsNames || ''}</p>
          </div>

          <span class="song-item__duration song-duration">
            ${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}
          </span>
      </li>
    `
      )
      .join("");
  } catch (error) {
    console.error("Lỗi khi tải bài hát:", error);
    return; // Dừng nếu lỗi
  }

  // 3. Sau khi render xong mới select các DOM elements của Player
  const audio = document.querySelector("#main-audio");
  const playerBar = document.querySelector(".player-bar");
  
  // Nút Play/Pause ở thanh player chính (khác với nút ở list)
  const playMainBtn = document.querySelector(".play-button-main");
  const pauseMainBtn = document.querySelector(".pause-button-main");
  
  const currentTimeEl = document.querySelector(".current-time");
  const totalDurationEl = document.querySelector(".total-duration");
  const progress = document.querySelector("#player-progress-bar");
  const volume = document.querySelector(".volume-bar");
  const muteBtn = document.querySelector(".volume-button i"); // Select icon bên trong button
  const nextBtn = document.querySelector(".next-button");
  const prevBtn = document.querySelector(".prev-button");
  
  // Element hiển thị info bài hát đang chạy
  const playerTitle = document.querySelector(".player-bar .song-title");
  const playerArtist = document.querySelector(".player-bar .song-artist");
  const playerThumb = document.querySelector(".player-bar .song-thumb");

  // Biến trạng thái
  let currentIndex = 0;
  let currentSongId = null;

  // --- CÁC HÀM XỬ LÝ ---

  // Hàm định dạng thời gian
  function formatTime(time) {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  // Hàm cập nhật highlight bài đang hát trong danh sách
  function updateActiveSong() {
    document.querySelectorAll(".song-item").forEach((item) => {
      // Ép kiểu về string hoặc number để so sánh chính xác
      const id = item.dataset.id; 
      if (String(id) === String(currentSongId)) {
        item.classList.add("active");
        item.style.backgroundColor = "rgba(255,255,255,0.1)"; // CSS inline demo
      } else {
        item.classList.remove("active");
        item.style.backgroundColor = "transparent";
      }
    });
  }

  // Hàm Play Audio chính
  function playAudio(song) {
    if (!song) return;

    // Lưu ý: Đảm bảo song object có thuộc tính 'url' hoặc 'audioUrl' tùy API trả về
    // Ví dụ ở đây dùng song.url (thường gặp ở ZingMP3/API clone)
    // Nếu API của bạn là song.audioUrl thì sửa lại nhé.
    audio.src = song.url || song.audioUrl || ""; 
    
    if(!audio.src) {
        alert("Không tìm thấy nguồn nhạc!");
        return;
    }

    currentSongId = song.id;
    
    // Cập nhật giao diện player bar
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artistsNames || "Unknown";
    playerThumb.src = song.thumbnails ? song.thumbnails[0] : "";
    
    playerBar.style.display = "block"; // Hiện player bar
    
    // Xử lý Audio promise để tránh lỗi trình duyệt chặn autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            playMainBtn.style.display = "none";
            pauseMainBtn.style.display = "inline-block";
            updateActiveSong();
        }).catch(error => console.log("Lỗi play:", error));
    }
  }

  // --- SỰ KIỆN ---

  // Click vào bài hát trong danh sách
  // Sử dụng tracksHTML (ul) đã select ở trên thay vì .songs-list (sai)
  tracksHTML.addEventListener("click", function (event) {
    const songItem = event.target.closest(".song-item");
    if (!songItem) return;

    const songId = songItem.getAttribute("data-id");
    // Tìm bài hát trong mảng songs
    const songIndex = songs.findIndex((s) => String(s.id) === String(songId));
    
    if (songIndex !== -1) {
        currentIndex = songIndex;
        playAudio(songs[currentIndex]);
    }
  });

  // Nút Play (Main)
  playMainBtn.addEventListener("click", () => {
    if(audio.src) {
        audio.play();
        playMainBtn.style.display = "none";
        pauseMainBtn.style.display = "inline-block";
    }
  });

  // Nút Pause (Main)
  pauseMainBtn.addEventListener("click", () => {
    audio.pause();
    playMainBtn.style.display = "inline-block";
    pauseMainBtn.style.display = "none";
  });

  // Update tiến trình bài hát
  audio.ontimeupdate = () => {
    if(audio.duration) {
        currentTimeEl.innerText = formatTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
    }
  };

  // Khi tải xong metadata (biết độ dài bài hát)
  audio.onloadedmetadata = () => {
    totalDurationEl.innerText = formatTime(audio.duration);
  };

  // Tua nhạc
  progress.oninput = (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  };

  // Âm lượng
  audio.volume = 0.5; // Mặc định 50%
  volume.oninput = () => {
    audio.volume = volume.value / 100;
  };

  // Mute / Unmute
  let lastVolume = 0.5;
  muteBtn.parentNode.addEventListener("click", () => {
    if (audio.volume > 0) {
      lastVolume = audio.volume;
      audio.volume = 0;
      volume.value = 0;
      muteBtn.classList.remove("fa-volume-high");
      muteBtn.classList.add("fa-volume-xmark");
    } else {
      audio.volume = lastVolume;
      volume.value = lastVolume * 100;
      muteBtn.classList.remove("fa-volume-xmark");
      muteBtn.classList.add("fa-volume-high");
    }
  });

  // Next bài
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= songs.length) {
      currentIndex = 0; // Quay lại đầu
    }
    playAudio(songs[currentIndex]);
  });

  // Previous bài
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = songs.length - 1; // Về bài cuối
    }
    playAudio(songs[currentIndex]);
  });

  // Tự động next khi hết bài
  audio.onended = () => {
    currentIndex++;
    if (currentIndex >= songs.length) {
      currentIndex = 0;
    }
    playAudio(songs[currentIndex]);
  };
}