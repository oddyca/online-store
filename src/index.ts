import { Main } from './components/main/main';
import { routesAndContent } from './components/main/list/products';
import { exportPath, filter } from './components/main/controller';
import { BadGetAway } from './components/404';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ToFilter } from './components/main/filter/filter';
import { QueryController } from './components/main/controller';
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
  const locationQueries = window.location.href
  document.querySelector('.app_main')!.remove();
  if (location === '/') {
    app?.insertBefore(mainSection.render(), footerElement);
  } else if (productRoutes.includes(location)) {
    app?.insertBefore(exportPath(location), footerElement);
  } else {
    app?.insertBefore(BadGetAway.render(), footerElement);
  }

  if (/\?/.test(locationQueries)) {
    let checkedFromQuery: ToFilter ={
      'categories': [],
      'brands': [],
    }
    const filterCheckBoxes = document.querySelectorAll('.filter_option-wrapper');
    filterCheckBoxes.forEach((x) => {
      const rgx = new RegExp((<HTMLInputElement>x.firstChild).id);
      if (rgx.test(locationQueries)) {
        (<HTMLInputElement>x.firstChild).checked = true;
        checkedFromQuery[(<HTMLInputElement>x.firstChild).name].push((<HTMLInputElement>x.firstChild).id);
      }
    });
    filter(checkedFromQuery)
  }
};
window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname;
  const locationQueries = window.location.href
  document.querySelector('.app_main')!.remove();
  if (location === '/') {
    app?.insertBefore(mainSection.render(), footerElement);
  } else if (productRoutes.includes(location)) {
    app?.insertBefore(exportPath(location), footerElement);
  } else {
    app?.insertBefore(BadGetAway.render(), footerElement);
  }

  if (/\?/.test(locationQueries)) {
    let checkedFromQuery: ToFilter ={
      'categories': [],
      'brands': [],
    }
    const filterCheckBoxes = document.querySelectorAll('.filter_option-wrapper');
    filterCheckBoxes.forEach((x) => {
      const rgx = new RegExp((<HTMLInputElement>x.firstChild).id);
      if (rgx.test(locationQueries)) {
        (<HTMLInputElement>x.firstChild).checked = true;
        checkedFromQuery[(<HTMLInputElement>x.firstChild).name].push((<HTMLInputElement>x.firstChild).id);
      }
    });
    filter(checkedFromQuery)
  }
});

// const searchInput = (<HTMLInputElement>document.querySelector('.products-header_search')!)

// searchInput.addEventListener('input', (e) => {
//   const inputData:ToFilter = {}
//   console.log('test')
//   console.log(e)
//   QueryController
// })

// console.log(performance.now())