import React from 'react'
import dayjs from 'dayjs';
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
                    const handleDelete = async () => {
                      const userConfirm = confirm('Do you want to delet item form cart');
                      if(userConfirm){
                        await axios.delete(`/api/cart-items/${cartItem.productId}`);
                        await getCartData();
                      } else{
                        return
                      }
                    }

                    const handleUpdate = async() => {

                    }
                    return (
                      <div key={cartItem.id} className="cart-item-container">
                        <div className="delivery-date">
                          Delivery date:{" "}
                          {dayjs(
                            selectedDeliveryOption.estimatedDeliveryTimeMs
                          ).format("dddd, MMMM, D")}
                        </div>
    
                        <div className="cart-item-details-grid">
                          <img
                            className="product-image"
                            src={cartItem.product.image}
                          />
    
                          <div className="cart-item-details">
                            <div className="product-name">
                              {cartItem.product.name}
                            </div>
                            <div className="product-price">
                              {formatMoney(cartItem.product.priceCents)}
                            </div>
                            <div className="product-quantity">
                              <span>
                                Quantity:{" "}
                                <span className="quantity-label">
                                  {cartItem.quantity}
                                </span>
                              </span>
                              <span className="update-quantity-link link-primary" onClick={handleUpdate}>
                                Update
                              </span>
                              <span className="delete-quantity-link link-primary" onClick={handleDelete}>
                                Delete
                              </span>
                            </div>
                          </div>
    
                          <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} getCartData={getCartData} refreshCartAndPayment={refreshCartAndPayment}/>
                        </div>
                      </div>
                    );
                  })}
              </div>
  )
}

export default OrderSummary