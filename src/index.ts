import { Main } from './components/main/main';
import { Routes } from './components/main/controller';
import { exportPath } from './components/main/controller';
import './style.css'

const app = document.getElementById("app");
const mainSection = new Main;
const location = window.location.pathname;

app?.append(mainSection.render());

const rootElement = document.querySelector('.app_main')!;

window.onpopstate = () => {  
  if (location === '/') {
    rootElement.innerHTML = '';
    rootElement?.append(mainSection.render());
  } else {
    rootElement.innerHTML = exportPath(location);
  }
};
window.addEventListener('DOMContentLoaded', () => {
  console.log('onload', location)
  if (location === '/') {
    rootElement.innerHTML = '';
    rootElement.append(mainSection.render());
  } else {
    console.log(Routes)
    rootElement.innerHTML = exportPath(location);
  }
});