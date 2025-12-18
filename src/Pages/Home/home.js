import { instance } from "../../Axios/axios";
import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

import "../../style.css";
import "../../components/Header/header.css";
import "./home.css";

const Home = async () => {
  app.innerHTML = `
  ${Header()}
    <main>
    <div class="auth-info"></div>
    <div class="moods"></div>
      <h1 class="title">Quick Picks</h1>
      <div class="quick-picks"></div>

       <section class="album">
        <div class="album-header">
          <h2 class="title">Album gợi ý cho bạn</h2>
          <div class="album-control">
            <button class="prev control-hover"><i class="fa-solid fa-angle-left"></i></button>
            <button class="next control-hover"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>

        <div class="album-list">
        </div>
      </section>

      <section class="album">
        <div class="album-header">
          <h2 class="title">Today's Hit</h2>
          <div class="album-control">
            <button class="prev control-hover"><i class="fa-solid fa-angle-left"></i></button>
            <button class="next control-hover"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>

        <div class="album-list today-list">
        </div>
      </section>

      <h1 class="title">Nhạc Việt</h1>
      <div class="country-list">
      </div>
    </main> 
  ${Sidebar()}
    `;

  //handle scrollbar
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const albumList = album.querySelector(".album-list");
    const nextBtn = album.querySelector(".next");
    const prevBtn = album.querySelector(".prev");

    const scrollAmount = () => {
      const item = albumList.querySelector(".album-item");
      return item ? item.offsetWidth + 20 : 200;
    };

    nextBtn.addEventListener("click", () => {
      albumList.scrollBy({
        left: scrollAmount(),
        behavior: "smooth",
      });
    });

    prevBtn.addEventListener("click", () => {
      albumList.scrollBy({
        left: -scrollAmount(),
        behavior: "smooth",
      });
    });
  });

  //Get Token
//   const accessToken = localStorage.getItem("access_token");
//   const authInfo = document.querySelector('.auth-info');
//   const loginEl = document.querySelector(".actions");
//   const authResponse = await instance.get("/auth/me");
//   // console.log(authResponse.data);

//   if (accessToken) {
//     loginEl.innerHTML = `
//     <div class="auth-block">
//     <img alt="avatar" class="auth-avatar" src="../../../public/images/no-avatar-350x350-1.jpeg"/>
//     <a class="logout-btn">Đăng xuất</a>
//     </div>
//     `;
//     authInfo.innerHTML = `<h1 class="auth-name">
//                             <i class="fa-solid fa-hand"></i>
//                             Xin chào, ${authResponse.data.name}
//                           </h1>`
//   } else {
//     loginEl.innerHTML = ` <a class="btn btn-login" data-navigo href="/login">
//             <i class="fa-regular fa-circle-user"></i>
//             Đăng Nhập
//         </a>`;
//   }

// document.querySelector(".logout-btn").addEventListener("click", () => {
//   if(window.confirm("Bạn có muốn đăng xuất không ? ")) {
//     localStorage.clear();
//   }
//   window.location.href = "/login";
// });

  
  //moods
  const moodEl = document.querySelector(".moods");
  const moodResponse = await instance.get(`/moods`);
  moodEl.innerHTML = moodResponse.data.items
    .map((item) => {
      return ` 
      <a class="btn" href="moods/${item.slug}" data-navigo>
        ${item.name}
      </a>
    `;
    })
    .join("");
  // Quick-picks
  const quickpickResponse = await instance.get(`/quick-picks`);
  const quickPickEl = document.querySelector(".quick-picks");
  const quickpickData = quickpickResponse.data
    .map((item) => {
      return `
      <div class="quickpick__item"> 
        <i class="fa-solid fa-play play-btn"></i>
        <img alt"quickpick-thumb" class="quickpick__img" src="${item.thumbnails[0]}"/>
        <div class="info">
          <h2 class="quickpick-info__title">${item.title}</h2>
          <div class="quickpick-info__detail">
            <span class="quickpick-info__artist">${item.artists[0]}</span> - 
            <span class="quickpick-info__artist">${item.popularity}x lượt nghe</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
  quickPickEl.innerHTML = quickpickData;

  // Suggestion
  const suggestEl = document.querySelector(".album-list");
  const suggestRessponse = await instance.get(`home/albums-for-you`);
  // console.log(suggestRessponse.data);
  suggestEl.innerHTML = suggestRessponse.data
    .map((item) => {
      return `
        <div class="album-item">
    <img 
      src="${item.thumbnails[0]}" 
      alt="suggestion-thumbnail"
      class="suggestion-thumb"
    />
  <h3 class="suggesttion-title">${item.title}</h3>
  <p class="suggestion-artists">${item.artists[0]}</p>
</div>
    `;
    })
    .join("");

  // Today's Hit
  const todayHitEl = document.querySelector(".today-list");
  const todayResponse = await instance.get("/home/todays-hits");
  todayHitEl.innerHTML = todayResponse.data
    .map((item) => {
      return `
      <div class="album-item">
    <img 
      src="${item.thumbnails[0]}" 
      alt="suggestion-thumbnail"
      class="suggestion-thumb"
    />
  <h3 class="suggesttion-title">${item.title}</h3>
  <p class="suggestion-artists">${item.artists[0]}</p>
</div>
    `;
    })
    .join("");

  // Country
  const countryList = document.querySelector(".country-list");
  const countryResponse = await instance.get(
    "/playlists/by-country?country=VN&limit=3"
  );
  countryList.innerHTML = countryResponse.data
    .map((item) => {
      return `
       <div class="album-item">
    <img 
      src="${item.thumbnails[0]}" 
      alt="suggestion-thumbnail"
      class="suggestion-thumb"
    />
  <h3 class="suggesttion-title">${item.title}</h3>
  <p class="suggestion-artists">${item.artists[0]}</p>
</div>
    `;
    })
    .join("");
};
export default Home;
