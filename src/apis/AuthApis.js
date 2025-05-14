import axios from "axios";

const AuthUrl=import.meta.env.VITE_AUTH_URL;

export const forgetPassword=async(email,setIsLoading)=>{
    setIsLoading(true);
    return axios.post(`${AuthUrl}/forgot-password`, email);
}

export const login=async(loginData,setIsLoading)=>{
    setIsLoading(true);
    return await axios.post(`${AuthUrl}/login`, loginData);
}

export const resetPassword=async(token,newPass)=>{
    return  axios.patch(`${AuthUrl}/reset-password?token=${token}`, newPass);
}

export const signup=async(signupData,setIsLoading)=>{
    setIsLoading(true);
    return  axios.post(`${AuthUrl}/signup`, signupData);
}

export const verifyEmail=async(token)=>{
    return axios.get(`${AuthUrl}/verify?token=${token}`);
}

export const changePassword=async(token,data)=>{
    return  axios.patch(`${AuthUrl}/change-password`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}