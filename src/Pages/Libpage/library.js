import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

const library = () => {
  app.innerHTML = `
    <h1>Thư viện</h1>
      ${Sidebar()}
    ${Header()}
    `;
};
export default library;
