import footer from "../components/footer";
import header from "../components/header";
import sidebar from "../components/sidebar";


export default function defaultLayout() {
  return `
<div>
${header()}
${sidebar()}
    <div>
      <main id="main-content">
      </main>
    </div>
${footer()}
</div>
  `;
}