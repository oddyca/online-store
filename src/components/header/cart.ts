import { FETCHED_DATA } from "../data/data";
import { Summary } from './summary'

export interface Products {
    id: number;
    amount: number;
}

export class ShoppingCart {
    totalAmount: number
    productsList: Products[]
    totalSum: number
    constructor() {
        this.productsList = JSON.parse(localStorage.getItem('cart') || '[]');
        this.totalAmount = this.productsList.reduce((sum, current) => sum + current.amount, 0);
        this.totalSum = this.productsList.reduce((sum, current) => sum + FETCHED_DATA["products"][current.id - 1]["price"], 0);
        
    }
    render() {
        const cartWrapper = document.createElement('div');
        cartWrapper.classList.add('app_main')
        const cart = document.createElement('div');
        cart.classList.add('shopping-cart');
        if(this.productsList.length === 0) cart.innerText = 'Cart is empty';
        const products = document.createElement('div');
        products.classList.add('shop-items');
        cart.appendChild(products);

        for (let i = 0; i < this.productsList.length; i++) {
            const id = this.productsList[i]["id"];
            let amount = this.productsList[i]["amount"];
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
                    this.totalAmount -=1;
                    this.totalSum -= FETCHED_DATA["products"][id - 1]["price"];
                    const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                    const sumIcon = document.querySelector('.header_total-price') as HTMLElement;
                    const amountIcon = document.querySelector('.summary-amount') as HTMLElement;
                    const priceIcon = document.querySelector('.summary-price') as HTMLElement;
                    cartIcon.innerText = `${this.totalAmount}`;
                    amountIcon.innerText = `Products: ${this.totalAmount}`;
                    sumIcon.innerText = `€${this.totalSum}.00`;
                    priceIcon.innerText = `Total: €${this.totalSum}`;
                if(amount === 0){
                        this.productsList.splice(i, 1);
                        localStorage.setItem('cart', JSON.stringify(this.productsList));
                        cartItem.remove();
                } if (this.totalAmount === 0) {
                        summary.remove();
                        cart.innerText = 'Cart is empty';
                } else {
                        this.productsList[i].amount -= 1;
                        localStorage.setItem('cart', JSON.stringify(this.productsList));
                        quantity.innerText = `${amount}`;
                        price.innerText = `€${FETCHED_DATA["products"][id - 1]["price"] * amount}`;
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
                    this.totalAmount += 1;
                    this.productsList[i].amount += 1;
                    localStorage.setItem('cart', JSON.stringify(this.productsList));
                    this.totalSum += FETCHED_DATA["products"][id - 1]["price"];
                    quantity.innerText = `${amount}`;
                    price.innerText = `€${FETCHED_DATA["products"][id - 1]["price"] * amount}`;
                    const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                    const sumIcon = document.querySelector('.header_total-price') as HTMLElement;
                    const amountIcon = document.querySelector('.summary-amount') as HTMLElement;
                    const priceIcon = document.querySelector('.summary-price') as HTMLElement;
                    cartIcon.innerText = `${this.totalAmount}`;
                    amountIcon.innerText = `Products: ${this.totalAmount}`;
                    sumIcon.innerText = `€${this.totalSum}.00`;
                    priceIcon.innerText = `Total: €${this.totalSum}`;
                }
            })
            changeAmount.appendChild(buttonPlus);

            const price = document.createElement('div');
            price.innerText = `€${FETCHED_DATA["products"][id - 1]["price"] * amount}`;
            numbers.appendChild(price);
        }
        const summary = new Summary;
        if(this.totalAmount !== 0) cart.appendChild(summary.render())

        cartWrapper.append(cart)
        return cartWrapper
    }
}