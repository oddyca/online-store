import { CategoriesBlock } from './components/main/filter/filter';

const app = document.getElementById("app");

const filterBlock = new CategoriesBlock();

app?.appendChild(filterBlock.render());