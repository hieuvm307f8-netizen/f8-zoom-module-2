import "../style.css";

export default function footer() {
  return /*html*/ `
        <footer class="footer player-bar">
            <div class="w-full h-1 bg-gray-700 relative">
                <input id="player-progress-bar" type="range" min="0" max="100" value="0" class="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 accent-red-500 cursor-pointer z-50">
            </div>

            <div class="player-wrapper">
                <!-- Left-control -->
                <div class="left-control">
                <button class="prev-btn">
                    <i class="fa-solid fa-backward"></i>
                </button>

                <button class="player-btn">
                    <i class="fa-solid fa-play"></i>
                </button>
    
                <button class="next-btn">
                    <i class="fa-solid fa-forward"></i>
                </button>
                <div id="player-time" class="hidden lg:flex items-center gap-1 text-sm text-gray-300">
            <span id="player-current">6:06</span> / 
            <span id="player-duration">7:05</span>
        </div>
                </div>

            <!-- Middle -->
            <div class="middle-control">
                <div class="middle-flex">
                    <img class="song-thumb" src="" alt="song-thumbnail"/>

                    <div class="song-info">
                        <h3 class="song-name">Song Name</h3>
                        <p class="singer-name">Singer Name</p>
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

            <!-- Right-control -->
            <div class="right-control">
                <button class="volume-btn">
                    <i class="fa-solid fa-volume-low"></i>
                </button>
            </div>
         </div>
    </footer>
    `;
}



footerScript();