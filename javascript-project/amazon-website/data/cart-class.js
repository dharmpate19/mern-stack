class Cart {
    cartItem = JSON.parse(localStorage.getItem('cart-class')) || [
        {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 3,
        deliveryOptionId : '1'
    }, {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionId : '2'
    }];

    saveCart() {
        localStorage.setItem('cart-class', JSON.stringify(this.cartItem))
    }

    // Ensure elements exist before updating textContent
    cartQuantityElement = document.querySelector('.cart-quantity');

    checkoutQuantityElement = document.querySelector('.js-checkout-quantity');

    displayCartQuantity() {
        //Total cart quantity
        let totalQuantity = 0;
    
        //Adding total quantity by taking all quantity from cart array
        this.cartItem.forEach((cartQuantity) => {
        totalQuantity += cartQuantity.quantity  //Adding all quantity in total cart quantity
        })
    
    
        
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
        }
    
        
        if (checkoutQuantityElement) {
            checkoutQuantityElement.textContent = `${totalQuantity} items`;
        }
        this.saveCart();
    }

    addingToCart(productId, quantity) {
        let matchingItem;
    
            this.cartItem.forEach((cartQuantity) => {
                if(productId === cartQuantity.productId){
                 matchingItem = cartQuantity;
                }
            })
    
            if(matchingItem){
                matchingItem.quantity += quantity
            } else {
                this.cartItem.push({
                    productId,
                    quantity,
                    deliveryOptionId : '1'
                })
            }
    
            this.saveCart();
            this.displayCartQuantity();
    }

    updatingCart(productId, quantity) {
        let matchingItem;
    
            this.cartItem.forEach((cartQuantity) => {
                if(productId === cartQuantity.productId){
                 matchingItem = cartQuantity;
                }
            })
    
            if(matchingItem){
                matchingItem.quantity = quantity
            } 
    
            this.saveCart();
            this.displayCartQuantity();
    }

    //Funtion to delete product
    deleteFromCart(productId) {

        this.cartItem.forEach((cartItem, index) => {
            if(cartItem.productId === productId){
                this.cartItem.splice(index, 1)
            }
        })
        this.saveCart();
        this.displayCartQuantity();
    }

    //Update delivery option
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItem.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem
        }
        });

        matchingItem.deliveryOptionId = deliveryOptionId
        this.saveCart();
        return matchingItem;
    }
}

const cart = new Cart();

















