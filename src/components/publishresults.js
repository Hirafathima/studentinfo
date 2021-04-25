import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";

import {withRouter} from 'react-router';


const Publishresults=(props)=>{
  const username = props.match.params.adminid;
  console.log(username);
  const options = ['S1','S2','S3','S4','S5','S6','S7','S8'];

  const [semester, setSemester] = useState('');
    function uploadFile(e){
        e.preventDefault();

        
        var resultdata = new FormData();
        const  result=document.querySelector('input[type="file"]').files[0];
        
        const year = document.getElementById('year').value;
        // const semester= document.getElementById('semester').value;
        
        resultdata.append('year',year);
        resultdata.append('sem',semester);
        resultdata.append('resultdata',result);
        console.log(result);
        console.log(semester);
        console.log(year);
      
          fetch(`http://student-info-backend.herokuapp.com/result/admin/${username}/results`,{
            
        method:"POST",
        headers:{
          
          Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
        },
        body : resultdata
        }).then(r=>{
          if(r.status===200){
            window.location.reload();
            alert('Results successfully uploaded');
          }else if(r.status===403){
            window.location.reload();
            alert('Result for the following batch already published');
          }
        })
        .catch(err=>console.log(err));
          
        
    }
    return(
        <div>
            
            <form onSubmit={(e)=>{
                       uploadFile(e)
                   }} encType="multipart/form-data" >
                     <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Publish Results </h3>
            <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
            
                    <div style={{ marginBottom: "2vh", width: "50%" }} ><Dropdown  options={options} onChange={text=>setSemester(text.value)} placeholder="Select Semester" />
                    <input id="year" className="form-control" name="year" type="number" style={{ marginBottom: "2vh", marginTop:'2vh'}} placeholder="Enter Admission Year"/></div>
                    <input type="file" className="btn btn-light btn-outline-dark" name="result" id="result"/>
                       <button className="btn btn-light btn-outline-dark" style={{ float: "right", marginRight: "23vw", marginTop:'2vh' }} type="submit">Upload</button>
                    {/* <input type="text" class="form-control" id="department" placeholder="Enter department" style={{ marginBottom: "2vh", width: "50%" }} /> */}
                    
                    
                </div>
                       {/* <Dropdown  options={options} onChange={text=>setSemester(text.value)} placeholder="Select current semester" />
                    <input id="year" name="year" type="number" placeholder="enter joined year"/>
                       <input type="file" name="result" id="result"/>
                       <button type="submit">upload result</button> */}
                   </form>
           
        </div>

    // <div>
        
           
    //         <h3 style={{ paddingLeft:"5vw", paddingTop:"10vh"}}>Publish Results</h3>
    //         <div className="col" style={{ paddingTop: "10vh", paddingLeft:"17vw" }}>
              
    //         <input type="text" class="form-control" id="year" placeholder="Enter Admission Year" style={{ marginBottom: "2vh", width: "50%" }} />
    //                 <input type="text" class="form-control" id="semester" placeholder="Enter Semester" style={{ marginBottom: "2vh", width: "50%" }} />
    //                 <label for="myfile">Upload the marksheet</label>
    //                 <input type="file" id="myfile" name="myfile"></input>
    //                 <button type="button" class="btn btn-dark" onClick={(e) => uploadFile(e)} style={{ float: "right", marginRight: "23vw" }}>Upload</button>


    //             </div>
    //         {/* <button type="submit">register</button> */}

    // </div>
    );
}
export default withRouter(Publishresults);