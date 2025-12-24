
export function initHorizontalScroll(parentSelector, scrollStep = 600) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const list = parent.querySelector(".scrollbar-list");
    const btnLeft = parent.querySelector(".fa-angle-left");
    const btnRight = parent.querySelector(".fa-angle-right");

    if (!list || !btnLeft || !btnRight) return;

    // Thiết lập trạng thái ban đầu cho nút Left
    btnLeft.style.opacity = "0.3";
    btnLeft.style.pointerEvents = "none"; // Khóa click khi chưa cuộn

    // Xử lý Click nút Right
    btnRight.onclick = () => {
        list.scrollBy({ left: scrollStep, behavior: "smooth" });
    };

    // Xử lý Click nút Left
    btnLeft.onclick = () => {
        list.scrollBy({ left: -scrollStep, behavior: "smooth" });
    };

    // Xử lý ẩn/hiện nút khi cuộn
    list.onscroll = () => {
        const isAtStart = list.scrollLeft <= 0;
        // Kiểm tra nếu đã cuộn đến cuối danh sách
        const isAtEnd = list.scrollLeft + list.offsetWidth >= list.scrollWidth - 1;

        // Cập nhật nút Left
        btnLeft.style.opacity = isAtStart ? "0.3" : "1";
        btnLeft.style.pointerEvents = isAtStart ? "none" : "auto";

        // Cập nhật nút Right
        btnRight.style.opacity = isAtEnd ? "0.3" : "1";
        btnRight.style.pointerEvents = isAtEnd ? "none" : "auto";
    };
}