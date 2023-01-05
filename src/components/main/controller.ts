import { Main } from './main';
import { FETCHED_DATA } from "../data/data";
import { DescriptionBlock } from './description/description';

const mainSection = new Main;
const location = window.location.pathname;
const rootElement = document.querySelector('.app_main') as HTMLElement;
const allIDs = Object.keys(FETCHED_DATA["products"]);


interface RoutesObjectContent {
  [path: string]: string
}

export const Routes: RoutesObjectContent = {}

export function exportPath(route:string): string {
  const id:number = parseInt(route.slice(1));

  const descriptions = new DescriptionBlock(id);
  const routeHTML = descriptions.render().innerHTML;

  return routeHTML;
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