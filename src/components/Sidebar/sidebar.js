import "../../style.css";
import "./sidebar.css";

const Sidebar = () => {
  return /*html*/ `
  <div class="sidebar">
    <div class="bars">
       <i class="fa-solid fa-bars"></i>
    </div>

    <div class="navigation">
    <a href="/" data-navigo class="nav-link">
    <i class="fa-solid nav-icon fa-house"></i>
    <span class="nav-title">
    Trang chủ
    </span>
    </a> 

    <a href="/explore" data-navigo class="nav-link">
    <i class="fa-solid nav-icon fa-compass"></i>
    <span class="nav-title">
    Khám phá
    </span>
    </a>   

    <a href="/library" data-navigo class="nav-link">
    <i class="fa-solid nav-icon fa-bookmark"></i>
    <span class="nav-title">
    Thư viện
    </span>
    </a>
    
    <a href="/premium" data-navigo class="nav-link">
    <i class="fa-solid nav-icon fa-crown"></i>
    <span class="nav-title">
    Premium
    </span>
    </a>
</div>
  </div>
    `;  
};
export default Sidebar;
