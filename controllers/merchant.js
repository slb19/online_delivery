const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt=require("bcrypt");

const Order = require("../models/orders.js")
const MerchantUser = require("../models/merchantUser.js")


exports.postLogin = async(req,res)=>{
    try{
        const {username,password}=req.body
      
        const foundUsername = await MerchantUser.findOne({username})
      
            if(!foundUsername){
                return res.status(401).json({msg:"Invalid Credentials"})
            }

            const passwordIsMatch= await bcrypt.compare(password, foundUsername.password)

            if(!passwordIsMatch){
                return res.status(401).json({msg:"Invalid Credentials"})
            }
            const payload={
                id:foundUsername._id,
                isMerchant:true
            }

            jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"10h"},(error, token)=>{
                if(error){
                    throw new Error;
                }
               
                res.status(201).json({token})
            })
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
}

exports.getAllOrders = async(req,res)=>{
    try{
      
        const allOrders = await Order.find({})
        
        if(!allOrders){
            return res.status(404).json({message:"There are no Orders at the mommnet"})
        }  
        
        res.status(200).json(allOrders)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }

}

exports.getAllOrdersById = async(req,res)=>{
     
    try{
        const orderId = req.params.orderId
        //console.log(orderId)
        const order = await Order.findById(orderId)
            if(!order){
                return res.status(404).json({msg:"Order does not exist"})
            }
            res.status(200).json(order)
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
}