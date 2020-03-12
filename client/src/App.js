import React,{useEffect, useContext} from 'react';
import {BrowserRouter as Router ,Route,Switch, Redirect} from "react-router-dom";
import WelcomeButton from "./components/WelcomeButton.js"
import Navbar from "./components/Layout/Navbar.js"
import MainPage from "./components/mainPage/MainPage.js"
import Login from "./components/admin/Login.js"
import Merchant from "./components/admin/Merchant.js"
import FoodsState from "./context/foods/FoodsState.js"
import AuthContext from "./context/auth/AuthContext.js"
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {

  const authContext = useContext(AuthContext)
  const { auth , tokenAuth} = authContext

  const getToken=()=>{
    fetch("http://localhost:5000/getToken", {
      method:"GET",
      header:{
        Accept:"Application/json",
        "Content-Type":"Application/json"
      }
    }).then(res=>{
      return res.json()
    }).then(data=>{
      //console.log(data)
      localStorage.setItem("token",data.token)
    }).catch(error=>{
      console.log(error)
    })
  }
  localStorage.removeItem("auth-token")

  useEffect(()=>{
    const token = localStorage.getItem("token")
    //const authToken = localStorage.getItem("auth-token")
    if(!token){
      getToken()
  
    }else{
      return;
    }   
  },[])

  return (
  
     <FoodsState>
      <Navbar />
    
        <Router>
        <Switch>
          
            <Route exact path="/" component={WelcomeButton} />
            <Route exact path="/foods" component={MainPage}/>
            <Route exact path="/admin" component={Login}/>
            {/*<Route exact path="/merchant" component={Merchant}/>*/}
            <Route exact path="/merchant">
              {!auth || !tokenAuth ? <Redirect to="/" /> : <Merchant />}
              </Route>  
            
          </Switch>
        </Router>
        
      </FoodsState>
      
  );
}

export default App;
