import "./description.css";
import products from "../../../products.json";

const specifications: string[] = ["Description", "Discount Percentage", "Rating", "Stock", "Brand", "Category"];

export class DescriptionBlock {
    title: string
    description: (string | number | string[])[] 
    price: number
    constructor(index: number) {
        this.title = products["products"][index]["title"];
        this.description = Object.values(products["products"][index]).slice(2, 9);
        this.description.splice(1, 1);
        this.price = products["products"][index]["price"];
    }
    render(): HTMLDivElement {
        const cart = document.createElement('div');
        cart.classList.add('item-cart');
        const title = document.createElement('div');
        title.innerText = `${this.title}`;
        cart.appendChild(title);
        const data = document.createElement('div');
        data.classList.add('item-data');
        cart.appendChild(data);
        const info = document.createElement('ul');
        data.appendChild(info);
        for (let i = 0; i < this.description.length; i++) {
           const elName = document.createElement('li'); 
           elName.innerText = `${specifications[i]}:`;
           info.appendChild(elName);
           const el = document.createElement('li'); 
           el.innerText = `${this.description[i]}`;
           info.appendChild(el);
        }
        const price = document.createElement('div');
        price.innerText = `€${this.price}`;
        data.appendChild(price);
        return cart;
    }

}