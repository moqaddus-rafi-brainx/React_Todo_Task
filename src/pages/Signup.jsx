import { useReducer,useState } from "react";
import { Link } from "react-router-dom";
import { usernameReducer,emailReducer,passwordReducer } from "../reducers/SignupReducer";
import { emailRegex } from "../constants/regex";
import { signup } from "../apis/AuthApis";



function Signup() {
    const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
        value: "",
        error: "",
    });


    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        error: "",
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        error: "",
    });

    const [isSubmitted,setIsSubmitted]=useState(false); //To render the page again when page its value changes
    const [signupError,setSignupError]=useState(''); //saves response errors

    //used for enabling/disabling the submit button
    const isValid = usernameState.value.trim() && emailRegex.test(emailState.value) &&
    passwordState.value.length >= 6 &&
    !usernameState.error &&
    !emailState.error &&
    !passwordState.error;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSignupError('');
        if (isValid) {
            const signupData = {
              username: usernameState.value,
              email: emailState.value,
              password: passwordState.value,
          };
          try {
              const response =await signup(signupData); //signup api call
              console.log('Server Response:', response.data);
              setIsSubmitted(true);
            } catch (error) {
              console.error('Signup Error:', error.response.data.message);
              setSignupError(error.response.data.message);
            }
    }
  };

    return (
        <>
    {!isSubmitted && (<form className="card"  onSubmit={handleSubmit}>
      <h2 >Signup</h2>
      {signupError && <p className="error-prompt">{signupError}</p>}
      <input type="text" name="username" placeholder="Username" value={usernameState.value} className="input"
        required onChange={(e) =>
          dispatchUsername({ type: "CHANGE", value: e.target.value })
        }
      />
      {usernameState.error && (
        <p className="error-prompt">{usernameState.error}</p>
      )}

      <input
        type="email" name="email" placeholder="Email" value={emailState.value} className="input"
        required onChange={(e) =>
          dispatchEmail({ type: "CHANGE", value: e.target.value })
        }
      />
      {emailState.error && (
        <p className="error-prompt">{emailState.error}</p>
      )}

      <input
        type="password" name="password" placeholder="Password" className="input"
        required value={passwordState.value}
        onChange={(e) =>
          dispatchPassword({ type: "CHANGE", value: e.target.value })
        }
      />
      {passwordState.error && (
        <p className="error-prompt">{passwordState.error}</p>
      )}

      <button type="submit" className="btn" disabled={!isValid}>
        Signup
      </button>

      <pre>
        Already registered? <Link to="/login">Login</Link>
      </pre>
    </form>
    )}
    {isSubmitted && ( //Return the message if the Form is successfully submitted.
            <>
          <p>Verification Email Sent Successfully! Click the link in the email to verify your email</p>
          </>
        )}
    </>
  );
}

export default Signup;