import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import {Routes, Route} from 'react-router'
import OrdersPage from './pages/OrdersPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path='/orders' element={<OrdersPage/>}/>
    </Routes>
    </>
  )
}

export default App
