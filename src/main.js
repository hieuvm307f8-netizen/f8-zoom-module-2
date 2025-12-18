import Navigo from "navigo";
import Home from "./Pages/Home/home";
import explore from "./Pages/Explore/explore";
import premium from "./Pages/Premium/premium";
import library from "./Pages/Libpage/library";
import { initSidebarToggle } from "./utils/ToggleSidebar";
import login from "./Pages/Login/login";
import detailMood from "./Pages/Detail-moods/detail-moods";

export const app = document.querySelector('#app');


initSidebarToggle();

const route = new Navigo('/');
route.on('/', Home)
route.on('/moods/:slug', detailMood)
route.on('/explore', explore);
route.on('/premium', premium);
route.on('/library', library);
route.on('/login', login);
route.resolve();