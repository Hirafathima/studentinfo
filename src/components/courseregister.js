

import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import register from './register';
 

const Courseregister=(props)=>{
    const options = [
        'S1','S2','S3','S4','S5','S6','S7','S8'
      ];
      
      const [courses, setCourses] = useState('');
      const [checked, setChecked] = useState([]);
      const [semester, setSemester] = useState('');
    const username = props.match.params.studentid;
function register(newV){
    console.log(newV);
    fetch(`http://student-info-backend.herokuapp.com/student/${username}/registercourses/${newV.value}`,{
         headers:{
             Authorization:'Bearer '+localStorage.getItem('token') +' '+localStorage.getItem('user')
         }
  }).then(r=>r.json())
  .then(result=>{
        
        setCourses(result);
        if(result.courses !== undefined){
            if(result.courses[0] !== undefined)
            {setSemester(result.courses[0].semester);
        console.log(result.courses[0].semester);}
    }

        console.log(result)
        
    })
        
        .catch(err=>console.log(err));
}

function addToArray(e){
    if(checked.indexOf(e.target.value) === -1){
        checked.push(e.target.value);
    }
        
    // setChecked
    else{
        const i = checked.indexOf(e.target.value);
        checked.splice(i, 1);

    }

    if(checked!== undefined){
        
        console.log(checked);
        
    }
}

function registerCourse(){
    console.log(checked);
    
    fetch('http://student-info-backend.herokuapp.com/student/student-registered-courses',{
            
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body:JSON.stringify({
           courses: checked,
           register: true,
           semester: semester,
           username: username
        })
        }).then(( res)=>{
            alert('Registered');
        window.location.reload();}
            )
            
            
}
 return(
     <div style={{paddingLeft:"10vw"}}>
         <h3 style={{ paddingTop:"10vh"}}>Course Registration</h3>
         <div style={{width:"35%", display:"inline-block",marginLeft:"5vw", marginTop:"10vh"}}><Dropdown options={options} onChange={(newV)=>{register(newV)}} placeholder="Select semester" /></div>
 {courses.courses===undefined?<div>
     
     {courses.scourse!==undefined && courses.scourse!==null?
     
     courses.scourse.map(x=>{return <div  style={{marginLeft:"6vw", marginTop:"5vh"}}>
     <p >{x.courseCourseid}  -  {x.coursename}</p>
     </div>}):''}
 </div>:<div>
 {courses.courses.map(x=>{return <div style={{marginLeft:"6vw", marginTop:"5vh"}}>
    <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" value={x.courseid} onClick={addToArray}/>
    <label class="form-check-label" for="exampleCheck1">{x.courseid}  -  {x.coursename}</label>
    
  </div>
  
 </div>})}
 <button class="btn btn-light btn-outline-dark" style={{marginLeft:"20vw", marginTop:"5vh"}}onClick={registerCourse}>Register</button>
 
 </div>}
     </div>
 )

}

export default withRouter(Courseregister);
