const jwt=require("jsonwebtoken");
const config=require("config");

const auth=(req,res,next)=>{
    //console.log(req.header)
    const token=req.header("x-auth-token");
    //console.log(token)
        if(!token){
            return res.status(401).json({msg:"Access denied"})
        }
        try{
            const decoded=jwt.verify(token, config.get("jwtSecret"))
                const isAuthenticated=decoded.isMerchant;
                    if(!isAuthenticated){
                        return res.status(401).json({msg:"Access denied"})
                    }
               
                next();
        }catch(error){
            console.log(error)
            res.status(500).json({msg:"Server Error"})
        }
}


module.exports=auth 