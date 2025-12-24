import instance from "../axios";

export default function detailVideo() {
  return /*html*/ `
        <div class="content padding-content padding-video__page">
            <div class="content-wrapper">
            <div class="video">
                <div id="ytplayer"></div>

                <div class="video-info">
                    <h2 class="title-video"></h2>
                    <span class="views"></span>
                </div>

                <input id="player-progress-bar" class="progress-bar" type="range" min="0" max="100" value="0">

                <div class="main-control">
                    <button class="repeat">
                        <i class="fa-solid fa-repeat"></i>
                    </button>

                    <button class="prev">
                        <i class="fa-solid fa-backward"></i>
                    </button>    

                    <div class="state-control">
                        <button class="play"><i class="fa-solid fa-play"></i></button>
                        <button class="pause hidden"><i class="fa-solid fa-pause"></i></button>
                    </div>

                    <button class="next">
                        <i class="fa-solid fa-forward"></i>
                    </button>
                    
                    <div class="volume-bar">
                        <input type="range" class="volume-bar-input" value="100" min="0" max="100">
                    </div>
                </div>
            </div>
                
            <div class="related"></div>
            </div>
        </div>
    `;
}

export async function detailVideoScript(slug) {
  const relatedElement = document.querySelector(".related");
  const videoTitle = document.querySelector(".title-video");
  const playBtn = document.querySelector(".play");
  const pauseBtn = document.querySelector(".pause");
  const progressBar = document.querySelector("#player-progress-bar");
  const volumeInput = document.querySelector(".volume-bar-input");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let player;
  let relatedVideos = [];
  let currentVideoIndex = -1;

  try {
    const response = await instance.get(`/videos/details/${slug}`);
    const data = response.data;
    relatedVideos = data.related;
    videoTitle.textContent = data.title;

    // Render Related Videos
    relatedElement.innerHTML = relatedVideos.map((item, index) => `
        <div class="related-item" data-id="${item.videoId}" data-index="${index}">
            <img alt="${item.title}" src="${item.thumbnails[0]}"/>
            <div class="related-item__info">
                <h3 class="related-item__title">${item.title}</h3>
                <span class="related-item__duration">${item.duration} Lượt xem</span>
            </div>
        </div>
    `).join("");

    initYoutubePlayer(data.videoId || slug);

  } catch (error) {
    console.error("Lỗi khi tải video:", error);
  }

  function updateActiveVideo(videoId) {
    const allRelatedItems = document.querySelectorAll(".related-item");
    allRelatedItems.forEach((item) => {
      if (item.dataset.id === videoId) {
        item.classList.add("active");
        item.style.borderRadius = "8px";
      } else {
        item.classList.remove("active");
        item.style.backgroundColor = "transparent";
      }
    });
  }

  function initYoutubePlayer(videoId) {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const loadPlayer = () => {
      player = new YT.Player("ytplayer", {
        height: "600",
        width: "750",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: (e) => {
            onPlayerReady(e);
            updateActiveVideo(videoId);
          },
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      loadPlayer();
    } else {
      window.onYouTubeIframeAPIReady = loadPlayer;
    }
  }

  function onPlayerReady(event) {
    const footerAudio = document.querySelector("#main-audio");
    if (footerAudio) footerAudio.pause();

    setInterval(() => {
      if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        if (duration > 0) {
          progressBar.value = (currentTime / duration) * 100;
        }
      }
    }, 1000);
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      playBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    } else {
      playBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
    }
    if (event.data === YT.PlayerState.ENDED) {
        nextBtn.click();
    }
  }

  // --- CONTROLS ---
  playBtn.onclick = () => player.playVideo();
  pauseBtn.onclick = () => player.pauseVideo();

  progressBar.oninput = (e) => {
    const seekTo = (e.target.value / 100) * player.getDuration();
    player.seekTo(seekTo, true);
  };

  volumeInput.oninput = (e) => player.setVolume(e.target.value);

  // Next Video
  nextBtn.onclick = () => {
    currentVideoIndex++;
    if (currentVideoIndex >= relatedVideos.length) currentVideoIndex = 0;
    const video = relatedVideos[currentVideoIndex];
    if (video) {
      player.loadVideoById(video.videoId);
      videoTitle.textContent = video.title;
      updateActiveVideo(video.videoId);
    }
  };

  // Prev Video
  prevBtn.onclick = () => {
    currentVideoIndex--;
    if (currentVideoIndex < 0) currentVideoIndex = relatedVideos.length - 1;
    const video = relatedVideos[currentVideoIndex];
    if (video) {
      player.loadVideoById(video.videoId);
      videoTitle.textContent = video.title;
      updateActiveVideo(video.videoId);
    }
  };

  // related item
  relatedElement.onclick = (e) => {
    const item = e.target.closest(".related-item");
    if (item) {
      const videoId = item.dataset.id;
      currentVideoIndex = parseInt(item.dataset.index);
      player.loadVideoById(videoId);
      videoTitle.textContent = item.querySelector("h3").textContent;
      updateActiveVideo(videoId);
    }
  };
}