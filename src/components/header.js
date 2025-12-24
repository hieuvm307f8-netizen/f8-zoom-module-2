import Toastify from "toastify-js";
import '../style.css'
export default function header () {
    const isLogin = !!localStorage.getItem("access_token");
    return /*html*/` 
    <header class="header">
        <div class="content">
            <div class="flex">
                <div class="menu-bar">
                    <i class="fa-solid fa-bars"></i>
                </div>

                <a class="logo" data-navigo href="/">
                    <i class="fa-brands fa-youtube"></i>
                    <span class="band-name">Music</span>
                </a>
                
                <div class="input-search">
                    <input type="search" id="search" placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."/>
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <ul class="search-suggestions" id="search-suggestions"></ul>
                </div>

                <div class="actions">
                    ${isLogin ? `
                        <div class="user-logged">
                            <img src="https://i.stack.imgur.com/frlIf.png" alt="Avatar" class="user-avatar" />
                            <button id="logout-btn" class="btn-logout">Đăng xuất <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
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


export function headerScript() {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    // Tạo DOM custom cho toast
    const toastNode = document.createElement("div");
    toastNode.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:10px;">
        <span>Bạn có chắc chắn muốn đăng xuất?</span>
        <div style="display:flex; gap:8px; justify-content:flex-end;">
          <button id="toast-cancel" style="
            padding:6px 12px;
            border:none;
            border-radius:4px;
            cursor:pointer;
            background:#ccc;
          ">Không</button>

          <button id="toast-confirm" style="
            padding:6px 12px;
            border:none;
            border-radius:4px;
            cursor:pointer;
            background:#ff4d4f;
            color:white;
          ">Có</button>
        </div>
      </div>
    `;

    const toast = Toastify({
      node: toastNode,
      duration: -1, 
      gravity: "top",
      position: "right",
      close: false,
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff512f, #dd2476)",
      },
    }).showToast();

    toastNode.querySelector("#toast-cancel").onclick = () => {
      toast.hideToast();
    };

    toastNode.querySelector("#toast-confirm").onclick = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    };
  });
}
