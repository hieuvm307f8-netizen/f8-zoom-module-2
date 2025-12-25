import instance from "../axios";
import { initHorizontalScroll } from "../common/JS/scroll";
import "../style.css";

export default function release () {
    return `
        <div class="content content-padding">
            <div class="page-wrapper" id="release-page" style="padding-left: 50px;">
                <h1 class="title" style="margin-top: 90px;">Bản phát hành mới</h1>
                <section class="scroll" id="albums-new">
                        <div class="scroll-header">
                            <i class="fa-solid fa-angle-left"></i>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div class="scrollbar-list new-albums">
                        
                        </div>
                </section>

                <h1 class="title" style="margin-top: 90px;">Video nhạc mới</h1>
                <section class="scroll" id="videos">
                    <div class="scroll-header">
                        <i class="fa-solid fa-angle-left"></i>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                    <div class="scrollbar-list videos-list">
                            
                    </div>
                </section>
            </div>
        </div>
    `
}

export async function releaseScript () {
    //Album mới
    initHorizontalScroll('#albums-new', 600);
    const newAlbList = document.querySelector('.new-albums');
    const albumsRess = await instance.get(`explore/albums`);
    console.log(albumsRess.data.items);
    newAlbList.innerHTML = albumsRess.data.items.map((item) => {
        return `
            <a class="item" href="/albums/details/${item.slug}" data-navigo>
                <img src="${item.thumb}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.name}</h3>
                <h3 class="alb-artists">${item.albumType}</h3>
            </a>
        `
    }).join('');

    // video nhạc mới
    initHorizontalScroll("#videos", 600);
    const videosList = document.querySelector('.videos-list');
    const videosData = await instance.get(`/explore/videos`);
    console.log(videosData.data.items);
    videosList.innerHTML = videosData.data.items.map((item) =>{
        return `
            <a class="item" style="width: 340px" href="/videos/details/${item.slug}">
                <i class="fa-solid fa-circle-play"></i>
                <img src="${item.thumb}" alt="alb-thumbnail" class="alb-thumbnail" style="width: 100%"/>
                <h3 class="alb-name">${item.name}</h3>
                <h3 class="alb-artists">${item.views} Lượt xem</h3>
            </a>
        `
    }).join('');

}