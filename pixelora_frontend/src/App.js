import React , {useEffect} from 'react'
import { Route, Routes , useNavigate } from 'react-router-dom'
import Home from './container/Home'
import Login from './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);
  
  return (
    <Routes>
      <Route path="/login" element={
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <Login />
        </GoogleOAuthProvider>
        } />
      <Route path="/*" element={<Home />} />
      
    </Routes>
  )
}

export default App

