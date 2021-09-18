import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage'
import "./styles.scss";
import axios from "axios";
import { axiosWithAuth } from "./helpers/axiosWithAuth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = (e) => {
    axiosWithAuth()
      .post('/logout')
      .then(res => { 
        localStorage.removeItem('token');
        window.location.href = '/login';
      })
      .catch(err => {
        console.log(err)
      })
      
    }
  

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <button  data-testid="logoutButton" onClick={logout}>{loggedIn ? "logout" : "login"}</button>
        </header>

        <Route exact path='/login'>
          <Login setLoggedIn={setLoggedIn}/>
        </Route>

        <Route exact path='/'>
          <Login />
        </Route>
        <PrivateRoute path='/colors' component={BubblePage}/> 
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.