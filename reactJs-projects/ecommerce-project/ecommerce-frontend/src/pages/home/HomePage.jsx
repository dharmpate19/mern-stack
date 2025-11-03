import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './HomePage.css'
import Header from '../../components/header/Header'
import { formatMoney } from '../../utils/money'
import ProductGrid from './ProductGrid'



const HomePage = ({cart}) => {

  const [products, setProducts] = useState([]);
  

  useEffect(() =>{
    axios.get("http://localhost:3000/api/products")
    .then((res) => {
      setProducts(res.data)
    })
    .catch((err) => 
      console.log("Error Fteching the Data: ", err))

    },[])
    
  return (
    <>
    <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />
    <title>Ecommerce Project</title>
    <Header cart={cart}/>
    <div className="home-page">
      <ProductGrid products={products}/>
    </div>
    </>
  )
}

export default HomePage