import React, {useState, useRef} from "react";
import { formatMoney } from "../../utils/money";
import axios from 'axios'

const Product = ({product, getCartData}) => {
    const [quantity, setQuantity] = useState(1);

    const classRef = useRef(null)

    const addToCart = async () => {
                    await axios.post('/api/cart-items', {
                      productId : product.id,
                      quantity : quantity
                    });
                    await getCartData();
                    if(classRef.current.classList.contains('added-to-cart'))
                    {
                        classRef.current.style.opacity = '1'
                    } 
                    setTimeout(() => {
                        classRef.current.style.opacity = '0'
                    }, 2000)
                
                  }
    
    const selectQuantity = (e) => {
    setQuantity(Number(e.target.value))
    }
  return (
    <div data-testId="product-container" className="product-container">
      <div className="product-image-container">
        <img data-testId = "product-image" className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testId = "product-rating"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt="rating"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          className="product-quantity-select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" ref={classRef}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button data-testId="add-to-cart-button" className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
