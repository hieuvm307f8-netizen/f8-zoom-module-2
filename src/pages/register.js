import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import "../style.css"
import instance from '../axios';

export default function register() {
  return /*html*/ `
    <div class="container">
      <div class="form-container">
        <div class="form-left">
          <img src="../../../public/images/federica-maniezzo-4JBs6_bUxWo-unsplash.jpg" />
        </div>

        <div class="form-right">
          <h2 class="form-title">Đăng Ký</h2>

          <form id="login-form">
          <div class="form-group">
              <label>Tên</label>
              <input type="text" id="name" />
              <span class="error-message"></span>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" id="email" />
              <span class="error-message"></span>
            </div>

            <div class="form-group">
              <label>Mật khẩu</label>
              <input type="password" id="password" />
              <span class="error-message"></span>
            </div>

            <div class="form-group">
              <label>Xác nhận mật khẩu</label>
              <input type="password" id="password-confirm" />
              <span class="error-message"></span>
            </div>

            <button type="submit" id="submit-btn">
                <span class="btn-text">Đăng Ký</span> 
                <span class="loader" style="display: none;"></span>
            </button>
            <a href="/login" class="register" data-navigo>Đăng nhập</a>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function registerScript() {
 const registerForm = document.getElementById("login-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const loader = submitBtn.querySelector(".loader");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-confirm").value;

    if (!name || !email || !password || !confirmPassword) {
      showToast("Vui lòng nhập đầy đủ thông tin!", dangerBg);
      return;
    }

    if (password !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp!", dangerBg);
      return;
    }

    toggleLoading(true);

    try {
      const { data } = await instance.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      showToast("Đăng ký thành công 🎉", successBg);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Đăng ký thất bại, vui lòng thử lại!";
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
