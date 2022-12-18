import products from "../../../products.json";

const CATEGORIES: string[] = []; // array of strings representing all found categories in the DB

interface allCategories { // interface (object) for counting all instances of each found category
  [cat: string]: number
}

for (let i = 0; i < products["products"].length; i++) { // push a name of a category of each product found in the DB
  CATEGORIES.push(products["products"][i]["category"])
}

let countCategories: allCategories = {} // create an object of type 'allCategories' interface

for (let category of CATEGORIES) {
  countCategories[category] = CATEGORIES.filter(x => x === category).length; // add to the above object properties with keys = category name and value = times each category is found
}

const categoriesSet = new Set(Object.keys(countCategories)); // create a set out of all categories. Set eliminates all repeats

export class CategoriesBlock {
  categories: string[]
  constructor() {
    this.categories = [...categoriesSet];
  }

  render(): HTMLDivElement {
    const elem = document.createElement('div'); 
    for (let i = 0; i < this.categories.length; i++) {
      elem.innerText = `${elem.innerText}, ${this.categories[i]} = ${countCategories[this.categories[i]]}`
    }

    return elem;
  }
}