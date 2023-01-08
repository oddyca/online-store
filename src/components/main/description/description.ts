import "./description.css";
import { FETCHED_DATA } from "../../data/data";
import { Products } from "../../header/cart";

const specifications: string[] = ["Description", "Discount Percentage", "Rating", "Stock", "Brand", "Category"];


export class DescriptionBlock {
    title: string
    description: (string | number | string[])[] 
    price: number
    thumbnail: string
    images: string[]
    id: number
    constructor(index: number) {
        this.id = index;
        this.title = FETCHED_DATA["products"][index - 1]["title"];
        this.description = Object.values(FETCHED_DATA["products"][index - 1]).slice(2, 9);
        this.description.splice(1, 1);
        this.price = FETCHED_DATA["products"][index - 1]["price"];
        this.thumbnail = FETCHED_DATA["products"][index - 1]["thumbnail"];
        this.images = FETCHED_DATA["products"][index - 1]["images"];
    }
    render(): HTMLDivElement {
        const description = document.createElement('div');
        const cart = document.createElement('div');
        cart.classList.add('item-cart');
        description.appendChild(cart);
        const title = document.createElement('div');
        title.innerText = `${this.title}`;
        title.classList.add('title');
        cart.appendChild(title);
        const data = document.createElement('div');
        data.classList.add('item-data');
        cart.appendChild(data);
        const images = document.createElement('div');
        images.classList.add('images');
        data.appendChild(images);
        for (let i = 0; i < this.images.length; i++){
            const img = document.createElement('img');
            img.src = this.images[i];
            img.classList.add('img-item');
            img.addEventListener('click', () => thumb.src = img.src)
            images.appendChild(img);
        }
        const thumb = document.createElement('img');
        thumb.src = this.thumbnail;
        thumb.classList.add('thumbnail');
        data.appendChild(thumb);
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
        const column = document.createElement('div');
        column.classList.add('column');
        data.appendChild(column);
        const price = document.createElement('div');
        price.innerText = `€${this.price}`;
        price.classList.add('price');
        column.appendChild(price);
        const buttons = document.createElement('div');
        column.appendChild(buttons);
        
        const button1 = document.createElement('button');
        let arr = JSON.parse(localStorage.getItem('cart') || '[]');
        let isShopButtonClicked = arr.filter((item:Products) => item.id === this.id).length !== 0; 
        button1.innerText = isShopButtonClicked === false ? 'Add to cart' : 'Drop from cart';
        button1.classList.add('card-button');
        buttons.appendChild(button1);
        button1.addEventListener('click', () => {
            arr = JSON.parse(localStorage.getItem('cart') || '[]');             // add product to cart
            if(isShopButtonClicked === false) {
                arr.push({id: this.id, amount: 1});
                isShopButtonClicked = true;
                const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                cartIcon.innerText = `${Number(cartIcon.innerText) + 1}`;
                button1.innerText = 'Drop from cart';
            } else {
                let index = arr.findIndex((item:Products) => item.id === this.id);
                arr.splice(index, 1);
                const cartIcon = document.querySelector('.cart_counter') as HTMLElement;
                cartIcon.innerText = `${Number(cartIcon.innerText) - 1}`;
                button1.innerText = 'Add to cart';
                isShopButtonClicked = false;
            }
            localStorage.setItem('cart', JSON.stringify(arr));
        });

        const button2 = document.createElement('button');
        button2.innerText = 'Buy now';
        buttons.appendChild(button2);

        return description;
    }

}
