import React, {useEffect, useContext, Fragment, useState} from 'react'
import Spinner from "../Layout/Spinner.js"
import Cart from "./cart/Cart.js"
import CheckoutForm from "./checkoutForm/CheckoutForm.js"
import Appetizers from "./appetizers/Appetizers.js"
import Salads from "./salads/Salads.js"
import MainDishes from "./mainDishes/MainDishes.js"
import Drinks from "./drinks/Drinks.js"
import FoodsContext from "../../context/foods/FoodsContext.js"


const MainPage = () => {

   const foodsContext = useContext(FoodsContext)
   const { getFoods, loading } = foodsContext

   const[cart, setCart] = useState([])
   const[cartPrice, setCartPrice] = useState(0)
   

    useEffect(()=>{
        getFoods()
        fetchCart()
        // eslint-disable-next-line
    }, [])

    const fetchCart = ()=>{
        fetch("http://localhost:5000/fetchCart", {
            method:"GET",
            headers:{Accept:"Application/json",
            "Content-Type":"Application/json",
            "x-auth-token":localStorage.getItem("token")
            }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            setCart([...data.items])
            setCartPrice(data.price)
        }).catch(error=>{
            console.log(error)
        })
    }

    const updateCart = (cartCopy,e) =>{
        let price1 = e.target.parentElement.firstElementChild.lastChild.textContent
        cartCopy.push({price:cartPrice + Number(price1)})
        console.log(cartCopy)
       
         fetch("http://localhost:5000/addToCart" , {
                method:"POST",
                body:JSON.stringify(cartCopy),
                headers:{
                    Accept:"Application/json",
                    "Content-Type":"Application/json",
                     "x-auth-token":localStorage.getItem("token")
                }
            }).then(res=>{
                return res.json()
            }).then(data=>{
              //console.log(data)
                setCartPrice(data.price)
            }).catch(error=>{
                console.log(error)
            })   
    }
   
    const addToCart=(e)=>{
        console.log(e.target)
        let price = e.target.parentElement.firstElementChild.lastChild.textContent
        let foodName = e.target.parentElement.firstChild.textContent
        let cartCopy = cart
        //let cartPriceCopy = cartPrice
        
            if(cartCopy.length===0){
                cartCopy.push({name:foodName, quantity:1})
                setCart([...cartCopy])
                setCartPrice(cartPrice + Number(price))
                
                updateCart(cartCopy, e)
                return ;
            }

            for(let i=0; i<cartCopy.length; i++){
                if(cartCopy[i].name === foodName){
                     cartCopy[i].quantity++
                     setCart([...cartCopy])
                   setCartPrice(cartPrice + Number(price))
                   //cartCopy.push({price:cartPrice})
                  updateCart(cartCopy,e)
                    return;
                } 
            }
          
            cartCopy.push({name:foodName, quantity:1})
            setCart([...cartCopy]) 
            setCartPrice(cartPrice + Number(price))
            //cartCopy.push({price:cartPrice})
            updateCart(cartCopy,e)
    }

    return (
        
      <div >
        {loading ? <Spinner/>
            :
            <Fragment >
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-md-4 col-lg-4 cart1 min-vh-100">
                    <div style={{position:"sticky", top:"80px"}}>
                    <h4>CART</h4>
                    {cart.length!==0 && <Cart cart={cart} cartPrice={cartPrice} setCart={setCart} setCartPrice={setCartPrice} />}
                    <CheckoutForm cartPrice={cartPrice} cart={cart}/>
                    </div>
                 </div>
              
                <div className="col-md-8 col-lg-8">
                  <h3 style={{marginTop:"50px", textAlign:"center", fontSize:"2.5em", textDecoration:"underline"}}>MENU</h3>

                    <Appetizers addToCart={addToCart} />
                    <Salads addToCart={addToCart} />
                    <MainDishes addToCart={addToCart} />
                    <Drinks addToCart={addToCart} />
                
                </div>
                </div>
              </div>  
                
          </Fragment>
        }
       </div> 
    )
}

export default MainPage

