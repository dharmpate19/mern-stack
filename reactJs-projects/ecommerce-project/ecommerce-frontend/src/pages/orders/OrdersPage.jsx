import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import "./OrdersPage.css";
import Header from "../../components/header/Header";
import { formatMoney } from "../../utils/money";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
      <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
