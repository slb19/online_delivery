import React, {useState, Fragment,useEffect} from 'react'
import OrderList from "./OrderList.js"


const CheckoutForm = ({cartPrice, cart, setCart, setCartPrice}) => {

    const[checkOutForm, setCheckOutForm]=useState({
        FullName:"",
        Address:"",
        Phone:"",
        EmailAddress:"",
        paymentMethod:"Cash",
        currency:"EUR",
        cartItems:null,
        price:0
    });

    const[orderConfirm, setOrderConfirm] = useState({
        msg:null,
        cartItemsOrdered:null
    })

    const[errorMessage, setErrorMessage]= useState({errorMsg:null})
    
    const{currency, price}=checkOutForm;

    useEffect(()=>{
       changeCurrency(currency, cartPrice)
       // eslint-disable-next-line
    },[currency])


    const createOrder = (checkOutForm)=>{
        console.log(checkOutForm)
        fetch("http://localhost:5000/createOrder", {
            method:"POST",
            body:JSON.stringify(checkOutForm),
            headers:{
                Accept:"Application/json",
                "Content-Type":"Application/json"
            }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            if(data.msg){
                setErrorMessage({errorMsg:data.msg})
            }if(data.error){
                setErrorMessage({errorMsg:data.error})
            }
            setOrderConfirm({
                msg:data.msgSuccess,
                cartItemsOrdered:data.cartItemsOrdered
            })
            
        }).catch(error=>{
            console.log(error)
            setErrorMessage({errorMsg:"Network Error Please try later"})
        })
    }

    const onChange=(e)=>{
       setCheckOutForm({...checkOutForm, [e.target.name]:e.target.value, cartItems:cart, price:cartPrice});   
   }

   const onSubmit=(e)=>{
    e.preventDefault();
    createOrder(checkOutForm)
       
}

    const changeCurrency = (currency, cartPrice) =>{
        console.log(currency, cartPrice)
        //const convert = {currency, cartPrice}
        fetch(`http://localhost:5000/changeCurrency/${cartPrice}`,{
            method:"POST",
            body:JSON.stringify({currency}),
            headers:{
                Accept:"Application/json",
            "Content-Type":"Application/json",
            "x-auth-token":localStorage.getItem("token")
            }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            setCheckOutForm({...checkOutForm, price:data.price, currency:data.currency})
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            setErrorMessage({errorMsg:null})
        },3000)
    },[errorMessage.errorMsg])

    return (
       <Fragment>
          
           <h4>Checkout </h4>

           {errorMessage.errorMsg && <div className="alert alert-danger" role="alert">{errorMessage.errorMsg}</div>} 
           
              <form onSubmit={onSubmit}>
              <div className="form-group">
              <label htmlFor="exampleInputEmail1">Full Name</label>
              <input type="text" name="FullName" className="form-control" onChange={onChange} required />
              
              </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Address</label>
                      <input type="text" name="Address" className="form-control" onChange={onChange} required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Phone</label>
                      <input type="text" name="Phone" className="form-control" onChange={onChange} required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input type="email" name="EmailAddress" className="form-control" onChange={onChange} required/>
                  </div>
                  <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" defaultChecked />
                      <label className="form-check-label" htmlFor="gridRadios1">
                      Pay with Cash
                       </label>
                  </div>
                   
                  <select onChange={onChange}  name="currency">
                      <option value="EUR">EUR</option>
                      <option value="USD" >USD</option>
                      <option  value="GBP">GBP</option>
                      <option  value="INR">INR</option>
                  </select>
                <span><button type="submit" className="btn btn-success" style={{marginLeft:"10px"}}>Create Order</button> {!price ? <h5>{cartPrice} {checkOutForm.currency}</h5> : <h5>{price} {checkOutForm.currency}</h5> } </span>
          </form>
          {orderConfirm.cartItemsOrdered && <OrderList orderConfirm={orderConfirm} />}
       </Fragment>

    )
}

export default CheckoutForm


