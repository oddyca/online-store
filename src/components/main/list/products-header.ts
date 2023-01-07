import { FETCHED_DATA } from "../../data/data";
import { Route } from '../../router/route';

const sortingList = ['price', 'rating', 'discount'];
const amount = FETCHED_DATA['products'].length;
const listRoute = new Route(`/list`);
const tableRoute = new Route(`/`);
let isList = false;

export class ProductsHeader {
    amount: number;
    constructor() {
        this.amount = amount;
    }
    render(): HTMLDivElement {
        const header = document.createElement('div');
        header.classList.add('products-header');
        const sort = document.createElement('select');
        header.appendChild(sort); // add sorting list
        for (let i = 0; i < 3; i++) {
            const elementAsc = document.createElement('option');
            elementAsc.innerText = `Sort by ${sortingList[i]} in ascending order`;
            sort.appendChild(elementAsc);
            const elementDesc = document.createElement('option');
            elementDesc.innerText = `Sort by ${sortingList[i]} in descending order`;
            sort.appendChild(elementDesc);
        }
        const count = document.createElement('div'); // add amount of found items
        count.classList.add('products-header_found')
        count.innerText = `Found: ${this.amount}`;
        header.appendChild(count);
        const search = document.createElement('input'); // add search field
        header.appendChild(search);
        const buttons = document.createElement('div');  // add display change buttons
        header.appendChild(buttons);
        const button1 = document.createElement('button'); 
        button1.innerText = 'button 1';
        button1.classList.add('button-list');
        buttons.appendChild(button1);
        button1.addEventListener('click', () => {
            if (isList) this.changeDisplay();
        })
        const button2 = document.createElement('button');
        button2.innerText = 'button 2';
        buttons.appendChild(button2);
        button2.addEventListener('click', () => {
            if (!isList) this.changeDisplay(); 
        })
        return header
    }
    changeDisplay():void {
        const products = document.querySelector('.products-list');     // change display of products
        const itemsArr = document.querySelectorAll('.product-card');
        const buttons = document.querySelectorAll('button');
        if (isList) {
            products?.classList.remove('display-list');
            for (let i = 0; i < itemsArr.length; i++) {
                itemsArr[i].classList.remove('card-list');
            }
            buttons[0].classList.add('button-list');
            buttons[1].classList.remove('button-list');
            tableRoute.createRoute();
            isList = false;
        } else {
            products?.classList.add('display-list');
            for (let i = 0; i < itemsArr.length; i++) {
                itemsArr[i].classList.add('card-list');
            }
            buttons[1].classList.add('button-list');
            buttons[0].classList.remove('button-list');
            listRoute.createRoute();
            isList = true;
        }
    }
}
 
