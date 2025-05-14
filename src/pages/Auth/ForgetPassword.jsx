import { useReducer,useState } from "react";
import { Link } from "react-router-dom";
import emailReducer from "../../reducers/ForgetPasswordReducer";
import { emailRegex } from "../../constants";
import { forgetPassword } from "../../apis/AuthApis";
import axios from "axios";
//Forget password function
function ForgetPassword(){

    const [emailState,dispatchEmail]=useReducer(emailReducer,{
            value:"",
            error:""
    })

    const [isSubmitted,setIsSubmitted]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const isValid= emailRegex.test(emailState.value) && !emailState.error;

    const handleSubmit= async(e)=>{
        e.preventDefault();
        //email sent to backend from where it returns the message to be shown.
        if(isValid)
        {
            const email = {
                email: emailState.value,
            };
              try {
                const response = await forgetPassword(email,setIsLoading)
                  setIsSubmitted(true);
                  setIsLoading(false);
              } catch (error) {
                    setIsLoading(false);
                  console.error('Signup Error:', error);
              }
            
        }
    }
    

    return( //Login FORM RETURNED when isSubmitted is False.
        <> 
        {isLoading && <p>Loading....Please wait</p>}
        {!isSubmitted && !isLoading && (<form className="card" onSubmit={handleSubmit}>
            <p>Enter your email for getting reset password link</p>
            <input type="email" name="email" placeholder="Email" value={emailState.value} className="input"
                onChange={(e) =>
                    dispatchEmail({ type: "CHANGE", value: e.target.value })
                }
            />
            { (
                <p className="error-prompt">{emailState.error || '\u00A0'}</p>
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