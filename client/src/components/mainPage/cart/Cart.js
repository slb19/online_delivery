import React from 'react'
//import CheckoutForm from "../checkoutForm/CheckoutForm.js"

const Cart = ({cart, cartPrice}) => {
 
    
    return (
        <div>
            
            
            <div className="cart-border">
            {cart.map((ct, index)=>{
                return <h5 key={index}>{ct.name} : {ct.quantity}</h5>
                        
            })}
            </div>
           {/*<h5>price : {cartPrice}</h5>*/}

            {/*<CheckoutForm cartPrice={cartPrice} cart={cart}/>*/}
        </div>
    )
}

export default Cart
//<button>Checkout</button>
/*
<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Dropdown
                </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button">Action</button>
                    <button class="dropdown-item" type="button">Another action</button>
                    <button class="dropdown-item" type="button">Something else here</button>
            </div>
            </div>
*/