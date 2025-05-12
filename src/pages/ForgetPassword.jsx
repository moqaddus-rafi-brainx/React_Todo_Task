import { useReducer,useState } from "react";
import { Link } from "react-router-dom";
import emailReducer from "../reducers/ForgetPasswordReducer";
import { emailRegex } from "../constants/regex";
import { forgetPassword } from "../apis/AuthApis";
import axios from "axios";
//Forget password function
function ForgetPassword(){

    const [emailState,dispatchEmail]=useReducer(emailReducer,{
            value:"",
            error:""
    })

    const [isSubmitted,setIsSubmitted]=useState(false);
    const isValid= emailRegex.test(emailState.value) && !emailState.error;

    const handleSubmit= async(e)=>{
        e.preventDefault();
        //email sent to backend from where it returns the message to be shown.
        if(isValid)
        {
            const email = {
                email: emailState.value,
            };
            console.log(email);
              try {
                const response = await forgetPassword(email)
                  console.log('Server Response:', response.data);
                  setIsSubmitted(true);
              } catch (error) {
                  console.error('Signup Error:', error);
              }
            
        }
    }
    

    return( //Login FORM RETURNED when isSubmitted is False.
        <> 
        {!isSubmitted && (<form className="card" onSubmit={handleSubmit}>
            <p>Enter your email for getting reset password link</p>
            <input type="email" name="email" placeholder="Email" value={emailState.value} className="input"
                onChange={(e) =>
                    dispatchEmail({ type: "CHANGE", value: e.target.value })
                }
            />
            {emailState?.error && (
                <p className="error-prompt">{emailState.error}</p>
            )}
            
            <button type="submit" disabled={!isValid} >Submit</button>
            <pre>
                Back to  <Link to="/login" >Login</Link>
            </pre>
        </form>
        )}
        {isSubmitted && ( //Return this message if form submitted and link sent
            <div className="forget-message">
            <h2>Reset Password Link Sent</h2>
          <p>Check your email and click the link to reset your password.</p>
          </div>
        )}
        
        
        </>
    )

}

export default ForgetPassword;