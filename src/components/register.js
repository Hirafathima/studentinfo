 
import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect,Link} from "react-router-dom";
import '../App.css';
import Dropdown from 'react-dropdown';

const Register =(props)=>{
  console.log(props);
    const [message,setMessage]=useState('');
    const [department, setDept] = useState('');
    const [currentsem, setCurrentSem] = useState('');
    const options = ['Computer Science & Engineering','Electronics & Electrical Engineeing','Electrical Engineering','Mechanical Engineering','Civil Engineering'];

    const options2 = ['S1','S2','S3','S4','S5','S6','S7','S8'];
    function register(e){
          e.preventDefault();
        
          const  username=document.getElementById('username').value;
          const  password=document.getElementById('password').value;
          const  name=document.getElementById('name').value;
          // const  department=document.getElementById('department').value;
          // const  currentsem=document.getElementById('currentsem').value;
      
          fetch('http://student-info-backend.herokuapp.com/register',{
            
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
            username:username,
            password:password,
            name:name,
            currentsem:currentsem,
            department:department,
            currentuser:props.match.params.adminid
      

          })
        }).then(r=>{
            if(r.status === 500){
              alert("token expired login again to continue");
            return <Redirect to='/' />
              // throw new Error("token exired");
            }
            if(r.status === 401){
              alert("not authenticated to do this action");
              return <Redirect to='/' />
              // throw new Error("not authenticated");
            }
            if(r.status === 403){
              alert("student already registered!!");
              // return <Redirect to='/' />
               throw new Error("cant add existing student");
            }
            
            return r.json().then(res =>{
              window.location.reload();
              alert("registered succesfully");
             
            }).catch(err=>console.log(err));;
          }).then(r=>{console.log(r)}).catch(err=>console.log(err));
          
        
    }
    return(
    <div>
        
            {/* <input type="text" name="name" id="name"/>
            <input type="text" name="email" id="email"/>
            <input type="text" name="username" id="username"/>
            <input type="text" name="password" id="password"/>
            <input type="text" name="currentsem" id="currentsem"/>
            <input type="text" name="department" id="department"/> */}
            <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Student Registration</h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            <input type="text" class="form-control" id="name" placeholder="Enter name" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" id="username" placeholder="Enter username" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="password" class="form-control" id="password" placeholder="Enter password" style={{ marginBottom: "2vh", width: "50%" }}></input>
                    <div style={{ marginBottom: "2vh", width: "50%" }} ><Dropdown   options={options2} onChange={(id)=>{
                
                setCurrentSem(id.value);
  
              }} placeholder="Select semester" /></div>
                    {/* <input type="text" class="form-control" id="department" placeholder="Enter department" style={{ marginBottom: "2vh", width: "50%" }} /> */}
                    <div style={{ marginBottom: "2vh", width: "50%" }} ><Dropdown  options={options} onChange={(id)=>{
                
                setDept(id.value);
  
              }} placeholder="Select department" /></div>
                    <button type="button" className="btn btn-light btn-outline-dark" onClick={(e) => register(e)} style={{ float: "right", marginRight: "23vw" }}>Register</button>
                </div>
            {/* <button type="submit">register</button> */}

        
            {message}
    </div>
    );
}
export default withRouter(Register);