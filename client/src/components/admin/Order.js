import React from 'react'

const Order = ({singleOrder}) => {
    return (
        <div>
            <h3>Order</h3>
        <ul className="list-group">
            
            <li className="list-group-item"><b>Name:</b> {singleOrder.FullName}</li>
            <li className="list-group-item"><b>Address:</b> {singleOrder.Address}</li>
            <li className="list-group-item"><b>Phone:</b> {singleOrder.Phone}</li>
            <li className="list-group-item"><b>Email:</b>{singleOrder.EmailAddress}</li>
                <ul className="list-group">
                    {singleOrder.cartItems.map((item, index)=>{
                        return <li key={index} className="list-group-item" style={{marginLeft:"20px"}}>{item.name} {item.quantity}</li>
                    })}
                </ul>
                <li className="list-group-item"><b>Price:</b> {singleOrder.price}</li>
                <li className="list-group-item"><b>Currency:</b> {singleOrder.currency}</li>

            </ul>
        </div>
    )
}

export default Order

