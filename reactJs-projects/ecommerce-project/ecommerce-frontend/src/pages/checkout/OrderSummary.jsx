import React, {useState} from 'react'
import dayjs from 'dayjs';
import CartItemDetail from './CartItemDetail';
import axios from 'axios';
import { formatMoney } from '../../utils/money';
import DeliveryOptions from './DeliveryOptions';

const OrderSummary = ({cart, deliveryOptions, getCartData, refreshCartAndPayment}) => {

  return (

        
    <div className="order-summary">
                {deliveryOptions.length > 0 &&
                  cart.map((cartItem) => {
                    const selectedDeliveryOption = deliveryOptions.find(
                      (deliveryOptions) =>
                        deliveryOptions.id === cartItem.deliveryOptionId
                    );
                    
                    return (
                      <div key={cartItem.id} className="cart-item-container">
                        <div className="delivery-date">
                          Delivery date:{" "}
                          {dayjs(
                            selectedDeliveryOption.estimatedDeliveryTimeMs
                          ).format("dddd, MMMM, D")}
                        </div>
    
                        <CartItemDetail cartItem={cartItem} deliveryOptions={deliveryOptions} getCartData={getCartData} refreshCartAndPayment={refreshCartAndPayment}/>
                      </div>
                    );
                  })}
              </div>
  )
}

export default OrderSummary