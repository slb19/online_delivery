import React, {useContext} from 'react'
import FoodsContext from "../../../context/foods/FoodsContext.js"


const Appetizers = ({addToCart}) => {

    const foodsContext= useContext(FoodsContext)
    const { foods } = foodsContext

    return (
    <div style={{marginBottom:"10px"}} className="jumbotron" >
        <h4 style={{fontSize:"1.8em", fontStyle:"italic", textDecoration:"underline"}}>Appetizers</h4>
        <div className="card-group">
        {foods.map(food=>{
            if(food.foodType === "Appetizer"){
                
               return <div key={food._id} className="card" style={{marginRight:"3px"}}>
                          
                <img className="card-img-top" src="https://images.assetsdelivery.com/compings_v2/denchik/denchik1403/denchik140300189.jpg" alt="Card image cap"/>
                    <div className="card-body">
                        <p style={{textAlign:"center"}} className="card-title">
                        {food.food} <span>{food.price}</span><span>Euros</span><button onClick={addToCart} style={{marginLeft:"7px"}} className="btn btn-primary">add</button></p>
                        <p className="card-text">{food.description}</p>
                        
                        </div>
                        
                    </div> 
            }
        })}
        </div>
    </div>
    )
}

export default Appetizers
/*
<div style={{marginBottom:"10px"}} className="jumbotron">
<h4 style={{fontSize:"1.4em", fontStyle:"italic"}}>Appetizers</h4>
  {foods.map(food=>{
      if(food.foodType === "Appetizer"){
          return <div key={food._id}>
              <p style={{textAlign:"center"}}>
              {food.food} <span>price:{food.price}</span><span>Euros</span><button onClick={addToCart} style={{marginLeft:"7px"}} className="btn btn-primary">add</button></p>
              <p>{food.description}</p>
          </div>
      }
  })}
</div>
*/