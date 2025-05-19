import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import VerifyEmail from './pages/Auth/VerifyEmail';
import ChangePassword from './pages/Auth/ChangePassword';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  return (
    <div className='pages'>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/task-list" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
    </Routes>
    </div>
  )
}

export default App