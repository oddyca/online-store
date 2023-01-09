import { Products } from './cart';
import { FETCHED_DATA } from '../data/data';


const promo: {[key: string]: number} = {'DMT8': 10, 'A1024': 5};
let appliedCodes: string[] = [];

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
        const finishPrice = document.createElement('div');
        finishPrice.classList.add('finish-price');
        cart.appendChild(finishPrice);
        const promoBlock = document.createElement('div');
        promoBlock.classList.add('promo-block');
        cart.appendChild(promoBlock);

        const input = document.createElement('input');
        input.placeholder = 'Enter promo code';
        cart.appendChild(input);
        input.addEventListener('input', () => {
            if(Object.keys(promo).includes(input.value)) {
                addPromo.innerText = `${input.value} - ${promo[input.value]}%  `;
                if (!appliedCodes.includes(input.value)){
                    const promoButton = document.createElement('button');
                    promoButton.innerText = 'ADD';
                    addPromo.appendChild(promoButton);
                    promoButton.addEventListener('click', () => {
                        appliedCodes.push(input.value);
                        promoButton.remove();
                        promoBlock.innerHTML = '';
                        promoBlock.appendChild(this.renderPromoBlock())
                })
                }
            
            } else {
                addPromo.innerText = ''
            }
        })

        const addPromo = document.createElement('div');
        addPromo.classList.add('add-promo');
        cart.appendChild(addPromo);

        const test = document.createElement('div');
        test.innerText = `Test: ${Object.keys(promo)}`;
        cart.appendChild(test);
        const button = document.createElement('button');
        button.innerText = `Buy now`;
        cart.appendChild(button);

        return cart
    }
    renderPromoBlock(){
        let discount = 0;
        appliedCodes.forEach(code => discount += promo[code]);
        let finishSum = Math.round(this.totalSum * (1 - discount * 0.01));
        
        const finishSumText = document.querySelector('.finish-price') as HTMLDivElement;
        const priceText = document.querySelector('.summary-price') as HTMLDivElement;
        const addedPromoTitle = document.createElement('div');
        finishSumText.innerText = `Total: €${finishSum}`;
        addedPromoTitle.innerText = 'Applied codes:';
        priceText.style.textDecoration = 'line-through';
        for (let i = 0; i < appliedCodes.length; i++) {
            const addedPromo = document.createElement('div');
            addedPromo.innerText = `${appliedCodes[i]} -${promo[appliedCodes[i]]}%  `;
            addedPromo.classList.add('added-promo');
            addedPromoTitle.appendChild(addedPromo);
            const dropButton = document.createElement('button');
            dropButton.innerText = 'DROP';
            addedPromo.appendChild(dropButton);
            dropButton.addEventListener('click', () => {
                const promoBlock = document.querySelector('.promo-block') as Element;
                appliedCodes.splice(i, 1);
                promoBlock.innerHTML = '';
                finishSumText.innerText = '';
                priceText.style.textDecoration = 'none';
                if (appliedCodes.length !== 0) promoBlock?.appendChild(this.renderPromoBlock())
            })
        }
        return addedPromoTitle
    }
}