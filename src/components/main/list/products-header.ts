import { FETCHED_DATA } from "../../data/data";

const sortingList = ['price', 'rating', 'discount'];
const amount = FETCHED_DATA['products'].length;

export class ProductsHeader {
    amount: number
    constructor() {
        this.amount = amount; // amount of found items
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
        count.innerText = `Found: ${this.amount}`;
        header.appendChild(count);
        const search = document.createElement('input'); // add search field
        header.appendChild(search);
        const buttons = document.createElement('div');  // add display change buttons
        header.appendChild(buttons);
        const button1 = document.createElement('button'); 
        button1.innerText = 'button 1';
        buttons.appendChild(button1);
        const button2 = document.createElement('button');
        button2.innerText = 'button 2';
        buttons.appendChild(button2);
        return header
    }
}