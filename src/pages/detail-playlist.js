import instance from "../axios";
import "../style.css";

export default function detailPlaylist () { 
    return /*html*/`
    <div class="content padding-content">
        <div class="playlist-detail__flex">
            <div class="playlist-detail__info"></div>
            <ul class="playlist-detail__songs"></ul>
        </div>
    </div>
    `
}

export async function detailPlaylistScript (slug) {
    const playlistInfoEl = document.querySelector(".playlist-detail__info");
    const tracksHTML = document.querySelector(".playlist-detail__songs");
    const playlistResponse = await instance.get(`/playlists/details/${slug}`);
    // Playlist Info
    const detailPlaylist = playlistResponse.data;
    playlistInfoEl.innerHTML = `
        <img class="playlist-detail__thumb" src="${detailPlaylist.thumbnails[0]}" alt="playlist-thumb"/>
        <h1 class="title">${detailPlaylist.title}</h1>
        <p class="sub-title">${detailPlaylist.description}</p>
        <span class="playlist-detail__info-amount">${detailPlaylist.songCount}  bài hát -  ${detailPlaylist.duration} phút</span>
        <span class="playlist-detail__info-view">Nghệ sĩ ${detailPlaylist.artists[0]}</span>
    `

    // Playlist tracks
    const tracks = playlistResponse.data.tracks;
    // console.log(tracks);
    tracksHTML.innerHTML = tracks.map((item, index) => {
        return `
        <li>
        <a href="/songs/details/${item.id}" class="playlist-detail__song-item" data-navigo>
            <i class="fa-solid fa-play"></i>
            <span class="song-item__index">${index + 1}</span>
            <img class="song-item__thumb" src="${item.thumbnails[0]}" alt="song-thumb"/>
            <div class="song-item__info">
                <h3 class="song-item__title">${item.title}</h3>
                <p class="song-item__artist">${item.artists.join(", ")}</p>
            </div>
            <span class="song-item__duration">${item.duration}</span>
        </a>
        </li>
        `
    }).join("");
}

