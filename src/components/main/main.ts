import { ProductsList } from './list/products';
import { CategoriesBlock } from './filter/filter';
import { ProductsHeader } from './list/products-header';

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
    const products = document.createElement('div');
    products.classList.add('products');
    const sortingList = new ProductsHeader();

    mainSection.appendChild(filterBlock.render());
    mainSection.appendChild(products);
    products.appendChild(sortingList.render());
    products.appendChild(allProducts.render());

    return mainSection;
  }
}