import { app } from "../../main";

const Sidebar = () => {
  return `
        <a href="/home" data-navigo>Trang chủ</a> |
        <a href="/explore" data-navigo>Khám phá</a>   |
        <a href="/premium" data-navigo>Premium</a>|
        <a href="/library" data-navigo>Thư viện</a>|
    `;
};
export default Sidebar;
