import React from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import { formatMoney } from '../../utils/money';

const PaymentSummary = ({paymentSummary, getCartData}) => {
  const navigate = useNavigate();

  const createOrder= async() => {
    await axios.post('/api/orders');
    await getCartData();
    navigate('/orders');
  }
  return (
    <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div data-testId="payment-summary-product-cost" className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div data-testId="payment-summary-shipping-cost" className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.shippingCostCents)}
              </div>
            </div>

            <div data-testId="payment-summary-total-before-tax" className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
              </div>
            </div>

            <div data-testId="payment-summary-tax"  className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div data-testId="payment-summary-total" className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button data-testId="place-order-button" className="place-order-button button-primary" onClick={createOrder}>
              Place your order
            </button>
          </div>
  )
}

export default PaymentSummary