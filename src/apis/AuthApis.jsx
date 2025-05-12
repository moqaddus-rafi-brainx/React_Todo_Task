import axios from "axios";

const AuthUrl=import.meta.env.VITE_AUTH_URL;

export const forgetPassword=async(email)=>{
    return axios.post(`${AuthUrl}/forgot-password`, email);
}

export const login=async(loginData)=>{
    return await axios.post(`${AuthUrl}/login`, loginData);
}

export const resetPassword=async(token,newPass)=>{
    return  axios.patch(`${AuthUrl}/reset-password?token=${token}`, newPass);
}

export const signup=async(signupData)=>{
    return  axios.post(`${AuthUrl}/signup`, signupData);
}

export const verifyEmail=async(token)=>{
    return axios.get(`${AuthUrl}/verify?token=${token}`);
}