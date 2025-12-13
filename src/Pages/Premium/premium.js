import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import { app } from "../../main";

const premium = () => {
    app.innerHTML = `
    <h1>Nạp vip</h1>
    ${Sidebar()}
    ${Header()}
    `
}
export default premium;