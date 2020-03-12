const jwt = require("jsonwebtoken")
const config = require("config");
const { validationResult } = require('express-validator')
const fetch = require('node-fetch');
const Order = require("../models/orders.js")
const Cart= require("../models/cart.js")

exports.postCreateOrder =  async(req,res)=>{
    //console.log(typeof req.body.price)
    const{price , currency}=req.body
    //if(currency === undefined) currency ="EUR"
    console.log(currency)
    const errors = validationResult(req);
    //console.log(req.body)

    //const priceN = Number(price)
         if(!errors.isEmpty()){
                return res.status(422).json({msg: errors.errors[0].msg})
            }
   
        else if((price < 3 && currency==="EUR") ||(price < 4 && currency ==="USD") || (price <2 && currency==="GBP") || (price <1000 && currency==="INR")){
                return res.status(400).json({msg:"Your Order is too low"})
            }
        else if(!req.body.Address){
            return res.status(400).json({msg:"You have to provide an address"})
            }
        else if(!req.body.FullName){
             return res.status(400).json({msg:"You have to provide your fullname"})
        }
        else if(!req.body.Phone){
            return res.status(400).json({msg:"You have to provide your phone"})
        }else{
    try{

        const newOrder = new Order(req.body)
        const confirmedOrder = await newOrder.save()
        res.status(201).json({msgSuccess:"Your order is confirmed", cartItemsOrdered:confirmedOrder.cartItems})

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
        }
    }
}

exports.postChangeCurrency = async(req, res)=>{

    const price = Number(req.params.price)
   
    const currency = req.body.currency
  
    if(price === 0) return 
    
        //fetch(`http://data.fixer.io/api/latest?access_key=${config.get("fixerApiKey")}&base=USD&symbols=${currency}`)
        fetch(`https://api.exchangeratesapi.io/latest?base=EUR`)
        .then(res=>res.json())
        .then(json=>{
                console.log(currency)
                const token = req.header("x-auth-token")
                const decoded = jwt.verify(token, config.get("jwtSecret"));
                const cartid = decoded.id
               
                const convertedPrice = price * Number(json.rates[`${currency}`])

                    Cart.findOneAndUpdate({userid:cartid}, {price:convertedPrice, currency: currency}, {new: true},(error,updatedCart)=>{
                    if(error){
                        console.log(error)
                        res.status(500).json({error:"Server Error"})
                    }else{
                        return res.status(201).json({price:updatedCart.price.toFixed(2) , currency:updatedCart.currency})
                    }
                })  
        })
        .catch(error=>{console.log(error)
            res.status(500).json({error:"Server Error"})
        })
}