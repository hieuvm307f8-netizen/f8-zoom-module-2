export default function library() {
  return /*html*/ `
    <div class="content padding-content">
      <div class="page-wrapper">
        <div class="library-header">
            <h1 class="library-title">Thư viện</h1>
            <div class="library-filters">
                <button class="filter-chip active">Tất cả</button>
                <button class="filter-chip">Danh sách phát</button>
                <button class="filter-chip">Bài hát</button>
                <button class="filter-chip">Album</button>
                <button class="filter-chip">Nghệ sĩ</button>
            </div>
        </div>

        <div class="library-grid">
            
            <div class="lib-card create-new">
                <div class="lib-card-img-wrapper">
                   <div class="create-icon">
                        <i class="fa-solid fa-plus"></i>
                   </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">Tạo danh sách phát</h3>
                </div>
            </div>

            <div class="lib-card">
                <div class="lib-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop" alt="Liked Songs">
                    <div class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">Bài hát đã thích</h3>
                    <p class="lib-card-desc">Đã ghim • 120 bài hát</p>
                </div>
            </div>

            <div class="lib-card">
                <div class="lib-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop" alt="Chill Vibes">
                    <div class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">Chill Vibes 2024</h3>
                    <p class="lib-card-desc">Danh sách phát • Sơn Tùng</p>
                </div>
            </div>

            <div class="lib-card">
                <div class="lib-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop" alt="Album Art">
                    <div class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">Nhạc Lofi Học Bài</h3>
                    <p class="lib-card-desc">Album • Nhiều nghệ sĩ</p>
                </div>
            </div>

             <div class="lib-card">
                <div class="lib-card-img-wrapper circular">
                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop" alt="Artist">
                    <div class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">The Weeknd</h3>
                    <p class="lib-card-desc">Nghệ sĩ • 5.2M theo dõi</p>
                </div>
            </div>

             <div class="lib-card">
                <div class="lib-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=300&auto=format&fit=crop" alt="EDM">
                    <div class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </div>
                <div class="lib-card-info">
                    <h3 class="lib-card-title">EDM Party</h3>
                    <p class="lib-card-desc">Danh sách phát • Cập nhật hôm qua</p>
                </div>
            </div>

        </div> </div>
    </div>
  `;
}

export function libraryScript() {

}