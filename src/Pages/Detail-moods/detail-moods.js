import { instance } from "../../Axios/axios";
import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";
import "../../style.css";
import "./detail-moods.css";

const detailMood = async ({ data }) => {
  app.innerHTML = `
    ${Header()}
    <main>
    <div class="moods"></div>
    <h1 class="title"></h1>
    <h2 class="sub-title"></h2>
    <h1 class="title quick-pick">Featured</h1>
   <section class="album">
        <div class="album-header">
          <div class="album-control">
            <button class="prev control-hover"><i class="fa-solid fa-angle-left"></i></button>
            <button class="next control-hover"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>

        <div class="album-list">
        </div>
      </section>

    <h1 class="title quick-pick">More picks</h1>
      <section class="album">
        <div class="album-header">
          <div class="album-control">
            <button class="prev control-hover"><i class="fa-solid fa-angle-left"></i></button>
            <button class="next control-hover"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>

        <div class="album-list more">
        </div>
      </section>
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

  const slug = data.slug;
  const response = await instance.get(`/moods/${slug}`);
  const _data = response.data;

  const title = document.querySelector(".title");
  const subTitle = document.querySelector(".sub-title");

  title.innerText = _data.hero.title;
  subTitle.innerText = _data.hero.subtitle;
   //moods
  const moodEl = document.querySelector(".moods");
  const moodResponse = await instance.get(`/moods`);
  moodEl.innerHTML = moodResponse.data.items
    .map((item) => {
      return ` 
      <a class="btn" href="${item.slug}" data-navigo>
        ${item.name}
      </a>
    `;
    })
    .join("");

  //render list
  const featuredEl = document.querySelector(".album-list");
  featuredEl.innerHTML = _data.sections[0].items
    .map((item) => {
      return `
        <div class="quickpick__item"> 
        <i class="fa-solid fa-play play-btn"></i>
        <img alt"quickpick-thumb" class="quickpick__img" src="${item.thumbnails[0]}"/>
        <div class="info">
          <h2 class="quickpick-info__title">${item.title}</h2>
        </div>
      </div>
        `;
    })
    .join("");

  //render list
  const moreList = document.querySelector(".more");
  moreList.innerHTML = _data.sections[1].items
    .map((item) => {
      return `
        <div class="quickpick__item"> 
        <i class="fa-solid fa-play play-btn"></i>
        <img alt"quickpick-thumb" class="quickpick__img" src="${item.thumbnails[0]}"/>
        <div class="info">
          <h2 class="quickpick-info__title">${item.title}</h2>
        </div>
      </div>
        `;
    })
    .join("");
};

export default detailMood;
