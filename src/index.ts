import { Main } from './components/main/main';
import { routesAndContent } from './components/main/list/products';
import { exportPath } from './components/main/controller';
import { BadGetAway } from './components/404';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import './style.css'

const app = document.getElementById("app");
const header = new Header;
const mainSection = new Main;
const footer = new Footer;

app?.append(header.render());
app?.append(mainSection.render());
app?.append(footer.render());

const footerElement = document.querySelector('.footer');
const productRoutes = Object.keys(routesAndContent);

window.onpopstate = () => { 
  const location = window.location.pathname;
  document.querySelector('.app_main')!.remove();
  if (location === '/') {
    app?.insertBefore(mainSection.render(), footerElement);
  } else if (productRoutes.includes(location)) {
    app?.insertBefore(exportPath(location), footerElement);
  } else {
    app?.insertBefore(BadGetAway.render(), footerElement);
  }
};
window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname;
  document.querySelector('.app_main')!.remove();
  if (location === '/') {
    app?.insertBefore(mainSection.render(), footerElement);
  } else if (productRoutes.includes(location)) {
    app?.insertBefore(exportPath(location), footerElement);
  } else {
    app?.insertBefore(BadGetAway.render(), footerElement);
  }
});