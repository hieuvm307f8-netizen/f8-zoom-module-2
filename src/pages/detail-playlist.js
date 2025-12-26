import instance from "../axios";
import { formatDuration } from "../common/JS/format";
import "../style.css";

export default function detailPlaylist() {
    return /*html*/`
    <div class="content padding-content">
        <div class="playlist-detail__flex">
            <div class="playlist-detail__info"></div>
            <ul class="playlist-detail__songs"></ul>
        </div>
    </div>
    `;
}

export async function detailPlaylistScript(slug) {
    const playlistInfoEl = document.querySelector(".playlist-detail__info");
    const tracksHTML = document.querySelector(".playlist-detail__songs");
    let tracks = [];

    const renderUI = (data) => {
        tracks = data.tracks || [];
        
        playlistInfoEl.innerHTML = `
            <img class="playlist-detail__thumb" src="${data.thumbnails[0]}" alt="playlist-thumb"/>
            <h1 class="title">${data.title}</h1>
            <p class="sub-title">${data.description || "Không có mô tả"}</p>
            <span class="playlist-detail__info-amount">${data.songCount} bài hát - ${formatDuration(data.duration)} phút</span>
            <span class="playlist-detail__info-view">Nghệ sĩ: ${data.artists[0]}</span>
        `;

        tracksHTML.innerHTML = tracks.map((item, index) => /*html*/`
            <li class="song-item-wrapper">
                <div class="playlist-detail__song-item song-item" data-id="${item.id}" data-index="${index}">
                    <div class="song-item__left">
                        <i class="fa-solid fa-play play-icon"></i>
                        <span class="song-item__index">${index + 1}</span>
                        <img class="song-item__thumb" src="${item.thumbnails[0]}" alt="song-thumb" loading="lazy"/>
                    </div>
                    <div class="song-item__info">
                        <h3 class="song-item__title">${item.title}</h3>
                        <p class="song-item__artist">${item.artists.join(", ")}</p>
                    </div>
                    <span class="song-item__duration">${formatDuration(item.duration)}</span>
                </div>
            </li>
        `).join("");
    };

    const loadPlaylistData = async () => {
        const cacheKey = `playlist_${slug}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
            const data = JSON.parse(cached);
            renderUI(data);
        }

        try {
            const { data } = await instance.get(`/playlists/details/${slug}`);
            if (JSON.stringify(data) !== cached) {
                renderUI(data);
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
            }
        } catch (error) {
            console.error("Lỗi khi tải playlist:", error);
        }
    };

    await loadPlaylistData();

    function updateActiveSong(activeId) {
        const allItems = document.querySelectorAll(".song-item");
        allItems.forEach(item => {
            const playIcon = item.querySelector(".play-icon");
            if (String(item.dataset.id) === String(activeId)) {
                item.classList.add("active");
                // if (playIcon) playIcon.className = "fa-solid fa-volume-high"; 
            } else {
                item.classList.remove("active");
                if (playIcon) playIcon.className = "fa-solid fa-play";
            }
        });
    }

    tracksHTML.addEventListener("click", (e) => {
        const songItem = e.target.closest(".song-item");
        if (!songItem) return;

        const songId = songItem.dataset.id;
        const songData = tracks.find(t => String(t.id) === String(songId));

        if (songData && window.playMusic) {
            updateActiveSong(songId);
            // const icon = songItem.querySelector(".play-icon");
            const formattedSong = {
                ...songData,
                artistsNames: songData.artists.join(", ")
            };
            
            window.playMusic(formattedSong, tracks);
        }
    });

    window.addEventListener("song-changed", (e) => {
        updateActiveSong(e.detail.songId);
    });
}