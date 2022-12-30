import { ProductsList } from './list/products';
import { CategoriesBlock, BrandsBlock } from './filter/filter';
import { ProductsHeader } from './list/products-header';

export class Main {
  constructor() {

  }

  render() {
    const mainSection = document.createElement('main');
    mainSection.classList.add('app_main');
    const filterBlock = document.createElement('div');
    filterBlock.classList.add('app_main_filters')

    // TODO: create filter block that wraps categories, brand, price etc.
    // only categories for now
    const categoriesBlock = new CategoriesBlock();
    const brandsBlock = new BrandsBlock();
    const allProducts = new ProductsList();
    const products = document.createElement('div');
    products.classList.add('products');
    const sortingList = new ProductsHeader();

    filterBlock.appendChild(categoriesBlock.render());
    filterBlock.appendChild(brandsBlock.render());
    mainSection.appendChild(filterBlock);
    mainSection.appendChild(products);
    products.appendChild(sortingList.render());
    products.appendChild(allProducts.render());

    return mainSection;
  }
}