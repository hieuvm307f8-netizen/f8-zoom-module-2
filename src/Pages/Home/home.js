import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

const Home = () => {
  app.innerHTML = `
    <main>
    <h1>Trang Chủ</h1>
    ${Sidebar()}
    ${Header()}
    </main>
    `;
};
export default Home;
