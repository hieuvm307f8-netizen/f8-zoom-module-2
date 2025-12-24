import instance from "../axios";
import '../style.css';
import '../common/css/scroll-layout.css';
import { initHorizontalScroll } from "../common/JS/scroll";

export default function detailMood () {
    return /*html*/ `
        <div class="content padding-content">
            <h1 class="title"></h1>
            <p class="sub-title"></p>
            <h1 class="title">Quick Picks</h1>
            <section class="scroll" id="scroll-quick-picks">
                <div class="scroll-header">
                    <i class="fa-solid fa-angle-left"></i>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="scrollbar-list today-hit"></div>
            </section>
            
            <h1 class="title">More</h1>
            <section class="scroll" id="scroll-more">
                <div class="scroll-header">
                    <i class="fa-solid fa-angle-left"></i>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="scrollbar-list today-hit"></div>
            </section>
        </div>
    `;
}

export async function detailMoodScript (slug) {
    const titleEl = document.querySelector(".title");
    const subTitleEl = document.querySelector(".sub-title");
    const response = await instance.get(`/moods/${slug}`);
    titleEl.textContent = response.data.hero.title;
    subTitleEl.textContent = response.data.hero.subtitle;

    // Quick Picks
    initHorizontalScroll("#scroll-quick-picks", 500);
    const featuredEl = document.querySelector("#scroll-quick-picks .scrollbar-list");
    const featutedList = response.data.sections[0].items;
    featuredEl.innerHTML = featutedList.map((item) => {
        return `
             <div class="item">
                <img src="${item.thumbnails[0]}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.title}</h3>
                <h3 class="alb-artists">${item.artists}</h3>
            </div>
        `
    }).join('');


    // More
    initHorizontalScroll("#scroll-more", 500);
    const moreEl = document.querySelector("#scroll-more .scrollbar-list");
    const moreList = response.data.sections[1].items;
    console.log(moreList);
    moreEl.innerHTML = moreList.map((item) => {
        return `
             <div class="item">
                <img src="${item.thumbnails[0]}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.title}</h3>
                <h3 class="alb-artists">${item.artists}</h3>
            </div>
        `
    }).join('')
}

