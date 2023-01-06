import "./description.css";
import { FETCHED_DATA } from "../../data/data";

const specifications: string[] = ["Description", "Discount Percentage", "Rating", "Stock", "Brand", "Category"];

export class DescriptionBlock {
    title: string
    description: (string | number | string[])[] 
    price: number
    thumbnail: string
    images: string[]
    constructor(index: number) {
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
        //this.changeImage();
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

        return description;
    }
    /*changeImage(): void {
        const image = document.querySelectorAll('.img-item') as NodeListOf<HTMLImageElement>;
        const thumbnail = document.querySelector('.thumbnail') as HTMLImageElement;
        for(let i = 0; i < image.length; i++){
            image[i].addEventListener('click', () => {
                thumbnail.src = image[i].src;
            })
        }
    }*/

}
