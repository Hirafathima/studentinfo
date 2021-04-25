import React, {useEffect, useState} from 'react';

import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";



function Navhome(props) {
  
let history = useHistory();
    return (
      <div style={{padding:"5vh"}}>
<div id="nav">
    <nav className="navbar navbar-expand-lg navbar-light " id="navbar">
    <a className="navbar-brand " id="logo" href="/" style={{fontWeight:"bold", fontSize:"2rem"}}>{props.navbrand}</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link p-5" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link p-5" href="/services">Services</a>
        </li>
        
        <li className="nav-item">
          <a className="nav-link p-5" href="/contact">Contact Us</a>
        </li>
        <li className="nav-item" style={{marginTop:"6vh"}}>
          
        <button className='btn btn-light' onClick={() => {
                localStorage.clear();
                history.push('/')
            }} >{props.loggedIn}</button>
          
        </li>
      </ul>
    </div>
  </nav>
        </div>
      </div>
        
    );
}

export default Navhome;