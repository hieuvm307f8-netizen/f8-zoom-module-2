import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";
import '../../style.css';

const explore = () => {
  app.innerHTML = `
    ${Header()}
    <main>
      </main>
    ${Sidebar()}
    `;
};
export default explore;
