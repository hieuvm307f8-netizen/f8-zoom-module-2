import instance from "../axios";
import { formatViews } from "../common/JS/format";
import { initHorizontalScroll } from "../common/JS/scroll";

export default function ranking() {
  return `
        <div class="content content-padding">
            <div class="page-wrapper" style="padding-left: 50px;">
                <h1 class="title" style="margin-top: 90px;">Bảng xếp hạng MV</h1>

                <section class="scroll" id="videos">
                    <div class="scroll-header">
                        <i class="fa-solid fa-angle-left"></i>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                    <div class="scrollbar-list videos-list">
                            
                    </div>
                </section>

                <h1 class="title" style="margin-top: 90px;">Nghệ sĩ nổi bật</h1>
                <ul class="artists-list">
                
                </ul>
            </div>
        </div>
    `;
}

export async function rankingScript() {
  // get mv ranking
  initHorizontalScroll("#videos", 600);
  const videosList = document.querySelector(".videos-list");
  const videosData = await instance.get(`/charts/videos`);
  console.log(videosData.data.items);
  videosList.innerHTML = videosData.data.items
    .map((item) => {
      return `
            <a class="item" style="width: 340px" href="/videos/details/${item._id}">
                <i class="fa-solid fa-circle-play"></i>
                <img src="${item.thumb}" alt="alb-thumbnail" class="alb-thumbnail" style="width: 100%"/>
                <h3 class="alb-name">${item.title}</h3>
                <h3 class="alb-artists">${formatViews(item.views)} Lượt xem</h3> 
            </a>
        `;
    })
    .join("");

  // get artist ranking
  const artistsEl = document.querySelector(".artists-list");
  const ressponse = await instance.get(`/charts/top-artists`);
//   console.log(ressponse.data.items);

  const getTrendIcon = (trend) => {
    if(trend) {
        if(trend == "up") {
            return `<i class="fa-solid fa-angle-up"></i>`;
        }
        if(trend === "down") {
            return `<i class="fa-solid fa-angle-down"></i>`
        }
    }
    return "";
  }
  artistsEl.innerHTML = ressponse.data.items
    .map((item) => {
      return `
        <li class="artist-item">
            <span class="rank-number">${item.rank}</span>
            <div class="icon">
                ${getTrendIcon(item.trend)}
            </div>

            <div class="artist-info">
                <h3 class="artist-name">${item.name}</h3>
                <span>${formatViews(item.totalViews)} tổng lượt xem</span>
            </div>
        </li>
        `;
    })
    .join("");
}
