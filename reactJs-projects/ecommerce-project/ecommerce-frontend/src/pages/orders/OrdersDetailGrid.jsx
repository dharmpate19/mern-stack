import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
import { formatMoney } from "../../utils/money";

const OrdersDetailGrid = ({ order, getCartData }) => {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          try {
            await axios.post("/api/cart-items", {
              productId: orderProduct.product.id,
              quantity: 1,
            });
            await getCartData();
          } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Something went wrong while adding the product to the cart.");
          }
          await getCartData();
        };
        return (
          <Fragment key={`${order.id}-${orderProduct.product.id}`}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>
            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity:  <span className="quantity-label">{orderProduct.quantity}</span>
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img
                  className="buy-again-icon"
                  src="images/icons/buy-again.png"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrdersDetailGrid;
