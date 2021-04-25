
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory,Redirect} from "react-router-dom";
import './App.css';
import Content from './components/content';
import Admin from './components/admin';
import Student from './components/student';
import Fullnotification from './components/fullnotification';
import Error from './components/error';
import Service from './components/pages/Service';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
// import Signup from './components/signup';



function App() {
  

    return (
      <div>
<Router>
          <Switch>
          <Route exact path={"/services"}   ><Service /></Route>

          <Route exact path={"/contact"}   ><Contact /></Route>
          <Route exact path={"/"}   ><Home /></Route>
          <Route exact path={"/admin/:adminid"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/registerstudents"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/viewstudents"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/registercourses"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/viewcourses"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/results"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/viewresults"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/notification"}   ><Admin /></Route>
          <Route exact path={"/admin/:adminid/viewcertificatestudent/:studentid"}   ><Admin /></Route>
          {/* <Route exact path={"/admin/:admin/:studentid/certificates"}   ><Admin /></Route> */}

          
          <Route path="/notifications" exact component={() => <Fullnotification />} />
          <Route exact path={"/student/:studentid"}   ><Student /></Route>
          <Route exact path={"/student/:studentid/registercourses"}   ><Student /></Route>
          <Route exact path={"/student/:studentid/certificates"}   ><Student /></Route>
          <Route exact path={"/student/:studentid/results"}   ><Student /></Route>
          <Route exact path={"/student/:studentid/viewcertificates"}   ><Student /></Route>






          <Route   component={ Error } />
          {/* <Route path="/signup" exact component={() => <Signup />} /> */}
          </Switch>
            
        </Router>
      </div>
        
    );
}

export default App;