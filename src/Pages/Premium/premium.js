import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";
import '../../style.css'

const premium = () => {
  app.innerHTML = `
  ${Header()}
    <main>
        <h1>Nạp vip</h1>
    </main>
    ${Sidebar()}
    `;
};
export default premium;
