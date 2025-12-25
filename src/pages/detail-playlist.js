import instance from "../axios";
import { formatDuration } from "../common/JS/format";
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
    
    let tracks = []; // Lưu trữ danh sách bài hát để sử dụng cho player

    try {
        const playlistResponse = await instance.get(`/playlists/details/${slug}`);
        const detailPlaylist = playlistResponse.data;
        tracks = detailPlaylist.tracks;

        // Render Playlist Info
        playlistInfoEl.innerHTML = `
            <img class="playlist-detail__thumb" src="${detailPlaylist.thumbnails[0]}" alt="playlist-thumb"/>
            <h1 class="title">${detailPlaylist.title}</h1>
            <p class="sub-title">${detailPlaylist.description}</p>
            <span class="playlist-detail__info-amount">${detailPlaylist.songCount} bài hát - ${formatDuration(detailPlaylist.duration)} phút</span>
            <span class="playlist-detail__info-view">Nghệ sĩ ${detailPlaylist.artists[0]}</span>
        `;

        // Render Playlist tracks
        tracksHTML.innerHTML = tracks.map((item, index) => {
            return /*html*/`
            <li class="song-item-wrapper">
                <div class="playlist-detail__song-item song-item" data-id="${item.id}">
                    <i class="fa-solid fa-play"></i>
                    <span class="song-item__index">${index + 1}</span>
                    <img class="song-item__thumb" src="${item.thumbnails[0]}" alt="song-thumb"/>
                    <div class="song-item__info">
                        <h3 class="song-item__title">${item.title}</h3>
                        <p class="song-item__artist">${item.artists.join(", ")}</p>
                    </div>
                    <span class="song-item__duration">${formatDuration(item.duration)}</span>
                </div>
            </li>
            `;
        }).join("");

    } catch (error) {
        console.error("Lỗi khi tải playlist:", error);
        return;
    }

    // --- LOGIC HIGHLIGHT ---
    function updateActiveSong(activeId) {
        const allItems = document.querySelectorAll(".song-item");
        allItems.forEach(item => {
            if (String(item.dataset.id) === String(activeId)) {
                item.classList.add("active");
                item.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            } else {
                item.classList.remove("active");
                item.style.backgroundColor = "transparent";
            }
        });
    }

    tracksHTML.addEventListener("click", (e) => {
        const songItem = e.target.closest(".song-item");
        if (!songItem) return;

        const songId = songItem.dataset.id;
        const songData = tracks.find(t => String(t.id) === String(songId));

        if (songData && window.playMusic) {
            const formattedSong = {
                ...songData,
                artistsNames: songData.artists.join(", ")
            };
            window.playMusic(formattedSong, tracks);
            updateActiveSong(songId);
        }
    });

    window.addEventListener("song-changed", (e) => {
        updateActiveSong(e.detail.songId);
    });
}