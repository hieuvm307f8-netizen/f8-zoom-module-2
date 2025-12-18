import { app } from "../../main";
import "../../style.css";
import "./login.css";
import { instance } from "../../Axios/axios";

const requestLogin = async (email, password) => {
  const response = await instance.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

const login = () => {
  app.innerHTML = /*html*/ `
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

            <button type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  `;

  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      return;
    }
    try {
      const data = await requestLogin(email, password);
      // console.log("Login success:", data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Email hoặc mật khẩu không đúng");
    }
  });
};

export default login;
