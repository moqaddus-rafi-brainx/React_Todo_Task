import { Navigate} from "react-router-dom";

//Component to wrap protected route
export const ProtectedRoute=({children})=>{
    
    const token=localStorage.getItem('token');
    //if not logged in
    if(!token)
    {
        return <Navigate to='/login' replace />
    }
    //else return child
    return children;
}