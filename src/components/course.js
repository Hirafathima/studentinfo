import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";
import Dropdown from 'react-dropdown';

import {withRouter} from 'react-router';

const Course = (props)=>{
  const [message,setMessage] = useState('');
  const [currentsem, setCurrentSem] = useState('');

  const options2 = ['S1','S2','S3','S4','S5','S6','S7','S8'];

    function register(e){
        e.preventDefault();

        
          const  courseid=document.getElementById('courseid').value;
          const  coursename=document.getElementById('coursename').value;
          const  credit=document.getElementById('credit').value;
          const  staff=document.getElementById('staff').value;
          // const  semester=document.getElementById('semester').value;
          
      
          fetch('http://student-info-backend.herokuapp.com/registercourses',{
            
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
           courseid:courseid,
           coursename:coursename,
           credit:credit,
           staff:staff,
           semester:currentsem,
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
              alert("course already registered!!");
              // return <Redirect to='/' />
               throw new Error("cant add existing student");
            }
            
            return r.json().then(res =>{
              console.log(res);
              window.location.reload();
              alert("registered succesfully");
             
            }).catch(err=>console.log(err));;
          }).then(r=>{console.log(r)}).catch(err=>console.log(err));
          
        
    }
    return(
        <div>
          <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Course Registration</h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            <input type="text" class="form-control" name="courseid" id="courseid" placeholder="Enter Course Id" style={{ marginBottom: "2vh", width: "50%" }} />
            <input type="text" class="form-control" name="coursename" id="coursename" placeholder="Enter Course Name" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" name="credit" id="credit" placeholder="Enter credits" style={{ marginBottom: "2vh", width: "50%" }} />
                    <input type="text" class="form-control" name="staff" id="staff" placeholder="Enter staff name" style={{ marginBottom: "2vh", width: "50%" }}></input>
                    {/* <input type="text" class="form-control" name="semester" id="semester" placeholder="Enter semester" style={{ marginBottom: "2vh", width: "50%" }} /> */}
                    <div style={{ marginBottom: "2vh", width: "50%" }} ><Dropdown   options={options2} onChange={(id)=>{
                
                setCurrentSem(id.value);
  
              }} placeholder="Select semester" /></div>
                    <button type="button" class="btn btn-dark" onClick={(e) => register(e)} style={{ float: "right", marginRight: "23vw" }}>Register</button>


                </div>
            {/* <form onSubmit={(e)=>{ register(e) }}>
                <input type="text" name ="courseid" id="courseid"/>
                <input type="text" name ="coursename" id="coursename"/>
                <input type="number" name ="credit" step="0.1" id="credit"/>
                <input type="text" name ="staff" id="staff"/>
                <input type="text" name ="semester" id="semester"/>
                <button type="submit">register course</button>
            </form> */}
            {message}
           
        </div>

    );

}
export default withRouter(Course);