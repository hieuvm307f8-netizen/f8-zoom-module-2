import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

const explore = () => {
  app.innerHTML = `
    <h1>Khám Phá</h1>
      ${Sidebar()}
    ${Header()}
    `;
};
export default explore;
