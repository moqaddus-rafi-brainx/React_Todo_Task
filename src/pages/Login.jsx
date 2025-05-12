import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { emailReducer,passwordReducer } from "../reducers/SignupReducer";
import { emailRegex } from "../constants/regex";
import { useNavigate } from 'react-router-dom';
import { login } from "../apis/AuthApis";



//Login function
function Login(){
    const [emailState,dispatchEmail]=useReducer(emailReducer,{
        value:"",
        error:""
    })
    const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
        value:"",
        error:""
    })

    const [backendError,setBackendError]=useState(''); //For saving the errors from backend.

    const navigate = useNavigate();
    //used for enabling/diabling the submit button
    const isValid= emailRegex.test(emailState.value) && passwordState.value.trim().length >= 6 &&
    !emailState.error &&
    !passwordState.error;

    //Called when login form submitted
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setBackendError('');
        if(isValid)
        {
            const loginData = {
                email: emailState.value,
                password: passwordState.value,
            };
            console.log(loginData);
              try {
                    const response = await login(loginData);
                    console.log('Server Response:', response.data);
                    const token = response.data.token;
                    if(token)
                    {
                    navigate('/task-list',{ state: { token } });
                    }
              } catch (error) {
                    const backendMessage = error.response.data.message;
                    setBackendError(backendMessage);
                    console.error('Login Error:', error);
              }
        }
    }

    return(
        //Login form
        <form className="card" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {backendError && <p className="error-prompt">{backendError}</p> }
            <input type="email" name="email" placeholder="Email" value={emailState.value} className="input"
                onChange={(e) =>
                    dispatchEmail({ type: "CHANGE", value: e.target.value })
                }
            />
            {emailState?.error && (
                <p className="error-prompt">{emailState.error}</p>
            )}
            <p className="forget-pass">
            <Link to="/forget-password" >forgot password?</Link> 
            </p>
            <input type="password" name="password" placeholder="Password" value={passwordState.value} className="input"
                onChange={(e)=>{
                        dispatchPassword({type:"CHANGE", value:e.target.value})
                    }
                } 
            />
            {passwordState?.error && (
                <p className="error-prompt">{passwordState.error}</p>
            )}
            <button type="submit" disabled={!isValid} >Submit</button>
            <pre>
                Not registered? <Link to="/" >Signup</Link>
            </pre>
        </form>
    )
}

export default Login;