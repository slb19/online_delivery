const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")

const Food = require("./models/foods.js")
const MerchantUser = require("./models/merchantUser.js")

const foodsRoutes = require("./routes/foods.js")
const cartRoutes = require("./routes/cart.js") 
const ordersRoutes = require("./routes/orders.js") 
const merchantRoutes = require("./routes/merchant.js")  

const app = express()

app.use(helmet())
app.use(express.json());

app.use((req,res,next)=>{     
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
    
        next();
});

app.use(foodsRoutes)
app.use(cartRoutes)
app.use(ordersRoutes)
app.use(merchantRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/od-test", {useNewUrlParser: true ,
                                                            useCreateIndex:true ,
                                                            useFindAndModify:false,
                                                            useUnifiedTopology: true}).catch(error=>console.log(error));
                                                            
//This route was used to add foods with postman....start
app.post("/foods", async (req,res)=>{
    try{
        await Food.insertMany(req.body)
        res.status(201).json({msg:"Foods Menu created at database"})
        
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Server Error"})
    }   
})
//This route was used to add foods with postman....end

//This route was used to add an admin merchant account through postman.....start
app.post("/admin/signUp", async(req, res)=>{

    try{
        const {username, password}=req.body;
        const salt= await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

            const credentials = await new MerchantUser({username, password:hashedPassword})
           
            await credentials.save()

            res.status(201).json(credentials)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
})
//This route was used to add an admin merchant account through postman.....end

app.get('*', (req, res)=> {
   res.status(404).json({error:"it does not exist"})
  });

const port = 5000
app.listen(port, ()=>{
    console.log(`od has started at port  ${port}`)
})