import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

const library = () => {
  app.innerHTML = `
  ${Header()}
    <main>
      <h1>Thư viện</h1>
    </main>
    ${Sidebar()}
    `;
};
export default library;
