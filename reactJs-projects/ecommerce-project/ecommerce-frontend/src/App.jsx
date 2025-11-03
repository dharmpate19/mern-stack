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
  
  useEffect(() =>{
    //To get cart Items data
    axios.get("/api/cart-items?expand=product")
    .then((res) => {
      setCart(res.data)
    })
    .catch((err) => 
      console.log("Error Fteching the Data: ", err))
    }, [])
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage cart={cart}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path='/orders' element={<OrdersPage cart={cart}/>}/>
      <Route path='/tracking' element={<TrackingPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </>
  )
}

export default App
