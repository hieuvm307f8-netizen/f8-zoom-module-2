import "../style.css";

export default function login() {
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

};

export function loginScript () {

}
