import React , {useReducer} from "react";
import FoodsContext from "./FoodsContext.js";
import FoodsReducer from "./FoodsReducer.js"

import {
    GET_FOODS,
   
} from "../types.js"

const FoodsState= props =>{
    const initialState={
        foods:[],
        loading:true
    }

const [state, dispatch] = useReducer(FoodsReducer, initialState)    

const getFoods=()=>{
    fetch("http://localhost:5000/foods", {
        method:"GET",
        headers:{
            Accept:"Application/json"
        }
    }).then(res=>{
        return res.json()
    }).then(data=>{
        dispatch({
            type:GET_FOODS,
            payload:data
        })
      }).catch(error=>{
            console.log(error)
    })
}

return (<FoodsContext.Provider
    value={{
        foods:state.foods,
        loading:state.loading,
        getFoods,
    }}>
        {props.children}
    </FoodsContext.Provider>)

}

export default FoodsState