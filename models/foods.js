const mongoose = require("mongoose")

const foodSchema= new mongoose.Schema({

    food:{
        type:String,
        required:true
    },
    foodType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    price:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Food=mongoose.model("food", foodSchema);

module.exports=Food