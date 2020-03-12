const Food=require("../models/foods.js")


exports.getAllFoods = async(req,res)=>{
    try{
        const allFoods = await Food.find({})
        
            if(!allFoods){
                return res.status(404).json({message:"There are no products at the mommnet"})
            }  
            
            res.status(200).json(allFoods)

        }catch(error){
            console.log(error)
            res.status(500).json({error:"serverError"})
    }
}