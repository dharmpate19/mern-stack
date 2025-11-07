import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const CheckoutPage = ({ cart, getCartData }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  const getCheckoutData = async () => {
    const res = await axios.get(
      "/api/delivery-options?expand=estimatedDeliveryTime"
    );
    setDeliveryOptions(res.data);
  };

  useEffect(() => {
    getCheckoutData();
  }, []);

  const refreshCartAndPayment = async () => {
    //Fetch Payment summary from the Backend API
    const res = await axios.get("/api/payment-summary");
    setPaymentSummary(res.data);
  };
  useEffect(() => {
    refreshCartAndPayment();
  }, [cart]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            getCartData={getCartData}
            refreshCartAndPayment={refreshCartAndPayment}
          />

          {paymentSummary && (
            <>
              <PaymentSummary
                paymentSummary={paymentSummary}
                getCartData={getCartData}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
