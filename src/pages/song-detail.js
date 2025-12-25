import instance from "../axios";

export default function detailSong() {
  return /*html*/ `
    <div class="content padding-content">
      <div class="playlist-detail__flex">
        <div class="playlist-detail__info"></div>
        <ul class="playlist-detail__songs"></ul>
      </div>
    </div>
    `;
}

export async function detailSongScript(id) {
  const playlistInfoEl = document.querySelector(".playlist-detail__info");
  const tracksHTML = document.querySelector(".playlist-detail__songs");
  let songs = [];
  try {
    const res = await instance.get(`/songs/details/${id}`);
    const data = res.data;
    songs = data.album.tracks; 

    // Render Album info
    playlistInfoEl.innerHTML = `
      <img class="playlist-detail__thumb" src="${data.thumbnails ? data.thumbnails[0] : ''}" />
      <h1 class="title">${data.title}</h1>
      <p class="sub-title">${data.popularity || 0} lượt thích</p>
    `;
    // Render danh sách bài hát
    tracksHTML.innerHTML = songs.map((track, index) => `
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
    `).join("");
  } catch (error) {
    console.error("Lỗi khi tải bài hát:", error);
    return;
  }

  // Audio Handler
  tracksHTML.addEventListener("click", function (event) {
    const songItem = event.target.closest(".song-item");
    if (!songItem) return;

    const songId = songItem.getAttribute("data-id");
    const song = songs.find((s) => String(s.id) === String(songId));
    
    if (song) {
        if (typeof window.playMusic === "function") {
            window.playMusic(song, songs); 
        } else {
            console.error("Hàm playMusic chưa được khởi tạo ở Footer");
        }
        updateActiveSong(songId);
    }
  });

  function updateActiveSong(activeId) {
    document.querySelectorAll(".song-item").forEach((item) => {
        if(String(item.dataset.id) === String(activeId)) {
            item.classList.add("active");
            item.style.backgroundColor = "rgba(255,255,255,0.1)";
        } else {
            item.classList.remove("active");
            item.style.backgroundColor = "transparent";
        }
    });
  }
  window.addEventListener('song-changed', (e) => {
      updateActiveSong(e.detail);
  });
}