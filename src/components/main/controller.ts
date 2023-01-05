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

for (let i = 0; i < allIDs.length; i++) {
  const id = FETCHED_DATA['products'][i]["id"];
  const descriptions = new DescriptionBlock(id);
  Routes[`/${id}`] = descriptions.render().innerHTML;
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