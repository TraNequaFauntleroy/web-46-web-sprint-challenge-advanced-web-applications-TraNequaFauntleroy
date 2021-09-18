import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from 'axios';

const initialValues = {
  username: '', 
  password: ''
}

const Login = () => {

  const [formValues, setFormValues] = useState(initialValues);
  const { push } = useHistory()


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
}

  const onSubmit = (e) => {
      e.preventDefault();
      axios
          .post('http://localhost:5000/api/login', formValues)
          .then(res => {
              window.localStorage.setItem('token', res.data.payload)
              push('/colors')
          })
          .catch(err => {
              console.log(err)
          })
      
  }

  const error = 'Username and Password are required!';

  if (initialValues === '') {
    return error
  }
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
      <form onSubmit={onSubmit}>
            <label htmlFor='username'>Username</label>
                <input id='username'
                name='username' 
                values={formValues.username} 
                onClick={handleChanges}/>
                
            <label htmlFor='password'>Password</label>
                <input id='password' 
                name='password' 
                // type='password'
                values={formValues.password} 
                onClick={handleChanges}/>
            <button id='submit'>Login</button>
        </form>
      </div>

      {/* <p id="error" className="error">{error}</p> */}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"