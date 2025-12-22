import instance from '../axios';
import '../style.css'
export default function header () {
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
                    <a class="btn btn-login" href="/login" data-navigo>
                        <i class="fa-solid fa-circle-user"></i>
                        Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    </header>
    `
}


