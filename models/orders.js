const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({

    FullName:{
        type:String,
        required:true,
        trim:true
    },
    Address:{
        type:String,
        required:true,
        trim:true
    },
    Phone:{
        type:String,
        required:true
    },
    EmailAddress:{
        type:String
    },
    cartItems:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:"EUR"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

Order = mongoose.model("order", ordersSchema)

module.exports = Order