// detail-album.js
import instance from "../axios";

export default function detailAlbum() {
  return /*html*/ `
    <div class="content padding-content">
      <div class="playlist-detail__flex">
        <div class="playlist-detail__info"></div>
        <ul class="playlist-detail__songs"></ul>
      </div>
    </div>
    `;
}

export async function detailAlbumScript(slug) {
  const albumInfoEl = document.querySelector(".playlist-detail__info");
  const tracksHTML = document.querySelector(".playlist-detail__songs");

  let songs = [];

  // --- HÀM RENDER GIAO DIỆN ---
  const renderUI = (data) => {
    songs = data.tracks || [];

    // Render thông tin Album
    albumInfoEl.innerHTML = `
      <img class="playlist-detail__thumb" src="${data.thumbnails ? data.thumbnails[0] : ''}" alt="album-thumb"/>
      <h1 class="title">${data.title}</h1>
      <p class="sub-title">${data.popularity || 0} lượt thích</p>
    `;

    // Render danh sách bài hát
    tracksHTML.innerHTML = songs.map((track, index) => `
      <li class="playlist-detail__song-item song-item" data-id="${track.id}" data-index="${index}">
          <i class="fa-solid fa-play play-icon" id="alum-item__play"></i>
          <span class="song-item__index">${index + 1}</span>
          <img class="song-item__thumb song-thumbnail" src="${track.thumbnails ? track.thumbnails[0] : ''}" loading="lazy" />

          <div class="song-item__info song-info">
            <h3 class="song-item__title song-title">${track.title}</h3>
            <p class="song-item__artist">${track.artistsNames || ''}</p>
          </div>

          <span class="song-item__duration song-duration">
            ${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}
          </span>
      </li>
    `).join("");
  };

  const loadAlbumData = async () => {
    const cacheKey = `album_${slug}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      renderUI(JSON.parse(cached));
    }

    try {
      const response = await instance.get(`/albums/details/${slug}`);
      const data = response.data;

      if (JSON.stringify(data) !== cached) {
        renderUI(data);
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Lỗi tải album:", error);
    }
  };

  await loadAlbumData();

  function updateActiveSong(activeId) {
    const allItems = document.querySelectorAll(".song-item");
    allItems.forEach((item) => {
      const playIcon = item.querySelector(".play-icon");
      if (String(item.dataset.id) === String(activeId)) {
        item.classList.add("active");
        item.style.backgroundColor = "rgba(255,255,255,0.1)";
      } else {
        item.classList.remove("active");
        item.style.backgroundColor = "transparent";
        if (playIcon) playIcon.className = "fa-solid fa-play play-icon";
      }
    });
  }

  tracksHTML.addEventListener("click", function (event) {
    const songItem = event.target.closest(".song-item");
    if (!songItem) return;

    const songId = songItem.getAttribute("data-id");
    const song = songs.find((s) => String(s.id) === String(songId));

    if (song) {
      updateActiveSong(songId);
      if (typeof window.playMusic === "function") {
        window.playMusic(song, songs);
      } else {
        console.error("Chưa load FooterScript");
      }
    }
  });

  const onSongChanged = (e) => {
    updateActiveSong(e.detail.songId);
  };

  window.removeEventListener("song-changed", onSongChanged);
  window.addEventListener("song-changed", onSongChanged);
}