import { Route } from '../../router/route';
import { FETCHED_DATA } from "../../data/data";
import { DescriptionBlock } from '../description/description';
import { ShoppingCart } from '../../header/cart'

const allProducts = Object.keys(FETCHED_DATA["products"]);

interface RoutesAndContent {
  [path:string]: DescriptionBlock | ShoppingCart;
}
export const routesAndContent: RoutesAndContent = {}

export class ProductsList {  

  render() {
    const productsContainer = document.createElement('div');
    productsContainer.classList.add('products-list')

    for (let i = 0; i < allProducts.length; i++) {
      const productCardLink = document.createElement('a');
      const productCard = document.createElement('div');
      const id = FETCHED_DATA['products'][i]["id"];

      productCardLink.classList.add('product-card');
      productCard.dataset.category = `${FETCHED_DATA['products'][i]['category']}`;
      productCard.dataset.brand = `${FETCHED_DATA['products'][i]['brand']}`;
      
      const productRoute = new Route(`/${id}`);

      productCard.innerText = FETCHED_DATA['products'][i]["title"];
      productCardLink.setAttribute('href', `/${id}`);
      const replaceWith = new DescriptionBlock(id);

      routesAndContent[`/${id}`] = replaceWith;

      productCardLink.onclick = (e):void => {
        e.preventDefault();
        productRoute.createRoute();
        const root = document.querySelector('.app_main') as Element;
        root.innerHTML = ''
        root.append(replaceWith.render());
      }

      productCardLink.append(productCard);
      productsContainer.append(productCardLink);
    }

    return productsContainer;
  }
}