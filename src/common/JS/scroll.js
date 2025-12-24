
export function initHorizontalScroll(parentSelector, scrollStep = 600) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const list = parent.querySelector(".scrollbar-list");
    const btnLeft = parent.querySelector(".fa-angle-left");
    const btnRight = parent.querySelector(".fa-angle-right");

    if (!list || !btnLeft || !btnRight) return;

    btnLeft.style.opacity = "0.3";
    btnLeft.style.pointerEvents = "none";

    btnRight.onclick = () => {
        list.scrollBy({ left: scrollStep, behavior: "smooth" });
    };

    btnLeft.onclick = () => {
        list.scrollBy({ left: -scrollStep, behavior: "smooth" });
    };

    list.onscroll = () => {
        const isAtStart = list.scrollLeft <= 0;
        const isAtEnd = list.scrollLeft + list.offsetWidth >= list.scrollWidth - 1;

        btnLeft.style.opacity = isAtStart ? "0.3" : "1";
        btnLeft.style.pointerEvents = isAtStart ? "none" : "auto";

        btnRight.style.opacity = isAtEnd ? "0.3" : "1";
        btnRight.style.pointerEvents = isAtEnd ? "none" : "auto";
    };
}