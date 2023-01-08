// import { Main } from './main';
// import { FETCHED_DATA } from "../data/data";
import { DescriptionBlock } from './description/description';
import { ToFilter } from '../main/filter/filter'

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
  const id:number = parseInt(route.slice(1));

  const description = new DescriptionBlock(id);
  const descriptionContent = description.render();

  return descriptionContent;
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
  const renderedProductCards = document.querySelectorAll<HTMLElement>('.product-card')
  
  renderedProductCards.forEach((element) => {
    const elementCategory = element.getElementsByTagName('div')[0].dataset['category'] as string;
    const elementBrand = element.getElementsByTagName('div')[0].dataset['brand'] as string;
    const cLength: number = allChecked.categories.length;
    const bLength: number = allChecked.brands.length
    element.classList.add('hide')
    if (cLength >= 1 && bLength === 0) {
      if (allChecked.categories.includes(elementCategory)) {
        element.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand)) {
        element.classList.remove('hide');
      }
    } else if (cLength >= 1 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand) && allChecked.categories.includes(elementCategory)) {
        element.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength === 0) {
      element.classList.remove('hide');
    } else {
      element.classList.add('hide')
    }

  });
}

export function QueryController(data:ToFilter, isChecked?: boolean) {
  const origin = window.location.origin;
  const path = window.location.pathname
  const filterAttributes = Object.keys(data);
  const url = new URL(origin); // url = https://localhost:8080/

  for (let attr of filterAttributes) {
    // adds search param with the name of "attr" and value of all keys from data[attr] array
    // to url 
    // result -> https://localhost:8080/?categories=smartphones%2laptop ... ("+" = %2B)
    url.searchParams.set(attr, data[attr].join('+'));
    if (data[attr].length === 0) {
      url.searchParams.delete(attr);
    }
  }
  
  window.history.replaceState(
    null,
    '',
    url // replace url in address bar with what we created
  );
}

export function countFoundItems() {
  const renderedProductCards = document.querySelectorAll('.hide');
  console.log(renderedProductCards)
  return renderedProductCards.length
}