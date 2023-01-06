import { Main } from './components/main/main';
import { routesAndContent } from './components/main/list/products';
import { exportPath } from './components/main/controller';
import { BadGetAway } from './components/404';
import './style.css'

const app = document.getElementById("app");
const mainSection = new Main;

app?.append(mainSection.render());

const rootElement = document.querySelector('.app_main')!;

const productRoutes = Object.keys(routesAndContent);

window.onpopstate = () => { 
  const location = window.location.pathname;
  if (location === '/') {
    rootElement.innerHTML = '';
    rootElement?.append(mainSection.render());
  } else if (productRoutes.includes(location)) {
    rootElement.innerHTML = '';
    rootElement.append(exportPath(location))
  } else {
    rootElement.innerHTML = '';
    rootElement.append(BadGetAway.render());
  }
};
window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname;
  if (location === '/') {
    rootElement.innerHTML = '';
    rootElement.append(mainSection.render());
  } else if (productRoutes.includes(location)) {
    rootElement.innerHTML = '';
    rootElement.append(exportPath(location))
  } else {
    rootElement.innerHTML = '';
    rootElement.append(BadGetAway.render());
  }
});