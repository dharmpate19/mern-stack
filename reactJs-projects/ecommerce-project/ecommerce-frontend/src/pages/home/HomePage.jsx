import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import axios from 'axios'
import './HomePage.css'
import Header from '../../components/header/Header'
import { formatMoney } from '../../utils/money'
import ProductGrid from './ProductGrid'



const HomePage = ({cart, getCartData}) => {

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [products, setProducts] = useState([]);
  

  useEffect(() =>{

    const getHomeData = async () =>{

      const urlPath =  searchText ? `/api/products?search=${searchText}` : `/api/products`
      const res = await axios.get(urlPath)
      setProducts(res.data)
    }
    getHomeData()

    },[searchText])
    
  return (
    <>
    <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />
    <title>Ecommerce Project</title>
    <Header cart={cart}/>
    <div className="home-page">
      <ProductGrid products={products}  getCartData={getCartData}/>
    </div>
    </>
  )
}

export default HomePage