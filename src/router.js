import Navigo from "navigo";
import explore, { exploreScript } from "./pages/explore";
import library, { libraryScript } from "./pages/library";
import detailMood, { detailMoodScript } from "./pages/detail-mood";
import detailPlaylist, { detailPlaylistScript } from "./pages/detail-playlist";
import detailSong, { detailSongScript } from "./pages/song-detail";
import login, { loginScript } from "./pages/login";
import register, { registerScript } from "./pages/register";
import defaultLayout from "./Layouts/defaultLayout";
import { headerScript } from "./components/header";
import { footerScript } from "./components/footer";
import detailAlbum, { detailAlbumScript } from "./pages/detail-album";
import detailVideo, { detailVideoScript } from "./pages/detail-video";
import release, { releaseScript } from "./pages/release";
import ranking, { rankingScript } from "./pages/ranking";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import home, { homeScript } from './pages/home';

export default function router() {
  const app = document.querySelector("#app");

  app.innerHTML = defaultLayout();
  headerScript();
  footerScript();
  const router = new Navigo("/");
  router
    .on("/", () => {
      document.querySelector("#main-content").innerHTML = home();
      homeScript();
    })
    .on("/explore", () => {
      document.querySelector("#main-content").innerHTML = explore();
      exploreScript();
    })
    .on("/library", () => {
      const isLogin = !!localStorage.getItem("access_token");
      if (isLogin) {
        document.querySelector("#main-content").innerHTML = library();
        libraryScript();
      } else {
        Toastify({
          text: "Bạn cần đăng nhập để xem Thư viện cá nhân",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" },
        }).showToast();

        setTimeout(() => {
          router.navigate("/login");
        }, 1500);
      }
    })
    .on("/login", () => {
      document.querySelector("#app").innerHTML = login();
      loginScript();
    })
    .on("/register", () => {
      document.querySelector("#app").innerHTML = register();
      registerScript();
    })
    .on("/release", () => {
      document.querySelector("#main-content").innerHTML = release();
      releaseScript();
    })
    .on("/ranking", () => {
      document.querySelector("#main-content").innerHTML = ranking();
      rankingScript();
    })
    .on("/moods/:slug", ({ data }) => {
      const slug = data.slug;
      // console.log(slug);
      document.querySelector("#main-content").innerHTML = detailMood();
      detailMoodScript(slug);
    })
    .on("/playlists/details/:slug", ({ data }) => {
      const slug = data.slug;
      document.querySelector("#main-content").innerHTML = detailPlaylist();
      detailPlaylistScript(slug);
    })
    .on("/songs/details/:id", ({ data }) => {
      const id = data.id;
      document.querySelector("#main-content").innerHTML = detailSong();
      detailSongScript(id);
    })
    .on("/albums/details/:slug", ({ data }) => {
      const slug = data.slug;
      document.querySelector("#main-content").innerHTML = detailAlbum();
      detailAlbumScript(slug);
    })
    .on("/videos/details/:slug", ({ data }) => {
      const slug = data.slug;
      document.querySelector("#main-content").innerHTML = detailVideo();
      detailVideoScript(slug);
    });
  router.resolve();
}
