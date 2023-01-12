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
      productCard.classList.add('card-frame')

      const id = FETCHED_DATA['products'][i]["id"];

      productCardLink.classList.add('product-card');
      productCard.dataset.category = `${FETCHED_DATA['products'][i]['category']}`;
      productCard.dataset.brand = `${FETCHED_DATA['products'][i]['brand']}`;
      productCard.dataset.title = `${FETCHED_DATA['products'][i]['title']}`;
      productCard.dataset.price = `${FETCHED_DATA['products'][i]['price']}`;
      
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

      // Full description for list view
      const fullDescription = document.createElement('div');
      fullDescription.classList.add('full-description');
      const fdFirstColumn = document.createElement('div');
      const fdSecondColumn = document.createElement('div');
      fdFirstColumn.classList.add('description-info');
      fdSecondColumn.classList.add('description-info');
      fdFirstColumn.innerHTML = 
      `
      <span style = "font-weight: 900;">Brand:</span>
      <span style = "font-weight: 900;">Category:</span>
      <span style = "font-weight: 900;">In stock:</span>
      <span style = "font-weight: 900;">Rating:</span>
      `;
      fdSecondColumn.innerHTML = 
      `
      <span>${FETCHED_DATA['products'][i]['brand']}</span>
      <span>${FETCHED_DATA['products'][i]['category']}</span>
      <span>${FETCHED_DATA['products'][i]['stock']}</span>
      <span>${FETCHED_DATA['products'][i]['rating']}</span>
      `;
      fullDescription.append(fdFirstColumn);
      fullDescription.append(fdSecondColumn);

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
        productRoute.createRoute();
        const root = document.querySelector('.app_main') as Element;
        root.innerHTML = '';
        root.append(replaceWith.render());
      }

      productCardLink.append(productCard);
      productCardLink.append(fullDescription)
      productsContainer.append(productCardLink);
    }

    return productsContainer;
  }
}