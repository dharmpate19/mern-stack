import {paymentSummary} from './paymentSummary.js';
import {orderSummary} from './orderSummary.js';
import {deleteFromCart} from '../../data/cart.js';
import {updatingCart} from '../../data/cart.js'

export function productQuantitySummary(matchingItem, cartItem) {
const quantityHTML = `    <div class="product-quantity product-quantity-${matchingItem.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary " data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input" type="number">
                  <span class="save-quantity-link link-primary js-quantity-save-link" data-product-id="${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>`;

    return quantityHTML
}




document.querySelectorAll('.js-update-quantity-link').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
        let {productId} = updateButton.dataset;
        let container = document.querySelector(`.product-quantity-${productId}`);
        console.log(productId)
        const saveInput = container.querySelector('.js-quantity-input');
        const quantity = container.querySelector('.quantity-label')
        saveInput.value = Number(quantity.textContent)
        const saveButton = container.querySelector('.js-quantity-save-link');
        

        // if(!saveInput.classList.contains('to-display-input') && !saveInput.classList.contains('to-display-input')){
          saveInput.classList.add('to-display-input');
          saveButton.classList.add('to-display-button');
          updateButton.classList.add('to-not-display');
          quantity.classList.add('to-not-display')
        // }
      })
    })  
        

        document.querySelectorAll('.js-quantity-save-link').forEach((saveButton) => {
          saveButton.addEventListener('click', () =>{
            let {productId} = saveButton.dataset;
            let container = document.querySelector(`.product-quantity-${productId}`);
            const saveInput = container.querySelector('.js-quantity-input');
            const quantity = container.querySelector('.quantity-label')
            // saveInput.value = Number(quantity.textContent);
            const updateButton = container.querySelector('.js-update-quantity-link')

            // if(saveInput.classList.contains('to-display-input') && saveInput.classList.contains('to-display-input')){
              saveInput.classList.remove('to-display-input');
              saveButton.classList.remove('to-display-button');
              updateButton.classList.remove('to-not-display');
              quantity.classList.remove('to-not-display');
  
              
              quantity.textContent = Number(saveInput.value);
              console.log(Number(saveInput.value))
              if(quantity.textContent <= 0){
                deleteFromCart(productId);
                orderSummary();
              }
              updatingCart(productId, Number(quantity.textContent));
              paymentSummary();
            // }
            })
        })