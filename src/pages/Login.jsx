import { useReducer, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { emailReducer,passwordReducer } from "../reducers/SignupReducer";
import { emailRegex } from "../constants";
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
    const storedToken = localStorage.getItem('token');
    const [backendError,setBackendError]=useState(''); //For saving the errors from backend.
    const [isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate();
    
    //if already logged in
    useEffect(() => {
        if (storedToken) {
          navigate('/task-list');
        }
      }, [navigate, storedToken]);

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
              try {
                    const response = await login(loginData,setIsLoading);
                    const token = response.data.token;
                    setIsLoading(false);
                    if(token)
                    {
                    localStorage.setItem('token',token);
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
        <>
        {isLoading && <p>Loading......</p>}
        {!isLoading && <form className="card" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {<p className="error-prompt">{backendError || '\u00A0'}</p> }
            <input type="email" name="email" placeholder="Email" value={emailState.value} className="input"
                onChange={(e) =>
                    dispatchEmail({ type: "CHANGE", value: e.target.value })
                }
            />
            {(
                <p className="error-prompt">{emailState.error || '\u00A0'}</p>
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
            {(
                <p className="error-prompt">{passwordState.error || '\u00A0'}</p>
            )}
            <button type="submit" disabled={!isValid} >Submit</button>
            <pre>
                Not registered? <Link to="/" >Signup</Link>
            </pre>
        </form>}
        </>
    )
}

export default Login;