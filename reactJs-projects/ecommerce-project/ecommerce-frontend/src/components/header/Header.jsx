import React, {useState} from 'react'
import {NavLink, useNavigate, useSearchParams} from 'react-router'
import './Header.css'


const Header = ({cart}) => {

  let totalQuantity = 0;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search , setSearch] = useState( searchText || '')

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const hanldeKeySearch = (e) => {
    if(e.key === 'Enter'){
      searchProducts()
    }
  }
  const searchProducts = async() => {
    if(search === '') {
      navigate(`/`)
    } else{
      navigate(`/?search=${search}`)
    }
    
  }


  {cart && cart.forEach((cartItem) =>{
      totalQuantity += cartItem.quantity;
  })}

  return (
    <>
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input onKeyDown={hanldeKeySearch} onChange={handleSearch} className="search-bar" type="text" placeholder="Search" value={search}/>

        <button onClick={searchProducts} className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
    </>
  )
}

export default Header