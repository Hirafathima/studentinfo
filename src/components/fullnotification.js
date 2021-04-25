import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";

import {withRouter} from 'react-router';

const Fullnotification = ()=>{
    const [notifications, setNotifications] = useState('')
    useEffect(()=>{
        fetch('http://student-info-backend.herokuapp.com/notification')
        .then(r=>r.json())
        .then(data=>{
            setNotifications(data.notifications.reverse());
                console.log(notifications);
                }).catch(err=>console.log(err));
            }

        

    );
    return(
        <div style={{padding:"10vh"}}>
            <h3 style={{fontWeight:"bolder"}}>All Notifications</h3>
           {notifications!==null&& notifications!==undefined && notifications!==''?notifications.map(x=>{
          return(<div style={{marginLeft:"8vw"}}>
        <h3 style={{paddingTop:"10vh"}}>{x.header}</h3>
          <h6 style={{paddingRight:'20vw'}}>{x.body}</h6>
        </div>)}):''}
           
        </div>

    );

}
export default withRouter(Fullnotification);