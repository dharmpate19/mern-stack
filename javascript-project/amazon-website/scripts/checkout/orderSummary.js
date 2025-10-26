import {updatingCart, cart, deleteFromCart, displayCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {findMatchigItem, products} from '../../data/products.js';
import {calculateDeliveryDate, deliveryOptions, findMatchingDeliveryOption} from '../../data/deliveryOption.js';
import {money} from '.././utilities/money.js';
import { paymentSummary } from './paymentSummary.js';
import { productQuantitySummary } from './productQuantitySummary.js';


export function orderSummary(){
//Creating variable to store HTML
let checkOutHTML = '';

//Loop for cart
cart.forEach((cartItem) => {

    //Storing same value in variable
    let matchingItem = findMatchigItem(cartItem);

    
    //To store matching delivery otpion
    let matchingDeliveryOption = findMatchingDeliveryOption(cartItem)

      

      let dateString = calculateDeliveryDate(matchingDeliveryOption);
      

   
    //Storing all HTML in variable
    checkOutHTML += `<div class="cart-item-container cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${money(matchingItem.priceCents)}
                </div>
                ${productQuantitySummary(matchingItem, cartItem)}
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${displayDeliveryOptions(matchingItem, cartItem)}
                  </div>
                </div>
              </div>
            </div>
          </div>`
});


//Displaying cart with html container
document.querySelector('.order-summary').innerHTML = checkOutHTML

//Storing all button in array
document.querySelectorAll('.js-delete-link').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
        let {productId} = deleteButton.dataset;

        deleteFromCart(productId);

        orderSummary();
        paymentSummary();
    })    
})


        

//Loop for delivery options for cart
function displayDeliveryOptions(matchingItem, cartItem) {
  let deliveryHTML = '';
deliveryOptions.forEach((deliveryOption) => {

let dateString = calculateDeliveryDate(deliveryOption)

let priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${deliveryOption.priceCents} -`;

let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

deliveryHTML += `<div class="delivery-option js-delivery-option" data-product-id ="${matchingItem.id}" data-delivery-option-id ="${deliveryOption.id}">
                  <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;
})
return deliveryHTML;
}

//Adding event listener 
document.querySelectorAll('.js-delivery-option').forEach((option) => {
  option.addEventListener('click', () => {

    const {productId, deliveryOptionId} = option.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    orderSummary();
    paymentSummary();
  })
})

displayCartQuantity();
}
orderSummary();