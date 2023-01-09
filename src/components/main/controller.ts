// import { Main } from './main';
// import { FETCHED_DATA } from "../data/data";
import { DescriptionBlock } from './description/description';
import { ToFilter } from '../main/filter/filter';
import { ShoppingCart } from '../header/cart';

// const mainSection = new Main;
// const location = window.location.pathname;
// const rootElement = document.querySelector('.app_main') as HTMLElement;
// const allIDs = Object.keys(FETCHED_DATA["products"]);


// interface RoutesObjectContent {
//   [path: string]: string
// }

// export const Routes: RoutesObjectContent = {}

export let QueryCollection: string[] = [];

export function exportPath(route:string): HTMLDivElement {
  let toRender!: HTMLDivElement;
  if (route.slice(1) !== 'cart') {
    const id:number = parseInt(route.slice(1));
    const description = new DescriptionBlock(id);
    toRender = description.render();
  } else {
    const cart = new ShoppingCart()
    toRender = cart.render();
  }
  return toRender
}


// export class Controller {
//   static rerender(): void {
//     if (location === '/') {
//       console.log(location)
//       rootElement.innerHTML = '';
//       rootElement.append(mainSection.render());
//     } else {
//       rootElement.innerHTML = Routes[location];
//     }
//   };
  
  // static manualPath() {
  //   if (location === '/') {
  //     rootElement.innerHTML = '';
  //     rootElement.append(mainSection.render());
  //   } else {
  //     rootElement.innerHTML = Routes[location];
  //   }
  // };
// }

export function filter(allChecked: ToFilter) {
  const renderedProductCards = document.querySelectorAll<HTMLElement>('.card-frame')
  
  renderedProductCards.forEach((element) => {
    const elementCategory = element.dataset['category'] as string;
    const elementBrand = element.dataset['brand'] as string;
    const cLength: number = allChecked.categories.length;
    const bLength: number = allChecked.brands.length
    element.parentElement!.classList.add('hide')
    if (cLength >= 1 && bLength === 0) {
      if (allChecked.categories.includes(elementCategory)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength >= 1 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand) && allChecked.categories.includes(elementCategory)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength === 0) {
      element.parentElement!.classList.remove('hide');
    } else {
      element.parentElement!.classList.add('hide')
    }

  });
}

export function QueryController(data:ToFilter) {
  const origin = window.location.origin;
  // const path = window.location.pathname
  const filterAttributes = Object.keys(data);
  const url = new URL(origin); // url = https://localhost:8080/

  for (let attr of filterAttributes) {
    // adds search param with the name of "attr" and value of all keys from data[attr] array
    // to url 
    // result -> https://localhost:8080/?categories=smartphones%2laptop ... ("+" = %2B)
    url.searchParams.set(attr, data[attr].join('+')); // BUT if search we do a different join
    if (data[attr].length === 0) {
      url.searchParams.delete(attr);
    }
  }
  window.history.pushState({}, url.search, window.location.origin + url.search)
}

export function countFoundItems() {
  const renderedProductCards = document.querySelectorAll('.hide');
  return renderedProductCards.length
}