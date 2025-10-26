export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 3,
    deliveryOptionId : '1'
}, {
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
}];

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


// Ensure elements exist before updating textContent
const cartQuantityElement = document.querySelector('.cart-quantity');

const checkoutQuantityElement = document.querySelector('.js-checkout-quantity');
export function displayCartQuantity() {
    //Total cart quantity
    let totalQuantity = 0;

    //Adding total quantity by taking all quantity from cart array
    cart.forEach((cartQuantity) => {
    totalQuantity += cartQuantity.quantity  //Adding all quantity in total cart quantity
    })


    
    if (cartQuantityElement) {
        cartQuantityElement.textContent = totalQuantity;
    }

    
    if (checkoutQuantityElement) {
        checkoutQuantityElement.textContent = `${totalQuantity} items`;
    }
    saveCart();
}

export function addingToCart(productId, quantity) {
    let matchingItem;

        cart.forEach((cartQuantity) => {
            if(productId === cartQuantity.productId){
             matchingItem = cartQuantity;
            }
        })

        if(matchingItem){
            matchingItem.quantity += quantity
        } else {
            cart.push({
                productId,
                quantity,
                deliveryOptionId : '1'
            })
        }

        saveCart();
        displayCartQuantity();
}

export function updatingCart(productId, quantity) {
    let matchingItem;

        cart.forEach((cartQuantity) => {
            if(productId === cartQuantity.productId){
             matchingItem = cartQuantity;
            }
        })

        if(matchingItem){
            matchingItem.quantity = quantity
        } 

        saveCart();
        displayCartQuantity();
}

//Funtion to delete product
export function deleteFromCart(productId) {

    cart.forEach((cartItem, index) => {
        if(cartItem.productId === productId){
            cart.splice(index, 1)
        }
    })
    saveCart();
    displayCartQuantity();
}


//Update delivery option
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
        matchingItem = cartItem
    }
    });

    matchingItem.deliveryOptionId = deliveryOptionId
    saveCart();
    return matchingItem;
}
