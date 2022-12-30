import { FETCHED_DATA } from "../../data/data";

const CATEGORIES: string[] = []; // array of strings representing all found categories in the DB

interface ProductsFilter { // interface (object) for counting all instances of each found category
  [cat: string]: number
}

for (let i = 0; i < FETCHED_DATA["products"].length; i++) { // push a name of a category of each product found in the DB
  CATEGORIES.push(FETCHED_DATA["products"][i]["category"])
}

let countCategories: ProductsFilter = {} // create an object of type 'ProductsFilter' interface

for (let category of CATEGORIES) {
  countCategories[category] = CATEGORIES.filter(x => x === category).length; // add to the above object properties with keys = category name and value = times each category is found
}

const categoriesSet = new Set(Object.keys(countCategories)); // create a set out of all categories

export class CategoriesBlock {
  categories: string[]
  constructor() {
    this.categories = [...categoriesSet];
  }

  render(): HTMLDivElement {
    const categoriesBlock = document.createElement('div');
    categoriesBlock.classList.add('filter_categories');
    const categoriesWrapper = document.createElement('form');
    const categoriesHeader = document.createElement('div');
    categoriesHeader.classList.add('filter_categories-header');
    categoriesHeader.innerText = 'Category';
    categoriesBlock.append(categoriesHeader);
    categoriesBlock.append(categoriesWrapper);
    for (let i = 0; i < this.categories.length; i++) {
      const checkBoxLabel = document.createElement('label');
      const checkBox = document.createElement('input');
      const checkBoxWrapper = document.createElement('div');
      const categoryCount = document.createElement('span');

      checkBoxWrapper.classList.add('filter_categories-wrapepr');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('name', 'category');
      checkBoxLabel.innerText = `${this.categories[i]}`;
      categoryCount.innerText = `${countCategories[this.categories[i]]}`;
      categoryCount.classList.add('filter_categories_count')
      
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(checkBoxLabel);
      checkBoxWrapper.append(categoryCount);
      categoriesWrapper.append(checkBoxWrapper);
    }

    return categoriesBlock;
  }
}