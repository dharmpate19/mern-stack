import React, {useState} from 'react'
import axios from 'axios'
import { formatMoney } from '../../utils/money';
import Product from './Product';

const ProductGrid = ({ products, getCartData }) => {

  return (
    <div className="products-grid">
            {products.map((product) => {
              

              return (
                <Product key={product.id} product={product} getCartData={getCartData}/>
              )
            })}
          </div>
  )
}

export default ProductGrid