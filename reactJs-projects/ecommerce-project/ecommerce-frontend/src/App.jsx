import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import HomePage from './pages/home/HomePage'
import {Routes, Route} from 'react-router'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [cart, setCart] = useState([]);
  
  //To get cart Items data
    const getCartData = async () =>{
    const res = await axios.get("/api/cart-items?expand=product")
      setCart(res.data)
    }
  useEffect(() =>{
    getCartData()

    }, [])
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage cart={cart} getCartData={getCartData}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path='/orders' element={<OrdersPage cart={cart}/>}/>
      <Route path='*' element={<NotFoundPage cart={cart}/>}/>
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />

    </Routes>
    </>
  )
}

export default App
