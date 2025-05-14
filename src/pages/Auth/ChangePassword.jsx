import { useReducer, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confirmPassReducer from "../../reducers/ResetPasswordReducer";
import { passwordReducer } from "../../reducers/SignupReducer";
import { changePassword } from "../../apis/AuthApis";
import { useNavigate } from 'react-router-dom';



function ChangePassword() {
    const [currPassState, dispatchCurrPass] = useReducer(passwordReducer, {
        value: "",
        error: ""
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: "",
        error: ""
    });

    const [confirmPassState, dispatchConfirmPass] = useReducer(confirmPassReducer, {
        value: "",
        error: ""
    });

    const [token, setToken] = useState();
    const [backendError, setBackendError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  


    const isValid =
        !currPassState.error &&
        !passwordState.error &&
        !confirmPassState.error &&
        currPassState.value.trim() !== "" &&
        passwordState.value.trim() !== "" &&
        confirmPassState.value.trim() !== "";


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            const payload = {
                currPass: currPassState.value,
                newPass: passwordState.value
            };

            try {
                await changePassword(token, payload);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Reset Password Error:', error);
                const backendMessage = error.response?.data?.message || 'Something went wrong';
                setBackendError(backendMessage);
            }
        }
    };

    const handlePasswordChange = (e) => {
        dispatchPassword({ type: "CHANGE", value: e.target.value });

        if (confirmPassState.value.trim() !== "") {
            dispatchConfirmPass({
                type: "CHANGE",
                value: confirmPassState.value,
                matchWith: e.target.value
            });
        }
    };

    const handleGoBack=()=>{
        navigate('/task-list')
    }

    return (
        <>
            {!isSubmitted && (
                <form className="card" onSubmit={handleSubmit}>
                    <input
                        type="password"
                        name="currPass"
                        placeholder="Current Password"
                        value={currPassState.value}
                        className="input"
                        onChange={(e) =>
                            dispatchCurrPass({ type: "CHANGE", value: e.target.value })
                        }
                    />
                    <p className="error-prompt">{currPassState.error || '\u00A0'}</p>

                    <input
                        type="password"
                        name="newPass"
                        placeholder="New Password"
                        value={passwordState.value}
                        className="input"
                        onChange={handlePasswordChange}
                    />
                    <p className="error-prompt">{passwordState.error || '\u00A0'}</p>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassState.value}
                        className="input"
                        onChange={(e) =>
                            dispatchConfirmPass({
                                type: "CHANGE",
                                value: e.target.value,
                                matchWith: passwordState.value
                            })
                        }
                    />
                    <p className="error-prompt">{confirmPassState.error || '\u00A0'}</p>

                    {backendError && <p className="error-prompt">{backendError}</p>}
                    <div className="change-buttons">
                    <button type="submit" disabled={!isValid}>
                        Submit
                    </button>
                    <button onClick={handleGoBack}>
                    Cancel
                    </button>
                    </div>
                </form>
            )}

            {isSubmitted && (
                <>
                <p>
                    Password Changed Successfully!
                </p>
                <button onClick={handleGoBack}>
                    Back
                </button>
            </>
            )}
        </>
    );
}

export default ChangePassword;
