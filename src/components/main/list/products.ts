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
      const productCardLink = document.createElement('div');
      const productCard = document.createElement('div');
      productCard.classList.add('card-frame') // product-card

      const id = FETCHED_DATA['products'][i]["id"];

      productCardLink.classList.add('product-card'); // card-frame
      productCard.dataset.category = `${FETCHED_DATA['products'][i]['category']}`;
      productCard.dataset.brand = `${FETCHED_DATA['products'][i]['brand']}`;
      
      const productRoute = new Route(`/${id}`);
      const productTitle = document.createElement('p');
      productTitle.innerText = FETCHED_DATA['products'][i]["title"];
      
      const productCardPanel = document.createElement('div');
      productCardPanel.classList.add('card_panel');
      const productCPPrice = document.createElement('div');
      const productCPButton = document.createElement('button');
      productCPPrice.innerHTML = `€${FETCHED_DATA['products'][i]['price']}`;
      productCPButton.innerHTML = 'ADD';
      productCardPanel.append(productCPPrice);
      productCardPanel.append(productCPButton);
      
      productCard.append(productTitle);
      productCardLink.append(productCardPanel);

      productCard.setAttribute('style',
        `
        background-image: url(${FETCHED_DATA['products'][i]["thumbnail"]});
        background-size: cover;
        background-repeat: no-repeat;
        `
      );

      const replaceWith = new DescriptionBlock(id);
      routesAndContent[`/${id}`] = replaceWith;
      productCard.onclick = ():void => {
        //e.preventDefault();
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