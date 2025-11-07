import React, { useState } from "react";
import axios from "axios";
import DeliveryOptions from "./DeliveryOptions";
import { formatMoney } from "../../utils/money";

const CartItemDetail = ({
  cartItem,
  deliveryOptions,
  getCartData,
  refreshCartAndPayment,
}) => {
  const [inputTab, setInputTab] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const handleDelete = async () => {
    const userConfirm = confirm("Do you want to delet item form cart");
    if (userConfirm) {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await getCartData();
      await refreshCartAndPayment();
    } else {
      return;
    }
  };

  const handleUpdate = async () => {
    if(inputTab){
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity : Number(quantity)
    })
        await getCartData();
        await refreshCartAndPayment()
        setInputTab(false);
    } else{
        setInputTab(true);
    }
    
  };

  const hanldeQuantityChange = (e) => {
    setQuantity(e.target.value);
  }
  return (
    <>
      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {inputTab ? (
                <input
                  value={quantity}
                  onChange={hanldeQuantityChange}
                  type="number"
                  className="quantity-lable"
                />
              ) : (
                ""
              )}
              <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={handleUpdate}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={handleDelete}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          deliveryOptions={deliveryOptions}
          cartItem={cartItem}
          getCartData={getCartData}
          refreshCartAndPayment={refreshCartAndPayment}
        />
      </div>
    </>
  );
};

export default CartItemDetail;
