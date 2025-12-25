import Toastify from "toastify-js";
import '../style.css'
import instance from "../axios";

export default function header() {
    const isLogin = !!localStorage.getItem("access_token");
    return /*html*/` 
    <header class="header">
        <div class="content">
            <div class="flex">
                <div class="menu-bar" id="menu-toggle">
                    <i class="fa-solid fa-bars"></i>
                </div>

                <a class="logo" data-navigo href="/">
                    <i class="fa-brands fa-youtube"></i>
                    <span class="band-name">Music</span>
                </a>
                
                <div class="input-search">
    <input type="search" id="search" placeholder="Tìm kiếm bài hát, đĩa nhạc, nghệ sĩ..."/>
    <i class="fa-solid fa-magnifying-glass search-icon"></i>
    <ul class="search-suggestions" id="search-suggestions"></ul>
</div>

                <div class="actions">
                    ${isLogin ? `
                        <div class="user-logged" style="display: flex; align-items: center; gap: 10px;">
                            <i class="fa-solid fa-user user-avatar" alt="Avatar" style="font-size: 35px; border-radius: 50%; color: #fff"></i>
                            <button id="logout-btn" class="btn-logout">
                                Đăng xuất <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            </button>
                        </div>
                    ` : `
                        <a class="btn btn-login" href="/login" data-navigo>
                            <i class="fa-solid fa-circle-user"></i>
                            Đăng nhập
                        </a>
                    `}
                </div>
            </div>
        </div>
    </header>
    `
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

export function headerScript() {
    const searchInput = document.getElementById("search");
    const suggestionList = document.getElementById("search-suggestions");

    if (!searchInput || !suggestionList) return;

    // --- 1. XỬ LÝ GỢI Ý (SUGGESTIONS) ---
    const processInput = debounce(async (keyword) => {
        if (!keyword) {
            suggestionList.innerHTML = "";
            suggestionList.style.display = "none";
            return;
        }

        try {
            const response = await instance.get(`/search/suggestions`, {
                params: { q: keyword }
            });
            // Khớp với cấu trúc API: { suggestions: [], completed: [] }
            const list = response.data.suggestions || [];
            renderSuggestions(list);
        } catch (error) {
            console.error("Lỗi lấy gợi ý:", error);
        }
    }, 300);

    searchInput.addEventListener("input", (e) => processInput(e.target.value.trim()));

    function renderSuggestions(list) {
        if (list.length === 0) {
            suggestionList.style.display = "none";
            return;
        }

        suggestionList.innerHTML = list.map(item => `
            <li class="suggestion-item">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>${item}</span>
            </li>
        `).join("");

        suggestionList.style.display = "block";

        // Click vào gợi ý để tìm kiếm luôn
        suggestionList.querySelectorAll(".suggestion-item").forEach(item => {
            item.addEventListener("click", () => {
                const text = item.querySelector("span").innerText;
                searchInput.value = text;
                suggestionList.style.display = "none";
                performSearch(text);
            });
        });
    }

    // --- 2. XỬ LÝ TÌM KIẾM (SEARCH) ---
    const performSearch = async (keyword) => {
        if (!keyword) return;
        
        try {
            // Giả sử bạn muốn render kết quả vào phần #app
            const app = document.getElementById("app");
            if(app) app.innerHTML = "<p style='color:white; padding:20px;'>Đang tìm kiếm...</p>";

            const response = await instance.get(`/search`, {
                params: { q: keyword, limit: 20, page: 1 }
            });
            
            console.log("Kết quả tìm kiếm:", response.data);
            // Tại đây bạn có thể gọi hàm render kết quả của riêng bạn
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            performSearch(searchInput.value.trim());
            suggestionList.style.display = "none";
        }
    });

    // Đóng danh sách khi click ra ngoài
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionList.contains(e.target)) {
            suggestionList.style.display = "none";
        }
    });

    // --- 3. LOGIC ĐĂNG XUẤT ---
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const toastNode = document.createElement("div");
            toastNode.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px; font-family: sans-serif; color: white;">
                    <span style="font-size: 14px;">Bạn có chắc chắn muốn đăng xuất?</span>
                    <div style="display:flex; gap:8px; justify-content:flex-end;">
                        <button id="toast-cancel" style="padding:4px 10px; border:none; border-radius:4px; cursor:pointer; background:#f0f0f0; color: #333;">Không</button>
                        <button id="toast-confirm" style="padding:4px 10px; border:none; border-radius:4px; cursor:pointer; background:#ff4d4f; color:white;">Có</button>
                    </div>
                </div>
            `;

            const toast = Toastify({
                node: toastNode,
                duration: -1,
                gravity: "top",
                position: "right",
                style: { background: "#333", borderRadius: "8px", padding: "15px" },
            }).showToast();

            toastNode.querySelector("#toast-cancel").onclick = () => toast.hideToast();
            toastNode.querySelector("#toast-confirm").onclick = () => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.reload();
            };
        });
    }
}