import React,{useRef} from 'react'
//import {Link} from "react-router-dom"

const Navbar = () => {

    const links=useRef()
    const nav=useRef()

   const onClickBurg=()=>{
        
        links.current.classList.toggle("active")
        nav.current.classList.toggle("active")
    }

    return (
            <nav className="navb" ref={nav}>
                <div className="title" style={{cursor:"pointer"}}>onlineDelivery</div>

                <a href="#!" className="burg" onClick={onClickBurg}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>    
                </a> 
                <div className="navb-links-container" >
                    <ul className="navb-links" ref={links}>
                        <li>contact</li>
                    </ul>
                </div>
            </nav>
        
    )
}

export default Navbar
