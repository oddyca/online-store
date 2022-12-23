import { ProductsList } from './list/products';
import { CategoriesBlock } from './filter/filter';

export class Main {
  constructor() {

  }

  render() {
    const mainSection = document.createElement('main');
    mainSection.classList.add('app_main')

    // TODO: create filter block that wraps categories, brand, price etc.
    // only categories for now
    const filterBlock = new CategoriesBlock(); 
    const allProducts = new ProductsList();

    mainSection.appendChild(filterBlock.render());
    mainSection.appendChild(allProducts.render());

    return mainSection;
  }
}