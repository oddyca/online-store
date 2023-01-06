export class Header {
  render() {
    const headerElement: Element = document.createElement('header');
    headerElement.classList.add('header');

    const logoElement = document.createElement('img');
    logoElement.setAttribute('alt', 'store logo');
    logoElement.setAttribute('src', '') // Image here

    const priceCounter = document.createElement('div'); // IMPORT data from controller?
    priceCounter.classList.add('header_price-counter');

    const cartElement = document.createElement('div'); // IMPORT from cart
    cartElement.classList.add('header_cart');
    
    headerElement.append(logoElement);
    headerElement.append(priceCounter);
    headerElement.append(cartElement);

    return headerElement;
  }
}