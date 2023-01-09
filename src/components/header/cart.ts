import { FETCHED_DATA } from "../data/data";
import { Summary } from './summary'

export interface Products {
    id: number;
    amount: number;
}

export class ShoppingCart {
    /*totalAmount: number
    productsList: Products[]
    totalSum: number
    constructor() {
        
        
    }*/
    render() {
        let productsList = JSON.parse(localStorage.getItem('cart') || '[]');
        let totalAmount = productsList.reduce((sum: number, current: any) => sum + current.amount, 0);
        let totalSum = productsList.reduce((sum: number, current: any) => sum + current.price, 0);
        const cartWrapper = document.createElement('div');
        cartWrapper.classList.add('app_main')
        const cart = document.createElement('div');
        cart.classList.add('shopping-cart');
        if(productsList.length === 0) cart.innerText = 'Cart is empty';
        const products = document.createElement('div');
        products.classList.add('shop-items');
        cart.appendChild(products);

        for (let i = 0; i < productsList.length; i++) {
            const id = productsList[i]["id"];
            const productPrice = productsList[i]["price"];
            let amount = productsList[i]["amount"];
            const cartItem = document.createElement('div');
            cartItem.classList.add('shop-item');
            products.appendChild(cartItem);
            const number = document.createElement('div');
            number.classList.add('number');
            number.innerText = `${i + 1}`;
            cartItem.appendChild(number);

            const itemImg = document.createElement('img');
            itemImg.src = FETCHED_DATA["products"][id - 1]["thumbnail"];
            itemImg.classList.add('shop-image');
            cartItem.appendChild(itemImg);

            const itemData = document.createElement('div');
            itemData.classList.add('shop-data');
            cartItem.appendChild(itemData);
            const itemTitle = document.createElement('h2');
            itemTitle.innerText = FETCHED_DATA["products"][id - 1]["title"];
            itemData.appendChild(itemTitle);
            const itemDescription = document.createElement('div');
            itemDescription.innerText = FETCHED_DATA["products"][id - 1]["description"];
            itemData.appendChild(itemDescription);
            const itemRating = document.createElement('div');
            itemRating.innerText = `Rating: ${FETCHED_DATA["products"][id - 1]["rating"]}`;
            itemData.appendChild(itemRating);
            const itemDiscount = document.createElement('div');
            itemDiscount.innerText = `Discount: ${FETCHED_DATA["products"][id - 1]["discountPercentage"]}`;
            itemData.appendChild(itemDiscount);

            const numbers = document.createElement('div');
            numbers.classList.add('shop-numerical-data');
            cartItem.appendChild(numbers);
            const stock = document.createElement('div');
            stock.innerText = `Stock: ${FETCHED_DATA["products"][id - 1]["stock"]}`;
            numbers.appendChild(stock);
            const changeAmount = document.createElement('div');
            changeAmount.classList.add('shop-amount');
            numbers.appendChild(changeAmount);

            const buttonMinus = document.createElement('button');
            buttonMinus.innerText = '-';
            buttonMinus.addEventListener('click', () => {                 //decreasing amount of products
                if(amount > 0){
                    amount -= 1;
                    totalAmount -=1;
                    totalSum -= productPrice;
                    const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                    const sumIcon = document.querySelector('.header_total-price') as HTMLElement;
                    const amountIcon = document.querySelector('.summary-amount') as HTMLElement;
                    const priceIcon = document.querySelector('.summary-price') as HTMLElement;
                    cartIcon.innerText = `${totalAmount}`;
                    amountIcon.innerText = `Products: ${totalAmount}`;
                    sumIcon.innerText = `€${totalSum}.00`;
                    priceIcon.innerText = `Total: €${totalSum}`;
                if(amount === 0){
                        productsList.splice(i, 1);
                        localStorage.setItem('cart', JSON.stringify(productsList));
                        cartItem.remove();
                } else {
                    productsList[i].amount -= 1;
                    localStorage.setItem('cart', JSON.stringify(productsList));
                    quantity.innerText = `${amount}`;
                    price.innerText = `€${productPrice * amount}`;
                } 
                if (totalAmount === 0) {
                        summary.remove();
                        cart.innerText = 'Cart is empty';
                } 
                }
            })
            changeAmount.appendChild(buttonMinus);
            const quantity = document.createElement('div');
            quantity.innerText = `${amount}`;
            changeAmount.appendChild(quantity);
            const buttonPlus = document.createElement('button');
            buttonPlus.innerText = '+';
            buttonPlus.addEventListener('click', () => {                      //increasing amount of product
                if(amount < FETCHED_DATA["products"][id - 1]["stock"]) {
                    amount += 1;
                    totalAmount += 1;
                    productsList[i].amount += 1;
                    localStorage.setItem('cart', JSON.stringify(productsList));
                    totalSum += FETCHED_DATA["products"][id - 1]["price"];
                    quantity.innerText = `${amount}`;
                    price.innerText = `€${productPrice * amount}`;
                    const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                    const sumIcon = document.querySelector('.header_total-price') as HTMLElement;
                    const amountIcon = document.querySelector('.summary-amount') as HTMLElement;
                    const priceIcon = document.querySelector('.summary-price') as HTMLElement;
                    cartIcon.innerText = `${totalAmount}`;
                    amountIcon.innerText = `Products: ${totalAmount}`;
                    sumIcon.innerText = `€${totalSum}.00`;
                    priceIcon.innerText = `Total: €${totalSum}`;
                }
            })
            changeAmount.appendChild(buttonPlus);

            const price = document.createElement('div');
            price.innerText = `€${productPrice * amount}`;
            numbers.appendChild(price);
        }
        const summary = new Summary;
        if(totalAmount !== 0) cart.appendChild(summary.render())

        cartWrapper.append(cart)
        return cartWrapper
    }
}