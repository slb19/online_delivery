import React, {useState, useContext, useEffect} from 'react'
import AuthContext from "../../context/auth/AuthContext.js"
import { withRouter } from "react-router-dom";

const Login = ({history}) => {

    const authContext = useContext(AuthContext)
    const { login, auth , tokenAuth, error} = authContext

    const[loginForm, setLoginForm]=useState({
        username:"",
        password:"",
       
    });

    useEffect(()=>{
       // const token = localStorage.getItem("token")
        //if(token){
            localStorage.removeItem("token")
       // }
    })

    useEffect(()=>{
        if(auth && tokenAuth){
             history.push("/merchant")
        }
         
     }, [auth, history])

    const onChange=(e)=>{
       setLoginForm({...loginForm, [e.target.name]:e.target.value})   
   }

   const onSubmit=(e)=>{
    e.preventDefault();
    console.log(loginForm)
    login(loginForm)
    //  setLoginForm({
    //   username:"",
    //     password:""
    //   })    
}

    return (
        <div className='container'>
            
            {error  && <div style={{textAlign:"center" ,marginTop:"10px"}}className="alert alert-danger" role="alert"> {error} </div>}
           
           <form style={{width:"300px", margin:"auto"}} onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1"><b>Username</b></label>
                <input type="username" name="username" className="form-control" id="exampleInputEmail1" onChange={onChange} required/>
                   
         </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1"><b>Password</b></label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onChange} required/>
                 </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form> 
    </div>
    )
}

export default withRouter(Login)
