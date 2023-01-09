import { ShoppingCart } from "./cart";
import { Route } from "../router/route";
import { Summary } from "./summary";
import { routesAndContent } from "../main/list/products"

export class Header {
  render() {
    const headerElement: Element = document.createElement('header');
    headerElement.classList.add('header');

    const logoElement = document.createElement('img');
    logoElement.setAttribute('alt', 'store logo');
    logoElement.setAttribute('src', '') // Image here

    const summary = new Summary();
    
    const priceCounter = document.createElement('div'); // IMPORT data from controller?
    priceCounter.classList.add('header_price-counter');
    priceCounter.innerHTML = 'Cart total: '
    const totalPrice = document.createElement('span');
    totalPrice.classList.add('header_total-price');
    totalPrice.innerHTML = `€${summary.totalSum}.00`;
    priceCounter.append(totalPrice);

    const cartElement = document.createElement('div'); // IMPORT from cart
    cartElement.classList.add('header_cart');

    const productRoute = new Route(`/cart`);
    const shopCart = new ShoppingCart();
    routesAndContent['/cart'] = shopCart
    cartElement.addEventListener('click', () => {
      
      productRoute.createRoute();
      const root = document.querySelector('.app_main') as Element;
      root.innerHTML = '';
      root.append(shopCart.render())})
    const cartLogo = document.createElement('img');
    cartLogo.setAttribute('src', require('../../assets/cart.svg'));
    const cartItemCounter = document.createElement('div');
    cartItemCounter.classList.add('cart_counter');
    cartItemCounter.innerHTML = `${summary.totalAmount}`;
    cartElement.append(cartLogo);
    cartElement.append(cartItemCounter);

    headerElement.append(logoElement);
    headerElement.append(priceCounter);
    headerElement.append(cartElement);

    return headerElement;
  }
}