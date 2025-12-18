export function initSidebarToggle() {
  document.addEventListener("click", (e) => {
    const barIcon = e.target.closest(".bars");
    if (!barIcon) return;

    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("toggle");
  });
}
