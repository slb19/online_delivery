const mongoose = require("mongoose")

const merchantUserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    
})

MerchantUser = mongoose.model("merchantusers", merchantUserSchema)

module.exports = MerchantUser