import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect,Link} from "react-router-dom";
import '../App.css';
import Dropdown from 'react-dropdown';

const Viewresults=(props)=>{
    let history = useHistory();

  console.log(props);
  const username = props.match.params.studentid;
  const options = ['S1','S2','S3','S4','S5','S6','S7','S8'];

  const [semester, setSemester] = useState('');
  const [result, setResult] = useState('');
  const [click, setClick] = useState('');

    function view(e){
      setClick(true);
       if(semester!== null && semester!=undefined){
        fetch(`http://student-info-backend.herokuapp.com/student/${username}/results`,{
            
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
          },
          body:JSON.stringify({
            sem:semester
      
  
          })
          }).then(r=>r.json()).then(data=>{
            console.log(data.results);
            setResult(data.results);
            if(result!==null && result!==''){console.log(result);}
            
          })
          .catch(err=>console.log(err));
       }

        // const semester = document.getElementById('semester').value;
          
          
        
    }
    return(
    <div>
        
           
            <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>View Results</h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            {/* <input type="text" class="form-control" id="year" placeholder="Enter Admission Year" style={{ marginBottom: "2vh", width: "50%" }} /> */}
            <div style={{ marginBottom: "2vh", width: "50%" }} ><Dropdown  options={options} onChange={text=>setSemester(text.value)} placeholder="Select Semester" /></div>
                    {/* <label for="myfile">Upload the marksheet</label> */}
                    {/* <input type="file" id="myfile" name="myfile"></input> */}
                    <button type="button" class="btn btn-dark" onClick={(e) => view(e)} style={{ float: "right", marginRight: "23vw" }}>View</button>
                    {result!==undefined && result!==null && result!==''?result.map(x=>{return <div>
                    
     <p  style={{marginTop:"10vh"}}>Course ID: <p style={{display:'inline-block', marginLeft:'2vw'}}>{x.courseid}</p></p>
     <p  >Course Name: <p style={{display:'inline-block', marginLeft:'2vw'}}>{x.coursename}</p></p>
     <p  >Credits: <p style={{display:'inline-block', marginLeft:'2vw'}}>{x.credit}</p></p>
     <p  >Grade: <p style={{display:'inline-block', marginLeft:'2vw'}}>{x.grade}</p></p>
     {/* <p  style={{marginTop:"10vh"}}>Course ID: <p style={{display:'inline-block', marginLeft:'2vw'}}>{x.courseid}</p></p> */}

     </div>}):""}
     {result[0]!==undefined && result[0]!==null && result[0]!==''?<p  style={{marginTop:"10vh", fontWeight:"bold"}}>GPA: <p style={{display:'inline-block', marginLeft:'2vw'}}>{result[0].gpa}</p></p>:''}
                    {/* {results!==null && results!==undefined?results.map(x=>{return
                      <div>
                        <p>Course ID: <p>{x.courseid}</p></p>
                      </div>
                    }):''} */}


                </div>
            {/* <button type="submit">register</button> */}

    </div>
    );
}
export default withRouter(Viewresults);