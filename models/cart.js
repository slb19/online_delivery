const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    userid:{
        type:String,
        required:true
    },
    items:{
        type:Array
    },
    price:{
        type:Number,
        default:0
    },
    currency:{
        type:String,
        default:"EUR"
    }
})

Cart = mongoose.model("cart", cartSchema)

module.exports = Cart