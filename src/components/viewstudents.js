import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";
import './viewstudent.css'
import {withRouter} from 'react-router';

const Viewstudents = (props)=>{
    const admin = props.match.params.adminid;
    let history = useHistory();
    const [dept,setDept] = useState('');
    const [semester,setSemester] = useState('');
    const [user,setUser] = useState('');
    const [object,setObject] = useState('');
    const [student, setStudent] = useState('');
    const department = ['Computer Science & Engineering','Electronics & Electrical Engineeing','Electrical Engineering','Mechanical Engineering','Civil Engineering'];
    const sem =['S1','S2','S3','S4','S5','S6','S7','S8'];
    const username = [];

    function search(e){
        // console.log(dept);
        // console.log(semester);
        // console.log(user);

        e.preventDefault();
        fetch(`http://student-info-backend.herokuapp.com/students`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            },
            body:JSON.stringify({
                username:user,
                semester:semester,
                department:dept
          
    
              })
        }).then(r=>r.json()).then(data=>{
          console.log(data);
          setObject(data)
        // data.username.map(e=>{
        //     username.push(e);
            
            
        // })

        }).catch(err=>console.log(err));

    }
    useEffect(()=>{
        fetch(`http://student-info-backend.herokuapp.com/students`,{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token') +' '+localStorage.getItem('user')
            }
        }).then(r=>r.json()).then(data=>{
        // console.log(data);
        data.username.map(e=>{
            username.push(e);
            
            
        })

        }).catch(err=>console.log(err));

        

    });
    return(
        <div>
         <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Student Details</h3>   
<div className="student-search">

<Dropdown className="dropdown" options={department} onChange={(text)=>{
    setDept(text.value);
    
}} placeholder="Select department" />
<Dropdown className="dropdown" options={sem} onChange={(text)=>{
    setSemester(text.value)
}}  placeholder="Select semester" />
<Dropdown className="dropdown" options={username} onChange={(text)=>{
    setUser(text.value)
}}  placeholder="Select username" />
<button type="button" class="btn btn-dark" onClick={(e)=>{search(e)}} style={{ float: "right", marginRight: "25vw" }}>Search</button>


{object !== undefined && object.students !== undefined? object.students.map(x => {return (<div className="details"><p>Name: {x.name}</p>
<p>Mail ID: {x.email}</p>
<p>Department: {x.department}</p>
<p>Semester: {x.currentsem}</p>
<Button   onClick={()=>{history.push(`/admin/${admin}/viewcertificatestudent/${x.username}`)}} style={{ float: "right", marginRight: "25vw" }}>view certificates  </Button>

</div>)}):""  }
</div>
        </div>
        

    );

}
export default withRouter(Viewstudents);
