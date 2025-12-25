import instance from "../axios";
import "../style.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function login() {
  return /*html*/ `
    <div class="container">
      <div class="form-container">
        <div class="form-left">
          <img src="../../../public/images/federica-maniezzo-4JBs6_bUxWo-unsplash.jpg" />
        </div>

        <div class="form-right">
          <h2 class="form-title">Đăng nhập</h2>

          <form id="login-form">
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="email" />
            </div>

            <div class="form-group">
              <label>Mật khẩu</label>
              <input type="password" id="password" />
            </div>

            <button type="submit" id="submit-btn">
              <span class="btn-text">Đăng nhập</span>
              <span class="loader" style="display: none;"></span>
            </button>
            <a href="/register" class="register" data-navigo>Chưa có tài khoản? Đăng ký</a>
            </form>
            <a href="/" class="register" data-navigo>Truy cập với khách <i class="fa-solid fa-house"></i></a>
        </div>
      </div>
    </div>
  `;
};



export function loginScript() {
  const loginForm = document.getElementById("login-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const loader = submitBtn.querySelector(".loader");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showToast("Vui lòng nhập email và mật khẩu!", dangerBg);
      return;
    }

    toggleLoading(true);

    try {
      const { data } = await instance.post("/auth/login", {
        email,
        password,
      });

      const { access_token, refresh_token } = data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      showToast("Đăng nhập thành công 🎉", successBg);

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại!";
      showToast(message, dangerBg);
    } finally {
      toggleLoading(false);
    }
  });

  const successBg = "linear-gradient(to right, #00b09b, #96c93d)";
  const dangerBg = "linear-gradient(to right, #ff5f6d, #ffc371)";

  function showToast(message, background) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background },
    }).showToast();
  }

  function toggleLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.style.opacity = isLoading ? "0.5" : "1";
    loader.style.display = isLoading ? "inline-block" : "none";
  }
}
