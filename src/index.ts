import { Main } from './components/main/main';
import './style.css'

const app = document.getElementById("app");
const mainSection = new Main;

app?.append(mainSection.render());