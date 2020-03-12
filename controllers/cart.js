const jwt = require("jsonwebtoken")
const config = require("config");
const Cart= require("../models/cart.js")
const randomstring = require("randomstring");

exports.getGetToken=async(req,res)=>{
    const id = randomstring.generate();
    
    try{
        const newCart = new Cart()
        newCart.userid=id
        await newCart.save()
        
    }catch{error=>{
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }}
    
    const payload={
        id
    }

    jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"10h"},(error, token)=>{
        if(error){
            throw new Error;
        }
        //console.log(token)
        res.status(201).json({token})
    })
}

exports.getFetchCart = async(req,res)=>{
    try{
        const token = req.header("x-auth-token")
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        const cartid = decoded.id
            const cart = await Cart.findOne({userid:cartid})
           
            res.status(200).json({items:cart.items , price:cart.price})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
}

exports.postAddToCart = async(req, res)=>{
    const price = req.body.filter(p=>p.price)
    req.body.splice(-1,1)
   
    const dbPrice=price[0].price
   
   try{
    const token = req.header("x-auth-token")
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const cartid = decoded.id
        const updatedCart = await Cart.findOneAndUpdate({userid:cartid}, {items:req.body, price:dbPrice}, {new: true})

        res.status(201).json({price:updatedCart.price})
   }catch(error){
       console.log(error)
       res.status(500).json({error:"Server Error"})
   } 
}