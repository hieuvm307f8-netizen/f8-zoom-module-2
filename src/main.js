import defaultLayout from "./Layouts/defaultLayout";
import router from "./router";
import './style.css'

document.querySelector("#app").innerHTML = defaultLayout();
router();