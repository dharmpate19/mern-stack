import React from 'react'
import './TrackingPage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Header from '../../components/header/Header'
import { Link } from 'react-router'
import dayjs from 'dayjs'

const TrackingPage = () => {
const {orderId, productId} = useParams();
const [order, setOrder] = useState(null);

useEffect(()=> {
  const getOrderData = async() => {
    const res = await axios.get(`/api/orders/${orderId}?expand=products`);
    setOrder(res.data);
  }
  getOrderData()
  },[orderId])

  if(!order) {
    return null
  }

  const orderProduct = order.products.find((orderProduct) => orderProduct.productId === productId);
  console.log(orderProduct);
  console.log(order);
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassesMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercentage = (timePassesMs / totalDeliveryTimeMs) * 0.3;
  if(deliveryPercentage > 100) {
    deliveryPercentage = 100;
  } 

  const isPreparing = deliveryPercentage < 33;
  const isShipped = deliveryPercentage >= 33 && deliveryPercentage < 100;
  const isDelivered = deliveryPercentage === 100;
  return (
    <>
    <link rel="icon" type="image/svg+xml" href="/images/orders-favicon.png" />
    <title>Tracking</title>
    <Header/>
    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          
          {deliveryPercentage > 100 ? 'Delivered On'  : 'Arriving On'} {dayjs(order.orderTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
          {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width: `${deliveryPercentage}%`}}></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TrackingPage