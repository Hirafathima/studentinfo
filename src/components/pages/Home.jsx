
import React, { useEffect, useState } from 'react';
import Navhome from "../Navhome";
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import './home.css'
export default function Home() {
    const [noti, setNoti] = useState([]);
    useEffect(() => {
        fetch(`http://student-info-backend.herokuapp.com/notification`,)
        .then(r => r.json())
        .then(result => {
            setNoti(result.notifications.reverse().slice(0,4));
            console.log(noti);
            
            
        })
        .catch(err => console.log(err));




    },[]);
    let history = useHistory();

    function login(e) {
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        e.preventDefault();

        fetch('http://student-info-backend.herokuapp.com/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password


            })
        }).then(r => {
            if (r.status === 401) {
                alert("invalid password");

                throw new Error("invalid password");
            }
            if (r.status === 404) {
                alert("no user found");

                throw new Error("no user found");
            }

            return r.json();
        }).then(res => {
            console.log(res.userid);
            localStorage.setItem('token', res.token);
            localStorage.setItem('isloggedin', true);
            localStorage.setItem('user', res.userid);
            if (res.status === 'student') {
                history.push(`/student/${username}`);
            }
            else {
                history.push(`/admin/${username}`);
            }
        }).catch(err => console.log(err));
    }
    return (
        <div>
            <Navhome navbrand="Student Information System"/>
            <hr></hr>

            <div className="row">
                <div className="col" style={{ paddingLeft: "10vw", paddingTop: "10vw" }}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis et quam non hendrerit. Phasellus viverra elit et mi tincidunt pulvinar. Maecenas dignissim leo vitae hendrerit iaculis. Vivamus vestibulum suscipit ultricies. Quisque in tincidunt felis, in sodales turpis. Nulla vehicula sem vel lacus tempus dapibus. Nulla luctus odio ut elit faucibus, facilisis auctor arcu facilisis. Nulla dapibus magna nec neque hendrerit ullamcorper. Curabitur porta ac sem vel finibus.

Phasellus ultricies mauris et placerat interdum. Nullam sit amet lobortis nisi. Ut pulvinar vel erat a eleifend. Nullam ut ligula metus. Nullam nunc dolor, iaculis vel consectetur vel, accumsan nec nibh. Cras nunc nisi, luctus in neque non, aliquam vestibulum diam. Duis non turpis nunc. Donec sed libero dignissim, tempus elit a, molestie ante.</p>

                </div>
                <div className="col" style={{ paddingTop: "27vh", paddingLeft: "10vw" }}>
                    <input type="text" class="form-control" id="username" placeholder="Enter username" style={{ marginBottom: "5vh", width: "70%" }} />
                    <input type="password" class="form-control" id="password" placeholder="Enter password" style={{ marginBottom: "5vh", width: "70%" }}></input>
                    <button type="button" class="btn btn-dark" onClick={(e) => login(e)} style={{ float: "right", marginRight: "12vw" }}>Log In</button>


                </div>
            </div>







            <div style={{ padding: "10vh" }}>
                <h3 style={{marginBottom:"5vh"}}>Notifications</h3>
                <hr></hr>
      {noti!==null && noti!==undefined?noti.map(x=>{
          return <div className="col-lg-3" style={{display:"inline-block", padding:"5vh"}}>
              <h5 style={{fontWeight:"bold"}}>{x.header}</h5>
              <h6>{x.body}</h6>
          </div>
      }):'nothing'}
                <hr></hr>

            <button type="button" class="btn btn-dark"  style={{ float: "right", marginRight: "5vw" }}><Link to={'/notifications'}>See all</Link></button>


            </div>

        </div>
    );
}




