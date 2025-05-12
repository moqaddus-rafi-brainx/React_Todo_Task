import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { verifyEmail } from "../apis/AuthApis";

function VerifyEmail(){
    const [token, setToken] = useState('');
    const [isVerified,setIsVerified]=useState(false);
    useEffect(() => {
        //Fetching token from url
        const url = new URL(window.location.href);
        const tokenFromUrl = url.searchParams.get('token');
        setToken(tokenFromUrl);
        sendToken()
      }, [token]);
      const sendToken=async()=>{
        try {
            const response = await verifyEmail(token); //api call function
            console.log('Verification success:', response.data);
            setIsVerified(true);// show success message to user
          } catch (error) {
            console.error('Verification failed:', error.response?.data || error.message);
            
          }
      }
    
    return(

        <div>
            {!isVerified && <p>Verifying please wait.....</p>}
            {isVerified && <p>Your email has been verified, you can now{' '} <Link to="/login">Login</Link></p>}
        </div>
    )
}

export default VerifyEmail;