import { Products } from './cart';
import { FETCHED_DATA } from '../data/data';

const promo = ['DMT8', 'A1024'];

export class Summary {
    array: Products[]
    totalSum: number
    totalAmount: number
    constructor() {
        this.array = JSON.parse(localStorage.getItem('cart') || '[]');
        this.totalSum = this.array.reduce((sum, current) => sum + FETCHED_DATA["products"][current.id - 1]["price"] * current.amount, 0);
        this.totalAmount = this.array.reduce((sum, current) => sum + current.amount, 0);
    }
    render() {
        const cart = document.createElement('div');
        cart.classList.add('summary');
        const title = document.createElement('h2');
        title.innerText = 'Summary';
        cart.appendChild(title);
        const amount = document.createElement('div');
        amount.classList.add('summary-amount');
        amount.innerText = `Products: ${this.totalAmount}`;
        cart.appendChild(amount);
        const price = document.createElement('div');
        price.innerText = `Total: €${this.totalSum}`;
        price.classList.add('summary-price');
        cart.appendChild(price);
        const input = document.createElement('input');
        cart.appendChild(input);
        const test = document.createElement('div');
        test.innerText = `Test: ${[...promo]}`;
        cart.appendChild(test);
        const button = document.createElement('button');
        button.innerText = `Buy now`;
        cart.appendChild(button);

        return cart
    }
    remove() {
        const cart = document.querySelector('.summary');
        cart?.remove()
    }
}