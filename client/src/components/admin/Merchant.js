import React, {useEffect, useState, Fragment} from 'react'
import Order from "./Order.js"


const Merchant = () => {

    const[orders, setOrders]=useState([])
    const[singleOrder, setSingleOrder]=useState(null)

    useEffect(()=>{
            getAllOrders()   
    },[])
 
    const tableData= () =>{
        return orders.map((order, index)=>{
            const {FullName, Address, Phone, EmailAddress,price ,cartItems}= order
           // const dateCutTime= date.slice(0,10)
            return <tr key={index} className="do-hover"onClick={()=>viewFullOrder(order._id)} style={{cursor:"pointer"}}>
                        <td>{FullName}</td>
                        <td>{Address}</td>
                        <td>{Phone}</td>
                        <td>{EmailAddress}</td>
                        <td>{price}</td>
                    </tr>
        })
    }

    const tableHeader= () =>{
        if(orders[0]!==undefined){
            let header= Object.keys(orders[0])
            console.log(header)
            return header.map((title, index)=>{
               if(index === 0 || index ===1 || index ===6 || index ===8 || index===9){
                    // eslint-disable-next-line 
                   return ;
                }else{
                    return <th key={index}>{title}</th>
                }
                
            })
           }
    }

    const viewFullOrder = (orderId)=>{
        console.log(orderId)
        fetch(`http://localhost:5000/admin/getAllOrders/${orderId}`, {
            method:"GET",
            headers:{
              Accept:"Application/json",
              "Content-Type":"Application/json",
              "x-auth-token":localStorage.getItem("token-auth")
            }
          }).then(res=>{
            return res.json()
          }).then(data=>{
            console.log(data)
            setSingleOrder(data)
          }).catch(error=>{
            console.log(error)
          })
    }
    

    const getAllOrders =()=>{
        fetch("http://localhost:5000/admin/getAllOrders", {
            method:"GET",
            headers:{
              Accept:"Application/json",
              "Content-Type":"Application/json",
              "x-auth-token":localStorage.getItem("token-auth")
            }
          }).then(res=>{
            return res.json()
          }).then(data=>{
            console.log(data)
            setOrders([...data])
          }).catch(error=>{
            console.log(error)
          })
    }

    const backToOrders=()=>{
        setSingleOrder(null)
    }

    return (
        <div className="container">
            {singleOrder ? <Order singleOrder={singleOrder}/>
                            :
                <Fragment>
                  <h4 style={{textAlign:'center'}}>Orders</h4>
                    <table style={{margin:"0 auto"}}>
                        <tbody>
                        <tr>{tableHeader()}</tr>
                    {tableData()}
                </tbody>
            </table>
        </Fragment>
            }
            {singleOrder && <button onClick={backToOrders} className="btn btn-dark" style={{marginTop:"10px"}}>Back</button>}
        </div>
    )
}

export default Merchant
