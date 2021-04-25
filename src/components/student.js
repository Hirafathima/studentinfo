import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";
import Courseregister from './courseregister';
import Course from './course';
import Navhome from './Navhome'
import './student.css'
import './adminprofile.css'
// import adminprofile from './images/adminprofile.svg'
import Viewresults from './viewresults';
import Uploadcertificates from './uploadcertificates';
import Viewcertificates from './viewcertificates';
import Dropdown from 'react-dropdown';

const Student = (props) => {
    // const { params: { adminid } } = match;
    let history = useHistory();
    const username = props.match.params.studentid;
    // console.log(username);
    // console.log(localStorage.getItem('token'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //    console.log( JSON.stringify(match));
    const [src, setSrc] = useState('');
    const [img, setImage] = useState(false);
    const [phn, setPhn] = useState('');
    const [date, setDate] = useState('');
    const [department, setDepartment] = useState('');
    const [sem, setSem] = useState('');
    const [dept, setDept] = useState('');
    const [semester, setSemester] = useState('');

    const [clicked, setClicked] = useState(false);
    const [click, setClick] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const options = ['Computer Science & Engineering','Electronics & Electrical Engineeing','Electrical Engineering','Mechanical Engineering','Civil Engineering'];
    const options2 = [
        'S1','S2','S3','S4','S5','S6','S7','S8'
      ];
    function handleChange(){
        setClick(true);
    }

    function handleClick(){
        setClicked(true);
    }

    function changePassword(){
        const  newpass=document.getElementById('new_password').value;
        const  confirmpass=document.getElementById('confirm').value;

        setClicked(false);

        if(newpass!==''&& confirmpass!==''){
            fetch(`http://student-info-backend.herokuapp.com/student/${username}/changepassword`, {
                method: "POST",
                headers: {
    
                    'Content-Type':'application/json',
    
                    Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
                },
                body: JSON.stringify({
                    password: newpass
                })
    
            }).then(path => {
                alert('Password updated');
                
    
            }).catch(err => {
                console.log(err)
            });
        }else if(newpass!==confirmpass){
            alert("Passwords do not match.");
        }
        else{
            alert("Password field cannot be null");
        }
    
        
    }


    function setimage(e) {
        setImage(true)
        setClick(false);
        var data = new FormData();
        const image = document.querySelector('input[type="file"]').files[0];
        data.append('data', image);
        fetch(`http://student-info-backend.herokuapp.com/dp/student/${username}/images`, {
            method: "POST",
            headers: {


                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            },
            body: data

        }).then(r => r.json()).then(path => {
            console.log(path)
            setSrc('http://student-info-backend.herokuapp.com/' + path.path)
            

        }).catch(err => {
            console.log(err)
        });
    }

    function editDetails(e){

        setEditClicked(true); 
    }

    
    function updateDetails(e){
        setEditClicked(false);

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        // const dept = document.getElementById('dept').value;

        fetch(`http://student-info-backend.herokuapp.com/student/${username}/update`,{
            
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            },
            body:JSON.stringify({
                name:name,
                phone:phone,
                dob:dob,
                email:email,
                department:dept
                // currentsem: semester
    
              })
            }).then(r=>{window.location.reload();
            }).catch(err=>console.log(err));
              
            
        }
     
        
        
    
    useEffect(() => {
        fetch(`http://student-info-backend.herokuapp.com/student/${username}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('user')
            }
        }).then(r => r.json()).then(result => {
            setName(result.name);
            setEmail(result.email);
            setDate(result.dob);
            setPhn(result.phone);
            setSem(result.currentsem);
            setDepartment(result.department);
            if(result.path){
                setSrc('http://student-info-backend.herokuapp.com/'+result.path);
            }
            
            console.log(result);
        })

            .catch(err => console.log(err));

        //  axios.get('http://student-info-backend.herokuapp.com/admin/'+username).then(r=>{
        //     setName(r.data.name);
        //     setEmail(r.data.email);

        //     // console.log(r);
        //     }).catch(err=>console.log(err));


    });
    if (localStorage.getItem('isloggedin')) {
        return (<div>
            <Navhome navbrand="Student Dashboard" loggedIn="LOGOUT" />
            <Router>
                <div className="row">
                    <div className="col-lg-4">
                        <ul className="navstudent-ul">
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}`}>PROFILE</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/registercourses`}>COURSE REGISTRATION</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/certificates`}>UPLOAD CERTIFICATES</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/results`}>VIEW RESULTS</Link></li>
                            <li className="navstudent-li"><Link className="a" to={`/student/${username}/viewcertificates`}>VIEW CERTIFICATES</Link></li>

                        </ul>
                    </div>
                    <div className="col">
                        <Switch>
                            
                            <Route exact path={`/student/:studentid/registercourses`}  ><Courseregister /></Route>
                            <Route exact path={`/student/:studentid/results`}  ><Viewresults /></Route>
                            <Route exact path={`/student/:studentid/certificates`}  ><Uploadcertificates /></Route>
                            <Route exact path={`/student/:studentid/viewcertificates`}  ><Viewcertificates /></Route>

                            <Route exact path="/student/:studentid" render={() => (<div>
                                <div className="admin-pro">

                                <img src={src} className="pro-img"/>
<ul className="adminprofile-ul">

                                    
                                    {(src===null || src===undefined) || click ===true?<div>
                   <form onSubmit={(e)=>{
                       setimage(e)
                   }} encType="multipart/form-data" >
                       <input class="btn btn-light" type="file" name="image" id="image"/>
                       <button type="submit" class="btn btn-dark">Update</button>
                   </form>
               </div>:<div>
               <button onClick={handleChange} class="btn btn-light btn-outline-dark" style={{marginLeft:"11vw"}}>Change Image</button>

                   
                
                   </div>}


{editClicked===false?<div><li>Name:<p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{name}</p></li>
<li>Phone: <p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{phn}</p></li>
<li>Date of birth: <p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{date}</p></li>
<li>Mail id: <p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{email}</p></li>
<li>Department: <p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{department}</p></li>
<li>Current Semester: <p style={{display:"inline-block", marginLeft:"2vw", marginBottom:"0px"}}>{sem}</p></li>
<button type="button" class="btn btn-dark" onClick={editDetails} style={{marginLeft: "25.5vw"}}>Edit details</button></div>:
<div>
<li>Name:<input type='text' id='name' defaultValue={name} className='form-control' style={{width:"35%", display:"inline-block", marginLeft:"2vw"}} required></input></li>
<li>Phone:<input type='text' className='form-control' id='phone' defaultValue={phn} style={{width:"35%", display:"inline-block",marginLeft:"2vw"}} required></input></li>
<li>Date of birth:<input type='text' className='form-control' id='dob' defaultValue={date} style={{width:"35%", display:"inline-block", marginLeft:"2vw"}} required></input></li>
<li>Mail id: <input type='text' defaultValue={email} id='email' className='form-control' style={{width:"35%", display:"inline-block",marginLeft:"2vw"}} required></input></li>
{/* <li>Department:<input type='text' className='form-control' id='dept' style={{width:"35%", display:"inline-block",marginLeft:"2vw"}}></input></li> */}
<li>Department:<div style={{width:"35%", display:"inline-block",marginLeft:"2vw"}}><Dropdown id="dept"  options={options} onChange={(id)=>{
                
                setDept(id.value);
  
              }} placeholder="Select department" required/></div></li>
              {/* <li>Current Semester:<div style={{width:"25%", display:"inline-block",marginLeft:"2vw"}}><Dropdown id="currentsem"  options={options2} onChange={(id)=>{
                
                setSemester(id.value);
  
              }} placeholder="Select department" required/></div></li> */}
<button type="button" class="btn btn-dark" onClick={(e) => updateDetails(e)} style={{ float: "right", marginRight: "23vw" ,marginLeft:"2vw", marginBottom:"2vh"}}>Update</button></div>}

</ul>

{clicked===true?
                                    <div>
                                        <input type="text" class="form-control" name="new_password" id="new_password" placeholder="Enter New Password" style={{ marginBottom: "2vh", width: "30%", display:"block", marginTop:"15vh", marginLeft:"15vw" }} />
                                    <input type="text" class="form-control" id="confirm" placeholder="Confirm New Password" style={{ marginBottom: "2vh", width: "30%", display:"block", marginTop:"3vh", marginLeft:"15vw" }} />

                                    <button type="button" class="btn btn-dark" onClick={(e) => changePassword(e)} style={{ float: "right", marginRight: "23vw" }}>Update</button></div>:<button type="button" class="btn btn-dark" onClick={handleClick} style={{ float: "right", marginRight: "23vw" }}>Change Password</button>}
                                    

                                    
</div>

{/* <button type="button" class="btn btn-dark" onClick={editDetails} style={{ float: "right", marginRight: "23vw" }}>Edit details</button> */}

                            </div>
                            )
                            } />



                        </Switch>
                    </div>
                </div>



            </Router>

            {/* <a>register student</a> */}
        </div>
        )
    }
    else {
        return (
            <div>
                <div>you are not logged in</div>
                <Button onClick={() => {
                    history.push("/")
                }}>LOGIN</Button>

            </div>

        );
    }
}

export default withRouter(Student);