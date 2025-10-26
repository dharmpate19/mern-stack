import {cart} from '../../data/cart.js';
import {findMatchigItem, products} from '../../data/products.js';
import {findMatchingDeliveryOption} from '../../data/deliveryOption.js';
import {money} from '../utilities/money.js';

export function paymentSummary(){

    let quantity = 0;
    let totalPriceCents = 0;
    let totalShipping = 0;
    
    
    cart.forEach((cartItem) => {
        let matchingId;
        quantity += cartItem.quantity;
        matchingId = cartItem.productId
        
        let matchingItem = findMatchigItem(cartItem)
        totalPriceCents += matchingItem.priceCents * cartItem.quantity;

        //To store matching delivery otpion
        let matchingDeliveryOption = findMatchingDeliveryOption(cartItem)
        totalShipping += matchingDeliveryOption.priceCents
    })


        const totalBeforeTax = totalPriceCents + totalShipping;
        const estimatedTax = totalBeforeTax * 0.1;
        const total = totalBeforeTax + estimatedTax
    

        const paymentHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${money(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${money(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${money(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${money(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${money(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`

        document.querySelector('.payment-summary').innerHTML = paymentHTML
}