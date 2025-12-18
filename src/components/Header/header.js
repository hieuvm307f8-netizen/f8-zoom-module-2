import "../../style.css";
import "./header.css";

const Header = () => {
  return /*html*/ `
       <Header class="header">
       <div class="content">
       <div class="logo">
           <a href="/" class="logo-link">
            <i class="fa-brands fa-youtube"></i>
            <span>Music</span>
           </a>
        </div>

        <div class="search-box">
            <input type="search" placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ, postcast" id="search-input"/>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
        
        <div class="actions">
        <a class="btn btn-login" data-navigo href="/login">
            <i class="fa-regular fa-circle-user"></i>
            Đăng Nhập
        </a>
        </div>
        </div>
       </Header>
    `;

};
export default Header;
