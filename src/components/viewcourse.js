import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";
import './viewcourse.css'
import {withRouter} from 'react-router';

const Viewcourse = ()=>{
    const options = [];
    const details = [];
    const [object, setObject] = useState();
    useEffect(()=>{
        fetch(`http://student-info-backend.herokuapp.com/courses`,{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token') +' '+localStorage.getItem('user')
            }
        }).then(r=>r.json()).then(data=>{
        //    console.log(data);
        data.courses.map(e=>{
            options.push(e.courseid);
            details.push(e);
            
        })

        }).catch(err=>console.log(err));

        

    });
    return(
        <div>
            <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Course Details</h3>
            <Dropdown className="course-selection" options={options} onChange={(id)=>{
                
              setObject(details.find(x=>x.courseid===id.value))
            //   console.log(object);

            }} placeholder="Select course" />
            {object===undefined?"":<div className="para">
            
            <p>Course ID: {object.courseid}</p>
                <p>Course Name: {object.coursename}</p>
                <p>Credit Points: {object.credit}</p>
                <p>Semester: {object.semester}</p>
                <p>Faculty in charge: {object.staff}</p>
                </div>}
           
        </div>

    );

}
export default withRouter(Viewcourse);
