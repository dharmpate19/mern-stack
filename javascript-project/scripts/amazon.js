import {addingToCart, displayCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {money} from './utilities/money.js';
import '../data/car.js'

// Variable to store data with html
let productsHTML = ''

//forEach loop to loop through saved products and then pass to the variable
products.forEach((product) => {
productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars" ${product.getRating()}>
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
        <select  class = "js-select-quantity-${product.id}">
            <option selected="" value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        ${product.getImageHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id = "${product.id}">
        Add to Cart
        </button>
    </div>`;
})


//Passing stored data to html container product grid
document.querySelector('.js-product-grid').innerHTML = productsHTML;

let timeoutId = {};
function displayAddedMessage(productId){
    
    const displayMessage = document.querySelector(`.added-to-cart-${productId}`);
        
    if(!displayMessage.classList.contains('js-added-to-cart')){
            displayMessage.classList.add('js-added-to-cart')
    } 
    
    if(timeoutId[productId]){
    clearTimeout(timeoutId[productId])
    }
    
    timeoutId[productId] = setTimeout(() => {
            displayMessage.classList.remove('js-added-to-cart')
        }, 2000)
}


//When click Add to cart button
document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton, index) => {
    addToCartButton.addEventListener('click',() => {
        
        const {productId} =  addToCartButton.dataset;
        const quantity = Number(document.querySelector(`.js-select-quantity-${productId}`).value);
        
        addingToCart(productId, quantity)


        displayCartQuantity()

        displayAddedMessage(productId)
    })
})

displayCartQuantity()

