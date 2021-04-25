import React,{useState,useEffect} from "react";
import Certificate from "./certificate";
import { render } from "react-dom";
import {withRouter} from 'react-router';

const Viewcertificates=(props)=>{

const [certificatearray,setcertificatearray]=useState([]);
 const studentname=props.match.params.studentid;
// function handleclick(){
    useEffect(()=>{
        fetch(`http://student-info-backend.herokuapp.com/certificates/student/${studentname}/viewcertificates`, {
            
        headers:{
            
          Authorization:'Bearer '+localStorage.getItem('token')+' '+ localStorage.getItem('user')
        }}).then(r=>r.json()).then(certificates=>{
            // console.log(certificates);
            certificates.map(x=>{
                setcertificatearray(certificatearray=>{
                   
                   return [...certificatearray,x]});
            });
            console.log(certificatearray);
        }
        ).catch(err=>console.log(err));
        
    },[]);
    

// }
function remarks(val){
    if(val===null)
        return "Not updated by admin yet";
    else
        return val;
}
return (
    
    <div>
        <h3>Certificates</h3>
        {/* <button onClick={handleclick}>Click to view certificates</button> */}
        <div style={{paddingTop:"5vh"}}>
        {certificatearray.map(item=>{return <Certificate key={item.id} id={item.id} title={item.title} 
        filepath={item.filepath} category={item.category} studentid={studentname} 
        points={remarks(item.points)} comments={remarks(item.comments)} />})}
        </div>
        
    </div>
)


    
}

export default withRouter(Viewcertificates);