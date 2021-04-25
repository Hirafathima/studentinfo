import React,{useState} from "react";
import {withRouter} from 'react-router';

const Uploadcertificates=(props)=>{
    // console.log(document);
    const [certificateinfo,setcertificateinfo]=useState({
        title:"",
        category:""
    });
    console.log(props);
    const studentname=props.match.params.studentid;

    function valuechange(event){
     const {name,value}=event.target;
    if(name==="certificate_title"){
        setcertificateinfo(prev =>{
            return {
          title:value,
            category:prev.category
            };
        })
    }
    else{
        setcertificateinfo(prev =>{
           return {
               title:prev.title,
               category:value
           };

        })
    }
    }

    function clicked(event){
        event.preventDefault();
        var certificatedata=new FormData();
        
        const  image=document.querySelector('input[type="file"]').files[0];
        certificatedata.append('title',certificateinfo.title);
        certificatedata.append('category',certificateinfo.category);
        certificatedata.append('certificatedata',image);
        console.log(image);
        console.log(certificatedata);
        console.log(document);
        fetch(`http://student-info-backend.herokuapp.com/certi/student/${studentname}/uploadcertificates`,{
            method:"POST",
            headers:{
            
            Authorization:'Bearer '+localStorage.getItem('token')+' '+localStorage.getItem('user')
            },
            body:certificatedata
            }).then(r => {
                if(r.status==200){
                    alert("Certificate updated successfully");
                }
                else if(r.status==422)
                    alert("Please upload the file in pdf format");
                else if(r.status==401)
                    alert("Authentication error");
                    setcertificateinfo(prev =>{
                        return {
                            title:"",
                            category:""
                        };
                    })
            })
            .catch(err => console.log(err));
         
            

    };

        
   return <div style={{paddingLeft:"10vw"}}>
  
       <h3 style={{marginBottom:"5vh"}}>Upload Certificates</h3>
       <form id="certificatedata"  onSubmit={(e)=>{clicked(e)}} encType="multipart/form-data" >
    {/* <label for="certificate_title">Certificate Title</label> */}
    <input type="text" class="form-control" placeholder="Certificate title" name="certificate_title" onChange={valuechange}
    value={certificateinfo.title} style={{ marginBottom: "2vh", width: "50%" }}></input>
    <br />
    <br />
    {/* <label for="certificate_category">Category</label> */}
    {/* <input type="text" class="form-control" id="username" placeholder="Category" style={{ marginBottom: "2vh", width: "50%" }} /> */}

    <input type="text" class="form-control" placeholder="Category" name="certificate_category" onChange={valuechange}
    value={certificateinfo.category}  style={{ marginBottom: "2vh", width: "50%" }}></input>      <br />
    <br />
 
    <label for="certificate_file" >Upload Certificate</label>
    <input id="certificate_file" type="file" name="certificate_file" className="btn btn-light"  ></input>
     <button className="btn btn-dark" type="submit" >
    Submit
  </button>   
</form> 

   </div>
}

export default withRouter(Uploadcertificates);