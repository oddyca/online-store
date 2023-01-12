import { DescriptionBlock } from './description/description';
import { ToFilter } from '../main/filter/filter';
import { ShoppingCart } from '../header/cart';

export let QueryCollection: string[] = [];
export let checkedAttributes: ToFilter = {
  'categories': [],
  'brands': [],
  'search': []
};

export function exportPath(route:string): HTMLDivElement {
  let toRender!: HTMLDivElement;
  if (route.slice(1) !== 'cart') {
    const id:number = parseInt(route.slice(1));
    const description = new DescriptionBlock(id);
    toRender = description.render();
  } else {
    const cart = new ShoppingCart()
    toRender = cart.render();
  }
  return toRender
}

export function filter(allChecked: ToFilter) {
  const renderedProductCards = document.querySelectorAll<HTMLElement>('.card-frame');

  renderedProductCards.forEach((element) => {
    const elementCategory = element.dataset['category'] as string;
    const elementBrand = element.dataset['brand'] as string;
    const elementTitle = element.dataset['title'] as string;;
    const elementPrice = element.dataset['price'] as string;;

    const cLength: number = allChecked.categories.length;
    const bLength: number = allChecked.brands.length;

    element.parentElement!.classList.add('hide');
    

    if (cLength >= 1 && bLength === 0) {
      if (allChecked.categories.includes(elementCategory)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength >= 1 && bLength >= 1) {
      if (allChecked.brands.includes(elementBrand) && allChecked.categories.includes(elementCategory)) {
        element.parentElement!.classList.remove('hide');
      }
    } else if (cLength === 0 && bLength === 0 && (!allChecked.search[0] || allChecked.search[0].length < 3)) {
      element.parentElement!.classList.remove('hide');
    } else {
      element.parentElement!.classList.add('hide')
    }

    if (allChecked.search[0] && allChecked.search[0].length >= 3) {
      if (
        elementCategory.includes(allChecked.search.join('')) || elementBrand.includes(allChecked.search.join('')) || elementTitle.includes(allChecked.search.join('')) || elementPrice.includes(allChecked.search.join(''))
      ) {
        element.parentElement!.classList.remove('hide');
      }
    }
  });
  const foundCounter = document.querySelector('.products-header_found') as HTMLDivElement;
  foundCounter.innerHTML = `Found: ${100 - countFoundItems()}`;
}

export function QueryController(data:ToFilter) {
  const origin = window.location.origin;
  // const path = window.location.pathname
  const filterAttributes = Object.keys(data);
  const url = new URL(origin); // url = https://localhost:8080/

  for (let attr of filterAttributes) {
    // adds search param with the name of "attr" and value of all keys from data[attr] array
    // to url 
    // result -> https://localhost:8080/?categories=smartphones%2laptop ... ("+" = %2B)
    url.searchParams.set(attr, data[attr].join('+'));
    if (data[attr].length === 0) {
      url.searchParams.delete(attr);
    }
  }
  window.history.pushState({}, url.search, window.location.origin + url.search)
}

export function countFoundItems() {
  const renderedProductCards = document.querySelectorAll('.hide');
  return renderedProductCards.length
}