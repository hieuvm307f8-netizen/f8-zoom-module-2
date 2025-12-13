import Navigo from "navigo";
import Home from "./Pages/Home/home";
import explore from "./Pages/Explore/explore";
import premium from "./Pages/Premium/premium";
import library from "./Pages/Libpage/library";

export const app = document.querySelector('#app');

const route = new Navigo('/');
route.on('/home', Home)
route.on('/explore', explore);
route.on('/premium', premium);
route.on('/library', library);
route.resolve();