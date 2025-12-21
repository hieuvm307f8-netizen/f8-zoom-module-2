import instance from "../axios";
import "../style.css";


export default function detailSong () {
     return /*html*/`
    <div class="content padding-content">
        <div class="playlist-detail__flex">
            <div class="playlist-detail__info"></div>
            <ul class="playlist-detail__songs"></ul>
        </div>
        <audio id="main-audio" src=""></audio>
    </div>
    `
}

export async function detailSongScript(id) {
  const playlistInfoEl = document.querySelector(".playlist-detail__info");
  const tracksHTML = document.querySelector(".playlist-detail__songs");

  const res = await instance.get(`/songs/details/${id}`);
  const data = res.data;

  // Album info
  playlistInfoEl.innerHTML = `
    <img class="playlist-detail__thumb" src="${data.thumbnails[0]}" />
    <h1 class="title">${data.title}</h1>
    <p class="sub-title">${data.popularity} lượt thích</p>
  `;

  const tracks = data.album.tracks;
  tracksHTML.innerHTML = tracks.map((track, index) => `
    <li>
      <a href="/songs/details/${track.id}" 
         class="playlist-detail__song-item"
         data-navigo>
        <i class="fa-solid fa-play"></i>
        <span class="song-item__index">${index + 1}</span>
        <img class="song-item__thumb" src="${track.thumbnails[0]}" />

        <div class="song-item__info">
          <h3 class="song-item__title">${track.title}</h3>
        </div>

        <span class="song-item__duration">
          ${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}
        </span>
      </a>
    </li>
  `).join("");
}

