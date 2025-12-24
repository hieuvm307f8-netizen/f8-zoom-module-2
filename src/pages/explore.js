import instance from '../axios';
import { initHorizontalScroll } from './../common/JS/scroll';

export default function explore () {
    return `
        <div>
            <div class="content padding-content">
                <div class="page-wrapper">
                    <section class="options">
                        <a href="" class="option-item">
                            <i class="fa-solid fa-compact-disc"></i>
                            Bản phát hành mới
                        </a>

                        <a href="" class="option-item">
                            <i class="fa-solid fa-ranking-star"></i>
                            Bảng xếp hạng
                        </a>

                        <a href="" class="option-item">
                            <i class="fa-solid fa-face-laugh-beam"></i>
                            Tâm trạng và thể loại
                        </a>
                    </section>

                    <h1 class="title">Khám phá Albums mới</h1>
                    <section class="scroll" id="albums-new">
                        <div class="scroll-header">
                            <i class="fa-solid fa-angle-left"></i>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div class="scrollbar-list new-albums">
                        
                        </div>
                    </section>

                    <h1 class="title">Tâm trạng và thể loại</h1>
                    <section class="scroll" id="meta">
                        <div class="scroll-header">
                            <i class="fa-solid fa-angle-left"></i>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div class="scrollbar-list meta-list">
                            <div class="meta-wrapper__layout">
                            
                            </div>
                        </div>
                    </section>

                    <h1 class="title">Video nhạc</h1>
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
        </div>
    `
};

export async function exploreScript () {
    //Album mới
    initHorizontalScroll('#albums-new', 600);
    const newAlbList = document.querySelector('.new-albums');
    const albumsRess = await instance.get(`explore/albums`);
    console.log(albumsRess.data.items);
    newAlbList.innerHTML = albumsRess.data.items.map((item) => {
        return `
            <div class="item">
                <img src="${item.thumb}" alt="alb-thumbnail" class="alb-thumbnail"/>
                <h3 class="alb-name">${item.name}</h3>
                <h3 class="alb-artists">${item.albumType}</h3>
            </div>
        `
    }).join('');

    //Tâm trạng và thể loại
    initHorizontalScroll("#meta", 600);
    const metaElement = document.querySelector('.meta-wrapper__layout');
    const metaData = await instance.get(`/explore/meta`);
    console.log(metaData.data.categories);
    metaElement.innerHTML = metaData.data.categories.map((item) => {
        return `
            <a class="meta-item" style="border-left-style: solid; border-left-width: 15px; border-left-color: ${item.color};">
                ${item.name}
            </a>
        `
    }).join('')

    // Video nhạc
    initHorizontalScroll("#videos", 600);
    const videosList = document.querySelector('.videos-list');
    const videosData = await instance.get(`/explore/videos`);
    console.log(videosData.data.items);
    videosList.innerHTML = videosData.data.items.map((item) =>{
        return `
            <div class="item" style="width: 340px">
                <i class="fa-solid fa-circle-play"></i>
                <img src="${item.thumb}" alt="alb-thumbnail" class="alb-thumbnail" style="width: 100%"/>
                <h3 class="alb-name">${item.name}</h3>
                <h3 class="alb-artists">${item.views} Lượt xem</h3>
            </div>
        `
    }).join('');
           
}