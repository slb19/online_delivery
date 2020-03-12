import React from 'react'
import {Link} from "react-router-dom"

const WelcomeButton = () => {
    return (
        <div className="container welcome-button">
            <h2 style={{fontSize:"2.5em"}}>WELCOME</h2>
            <button className="btn btn-primary menu-button">
                <Link to="/foods">
                    <p style={{color:"black", fontSize:"1.6rem"}}>MENU</p>
                </Link></button>
        </div>
    )
}

export default WelcomeButton
