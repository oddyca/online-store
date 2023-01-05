import { Main } from './components/main/main';
import { Routes } from './components/main/controller';
import { exportPath } from './components/main/controller';
import './style.css'

const app = document.getElementById("app");
const mainSection = new Main;

app?.append(mainSection.render());

const rootElement = document.querySelector('.app_main')!;

window.onpopstate = () => { 
  const location = window.location.pathname;
  if (location === '/') {
    console.log('popstate wokrs. Location : /')
    rootElement.innerHTML = '';
    rootElement?.append(mainSection.render());
  } else {
    console.log('popstate wokrs. Location : product')
    rootElement.innerHTML = '';
    rootElement.append(exportPath(location))
  }
};
window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname;
  console.log('onload', location)
  if (location === '/') {
    rootElement.innerHTML = '';
    rootElement.append(mainSection.render());
  } else {
    console.log(Routes)
    rootElement.innerHTML = '';
    rootElement.append(exportPath(location));
  }
});