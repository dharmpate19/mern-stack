import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import HomePage from './pages/home/HomePage'
import {Routes, Route} from 'react-router'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path='/orders' element={<OrdersPage/>}/>
      <Route path='/tracking' element={<TrackingPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    </>
  )
}

export default App
