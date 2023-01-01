import { Route } from '../../router/route';
import { FETCHED_DATA } from "../../data/data";
import { DescriptionBlock } from '../description/description';

const allProducts = Object.keys(FETCHED_DATA["products"]);

interface RoutesObjectContent {
  [path: string]: string
}

export const Routes: RoutesObjectContent = {}

export class ProductsList {

  constructor() {
  }

  render() {
    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products-list')

    for (let i = 0; i < allProducts.length; i++) {
      const productCardLink = document.createElement('a');
      const productCard = document.createElement('div');
      const id = FETCHED_DATA['products'][i]["id"];

      productCard.classList.add('product-card');
      
      const productRoute = new Route(`/${id}`);

      productCard.innerText = FETCHED_DATA['products'][i]["title"];
      productCardLink.innerText = `${id}`;
      productCardLink.setAttribute('href', `/${id}`);

      // const replaceWith = new DescriptionBlock(id); <-- если разкоментить, то в консоли ошибка, ссылающаяся на description.ts

      productCardLink.onclick = (e):void => {
        e.preventDefault();
        productRoute.createRoute();
        const root = document.querySelector('.app_main') as Element;
        const replaceWith = new DescriptionBlock(id);
        root.innerHTML = replaceWith.render().innerHTML;
        Routes[`/${id}`] = replaceWith.render().innerHTML;
      }

      productCard.append(productCardLink);
      productsContainer.append(productCard);
    }

    return productsContainer;
  }
}