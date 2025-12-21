import Navigo from "navigo";
import home, { homeScript } from "./pages/home";
import explore, { exploreScript } from "./pages/explore";
import library, { libraryScript } from "./pages/library";
import premium, { premiumScript } from "./pages/premium";
import detailMood, { detailMoodScript } from './pages/detail-mood';
import detailPlaylist, { detailPlaylistScript } from "./pages/detail-playlist";
import detailSong, { detailSongScript } from "./pages/song-detail";
import login, { loginScript } from "./pages/login";

export default function  router() {
    const router = new Navigo('/');
    router
    .on("/", () => {
      // Render HTML
      document.querySelector("#main-content").innerHTML = home();
      // Run JS
      homeScript();
    })
    .on("/explore", () => {
      document.querySelector("#main-content").innerHTML = explore();
      exploreScript();
    })
    .on("/library", () => {
      document.querySelector("#main-content").innerHTML = library();
      libraryScript();
    })
    .on("/premium", () => {
      document.querySelector("#main-content").innerHTML = premium();
      premiumScript();
    })
    .on("/login", () => {
      document.querySelector("#main-content").innerHTML = login();
      loginScript();
    })
    .on("/moods/:slug", ({data}) => {
      const slug = data.slug;
      // console.log(slug);
      document.querySelector("#main-content").innerHTML = detailMood(); 
      detailMoodScript(slug);
    })
    .on("/playlists/details/:slug", ({data}) => {
      const slug = data.slug;
      document.querySelector("#main-content").innerHTML = detailPlaylist(); 
      detailPlaylistScript(slug);
    })
    .on("/songs/details/:id", ({data}) => {
      const id = data.id;
      document.querySelector("#main-content").innerHTML = detailSong();
      detailSongScript(id);
      console.log(id);
    })
    router.resolve();
}