import React, {Fragment} from 'react'

const OrderList = ({orderConfirm}) => {

    return (
        <Fragment>
        <div className="alert alert-success" role="alert" style={{width:"90%"}}>
            <b>
           {orderConfirm.msg}
           </b>
        </div>
        {orderConfirm.msg && <button className="btn btn-info" >make a new order</button>}
        </Fragment>
    )
}

export default OrderList
