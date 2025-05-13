import { useReducer,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import confirmPassReducer from "../reducers/ResetPasswordReducer";
import { passwordReducer } from "../reducers/SignupReducer";
import { resetPassword } from "../apis/AuthApis";



function ResetPassword(){

    const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
            value:"",
            error:""
    })

    const [confirmPassState,dispatchConfirmPass]=useReducer(confirmPassReducer,{
        value:"",
        error:""
    })

    const [token,setToken]=useState();
    const [backendError,setBackendError]=useState('');
    const [isSubmitted,setIsSubmitted]=useState(false);
    const isValid= !confirmPassState.error && !passwordState.error && !confirmPassState.value.trim()==""
    && !passwordState.value.trim()=="";

    useEffect(()=>{
        const url = new URL(window.location.href);
        const tokenFromUrl = url.searchParams.get('token');
        setToken(tokenFromUrl)

    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        //email sent to backend from where it returns the message to be shown.
        if(isValid)
        {
            const newPass={
                newPass:passwordState.value
            };
        
              try {
                const response = await resetPassword(token,newPass);
                  setIsSubmitted(true);
              } catch (error) {
                  console.error('Signup Error:', error);
                  const backendMessage = error.response.data.message;
                  setBackendError(backendMessage);
              }
        }
    }

    //Password Added/Changed
    const handlePasswordChange=(e)=>{
        dispatchPassword({type:"CHANGE", value:e.target.value}) 

        //incase confirm password is already set call the reducer of confirm again
        if (confirmPassState.value.trim() !== "") {
            dispatchConfirmPass({
                type: "CHANGE",
                value: confirmPassState.value,
                matchWith: e.target.value
            });
        }
    }
    

    return( //Form returned when isSubmitted is False, form not submitted yet.
        <>
        {!isSubmitted && (<form className="card" onSubmit={handleSubmit}>
            <input type="password" name="password" placeholder="Password" value={passwordState.value} className="input"
                onChange={handlePasswordChange}
            />
            {passwordState?.error && (
                <p className="error-prompt">{passwordState.error}</p>
            )}

            <input type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassState.value} className="input"
                onChange={(e) =>
                    dispatchConfirmPass({ type: "CHANGE", value: e.target.value , matchWith: passwordState.value })
                }
            />
            {confirmPassState?.error && (
                <p className="error-prompt">{confirmPassState.error}</p>
            )}

            <button type="submit" disabled={!isValid} >Submit</button>
        </form>
        )}
        {isSubmitted && ( //Return the message if the Form is successfully submitted.
            <>
          <p>Password Reset Successfully!! You can now <Link to="/login">login</Link>!

          </p>
          </>
        )}
        
        
        </>
    )

}

export default ResetPassword;