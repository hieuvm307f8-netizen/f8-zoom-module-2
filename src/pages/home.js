import instance from "../axios";
import "../style.css";
import "../common/css/scroll-layout.css";
import { initHorizontalScroll } from "../common/JS/scroll";

export default function home() {
  return /*html*/ `                 
        <div class="content padding-content">
            <span class="greeting"></span>
            <div class="mood-list"></div>
            <!-- Quick Pick-->
            <h1 class="title">Quick Pick</h1>
            <div class="quick-pick__list"></div>

             <!-- Quick Pick-->
            <h1 class="title">Album gợi ý cho bạn</h1>
            <section class="scroll">
                <div class="scroll-header">
                    <i class="fa-solid fa-angle-left"></i>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="scrollbar-list"></div>
            </section>

            <h1 class="title">Top Hit's</h1>
            <section class="scroll" id="scroll-top-hits">
                <div class="scroll-header">
                    <i class="fa-solid fa-angle-left"></i>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="scrollbar-list today-hit"></div>
            </section>

            <h1 class="title">Nhạc Việt</h1>
            <div class="country-list"></div>
        </div>  
    `;
}

export async function homeScript() {
  const greetingEl = document.querySelector(".greeting");
  const access_token = localStorage.getItem("access_token");
  const authRessponse = await instance.get("/auth/me");
  // console.log(authRessponse.data);
  if(access_token) {
    greetingEl.innerHTML = `Xin chào, ${authRessponse.data.name} <i class="fa-solid fa-heart" style="color: red;"></i>`;
  }
  initHorizontalScroll(".scroll", 500);
  initHorizontalScroll("#scroll-top-hits", 500);
  //mood-list
  const moodListEl = document.querySelector(".mood-list");
  const moodListResponse = await instance.get("/moods");
  moodListEl.innerHTML = moodListResponse.data.items
    .map((item) => {
      return `<a href="/moods/${item.slug}" data-navigo class="btn">${item.name}</a>`;
    })
    .join("");

  // quick-pick
  const quickPickEl = document.querySelector(".quick-pick__list");
  const quickPickResponse = await instance.get("/quick-picks");
  quickPickEl.innerHTML = quickPickResponse.data
    .map((item) => {
      return `
            <a class="quick-picks__item" href="/playlists/details/${item.slug}" data-navigo>
                <i class="fa-solid fa-play"></i>
                <img alt="quick-pick__thumb" class="quick-pick__thumb" src="${item.thumbnails[0]}"/>
                <div class="quick-pick__info">
                    <h3 class="item-name">${item.title}</h3>
                    <div class="info">
                        <span class="artists">${item.artists[0]}</span> . 
                        <span class="views">Views: ${item.popularity}</span>
                    </div>
                </div>
            </a>
        `;
    })
    .join("");

  // Suggest Album
  const SuggestAlbumEl = document.querySelector(".scrollbar-list");
  const suggestAlbRequest = await instance.get("/home/albums-for-you");
  // console.log(suggestAlbRequest.data);
  SuggestAlbumEl.innerHTML = suggestAlbRequest.data
    .map((item) => {
      return `
            <a class="item" data-navigo href="/albums/details/${item.slug}">
                <img src="${item.thumbnails[0]}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.title}</h3>
                <h3 class="alb-artists">${item.artists}</h3>
            </a>
        `;
    })
    .join("");

  // Hits
  const todayHitEl = document.querySelector(".today-hit");
  const todayHitResponse = await instance.get("/home/todays-hits");
  console.log(todayHitResponse.data);
  todayHitEl.innerHTML = todayHitResponse.data
    .map((item) => {
      return `
            <a class="item" data-navigo href="/playlists/details/${item.slug}">
                <img src="${item.thumbnails[0]}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.title}</h3>
                <h3 class="alb-artists">${item.artists}</h3>
            </a>
        `;
    })
    .join("");

  // Country-music
  const countryList = document.querySelector(".country-list");
  const countryResponse = await instance.get(
    `/playlists/by-country?country=VN&limit=4`
  );
  console.log(countryResponse.data);
  countryList.innerHTML = countryResponse.data
    .map((item) => {
      return `
            <a class="country-item" data-navigo href="/playlists/details/${item.slug}">
                <img alt="country-thumb" class="country-thumb" src="${item.thumbnails[0]}"/>
                <h3 class="country-item__title">${item.title}</h3>
                <span class="artists">${item.artists}</span>
            </a>
        `;
    })
    .join("");
}