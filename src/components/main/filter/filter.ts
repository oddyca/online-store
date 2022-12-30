import { FETCHED_DATA } from "../../data/data";

interface ProductsFilter { // interface (object) for counting all instances of each found category
  [cat: string]: number
}
// !!!
// TODO: refactor code according to DRY
// !!!
// CATEGORIES BLOCK

let countCategories: ProductsFilter = {} // create an object of type 'ProductsFilter' interface
const allCategories: string[] = [];

for (let i = 0; i < FETCHED_DATA["products"].length; i++) { // push a name of a category of each product found in the DB
  allCategories.push(FETCHED_DATA["products"][i]["category"])
}

for (let category of allCategories) {
  countCategories[category] = allCategories.filter(x => x === category).length; // add to the above object properties with keys = category name and value = times each category is found
}

const categoriesSet = new Set(Object.keys(countCategories)); // create a set out of all categories

export class CategoriesBlock {
  categories: string[]
  constructor() {
    this.categories = [...categoriesSet];
  }

  render(): HTMLDivElement {
    const categoriesBlock = document.createElement('div');
    categoriesBlock.classList.add('filter_option');
    const categoriesWrapper = document.createElement('form');
    categoriesWrapper.classList.add('filter_option-list');
    const categoriesHeader = document.createElement('div');
    categoriesHeader.classList.add('filter_option-header');
    categoriesHeader.innerText = 'Category';
    categoriesBlock.append(categoriesHeader);
    categoriesBlock.append(categoriesWrapper);
    for (let i = 0; i < this.categories.length; i++) {
      const checkBoxLabel = document.createElement('label');
      const checkBox = document.createElement('input');
      const checkBoxWrapper = document.createElement('div');
      const categoryCount = document.createElement('span');

      checkBoxWrapper.classList.add('filter_option-wrapepr');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('name', 'category');
      checkBoxLabel.innerText = `${this.categories[i]}`;
      categoryCount.innerText = `${countCategories[this.categories[i]]}`;
      categoryCount.classList.add('filter_option_count')
      
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(checkBoxLabel);
      checkBoxWrapper.append(categoryCount);
      categoriesWrapper.append(checkBoxWrapper);
    }

    return categoriesBlock;
  }
}

// BRANDS BLOCK

let countBrands: ProductsFilter = {}
const allBrands: string[] = [];

for (let i = 0; i < FETCHED_DATA["products"].length; i++) {
  allBrands.push(FETCHED_DATA["products"][i]["brand"])
}

for (let brand of allBrands) {
  countBrands[brand] = allBrands.filter(x => x === brand).length;
}

const brandsSet = new Set(Object.keys(countBrands));

export class BrandsBlock {
  brands: string[]
  constructor() {
    this.brands = [...brandsSet];
  }

  render(): HTMLDivElement {
    const brandsBlock = document.createElement('div');
    brandsBlock.classList.add('filter_option');
    const brandsWrapper = document.createElement('form');
    brandsWrapper.classList.add('filter_option-list');
    const brandsHeader = document.createElement('div');
    brandsHeader.classList.add('filter_option-header');
    brandsHeader.innerText = 'Brand';
    brandsBlock.append(brandsHeader);
    brandsBlock.append(brandsWrapper);
    for (let i = 0; i < this.brands.length; i++) {
      const checkBoxLabel = document.createElement('label');
      const checkBox = document.createElement('input');
      const checkBoxWrapper = document.createElement('div');
      const brandCount = document.createElement('span');

      checkBoxWrapper.classList.add('filter_option-wrapepr');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('name', 'category');
      checkBoxLabel.innerText = `${this.brands[i]}`;
      brandCount.innerText = `${countBrands[this.brands[i]]}`;
      brandCount.classList.add('filter_option_count')
      
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(checkBoxLabel);
      checkBoxWrapper.append(brandCount);
      brandsWrapper.append(checkBoxWrapper);
    }

    return brandsBlock;
  }
}