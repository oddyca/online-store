import { Main } from './components/main/main';
import { Routes } from './components/main/list/products'
import './style.css'

const app = document.getElementById("app");
const mainSection = new Main;

app?.append(mainSection.render());

const rootElement = document.querySelector('.app_main') as HTMLElement;
const rootHTML: string = rootElement.innerHTML;
console.log(window.location.pathname)
window.onpopstate = () => {  
  if (window.location.pathname === '/') {
    rootElement.innerHTML = rootHTML;
  } else {
    rootElement.innerHTML = Routes[window.location.pathname];
  }
};