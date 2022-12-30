import { Route } from '../../router/route';
import { FETCHED_DATA } from "../../data/data";
import { DescriptionBlock } from '../description/description';

const allProducts = Object.keys(FETCHED_DATA["products"]);

export class ProductsList {

  constructor() {
  }

  render(): HTMLDivElement {
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
      productCardLink.setAttribute('href', `/${id}`)
      productCardLink.onclick = (e):void => {
        e.preventDefault();
        productRoute.createRoute();
        const replaceWith = new DescriptionBlock(id);
        const root = document.querySelector('.app_main') as Element;
        root.innerHTML = replaceWith.render().innerHTML;
      }

      productCard.append(productCardLink);
      productsContainer.append(productCard);
    }

    return productsContainer;
  }
}