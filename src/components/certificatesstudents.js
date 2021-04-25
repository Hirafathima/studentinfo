import React, { useState } from "react";
// import displaycertificate from "./displaycertificate";
import NewWindow from 'react-new-window';


function Certificatesstudents(props){

    const studentname=props.studentid;
        const certificateid=props.id;
        const adminid = props.admin;
        const [edited,setEdited]  = useState(false);
       
       function update(){
           const point = document.getElementById("points").value ;
           const comment = document.getElementById("comments").value ;
           fetch(`http://student-info-backend.herokuapp.com/admin/${adminid}/${studentname}/updatecertificate/${certificateid}`,{
            
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            },
            body:JSON.stringify({
                points:point,
                comments:comment
          
    
              })
            }).then(r=>{window.location.reload();
                setEdited(false);
            }).catch(err=>console.log(err));
              
            
        }
        
    


        function edit(){
            setEdited(true);
        }

        function opencertificate(link){
            window.open(link);
        }
        function clicking(event){
            event.preventDefault();
            handleclick();
        }
    function handleclick(){
     
     fetch(`http://student-info-backend.herokuapp.com/certificates/admin/${adminid}/${studentname}/viewcertificates/${certificateid}`, {
            
        headers:{
            
          Authorization:'Bearer '+localStorage.getItem('token')+' '+ localStorage.getItem('user')
        }})
        .then(res=>res.json())
        .then(result=>{
           console.log(result);
             opencertificate(result.link);
        } ).catch(err=>{
            console.log(err);
        });
    
return;
    
    }
    return <div>
        {edited === false ?<div style={{padding:"10vh"}}>
            <h5 style={{marginBottom:"5vh", fontWeight:"bold"}}>Title-{props.title}</h5>
        <h6>Category :<p style={{marginLeft:"2vw", display:"inline-block"}}>{props.category}</p></h6>
        <p>Points:<p style={{marginLeft:"2vw", display:"inline-block"}}>{props.points}</p></p>
        <p>Comments:<p style={{marginLeft:"2vw", display:"inline-block"}}>{props.comments}</p></p>
        <button className="btn btn-light btn-outline-dark" onClick={clicking}>View Certificate</button>
        <button className="btn btn-light btn-outline-dark" onClick={edit} style={{marginLeft:"2vw"}}>Edit</button>
        </div>: <div>
        <h5>Title :{props.title}</h5>
        <h6>Category :<p style={{marginLeft:"2vw", display:"inline-block"}}>{props.category}</p></h6>
        <p>Points:<input className="form-control" style={{width:"35%", display:"inline-block",marginLeft:"2vw"}} id="points"/></p>
        <p>Comments:<input className="form-control" style={{width:"35%", display:"inline-block",marginLeft:"2vw"}} id="comments" /></p>
        
        <button className="btn btn-light btn-outline-dark" onClick={clicking}>View Certificate</button>
        <button className="btn btn-light btn-outline-dark" onClick={update} style={{marginLeft:"2vw"}}>Update</button>
        
            </div>}
        
        
        </div>
}

export default Certificatesstudents;