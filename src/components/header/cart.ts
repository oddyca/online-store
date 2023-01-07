import { FETCHED_DATA } from "../data/data";

export interface Products {
    id: number;
    amount: number;
}

export class ShoppingCart {
    render() {
        let productsList: Products[];
        productsList = JSON.parse(localStorage.getItem('cart') || '[]'); 
        const cart = document.createElement('div');
        cart.classList.add('shopping-cart');
        if(productsList.length === 0) cart.innerText = 'Cart is empty';
        const products = document.createElement('div');
        products.classList.add('shop-items');
        cart.appendChild(products);

        for (let i = 0; i < productsList.length; i++) {
            const id = productsList[i]["id"];
            const amount = productsList[i]["amount"];
            console.log(amount)
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
            const itemTitle = document.createElement('div');
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
            changeAmount.appendChild(buttonMinus);
            const quantity = document.createElement('div');
            quantity.innerText = `${amount}`;
            changeAmount.appendChild(quantity);
            const buttonPlus = document.createElement('button');
            buttonPlus.innerText = '+';
            changeAmount.appendChild(buttonPlus);

            const price = document.createElement('div');
            price.innerText = `€${FETCHED_DATA["products"][id - 1]["price"] * amount}`;
            numbers.appendChild(price);
        }
        return cart
    }
}
