import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  useEffect(() => {
    const getCheckoutData = async () => {  
    let res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(res.data);
    
    //Fetch Payment summary from the Backend API
     res = await axios.get("/api/payment-summary")
      setPaymentSummary(res.data);
    }
    getCheckoutData();
  }, []);
  console.log("Payment Summary:", paymentSummary);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
         <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />


          {paymentSummary && (
            <>
          <PaymentSummary paymentSummary={paymentSummary} />
          </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
