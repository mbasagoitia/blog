import './App.css';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from './pages/BlogPost';
import Login from "./pages/Login";
import RegistrationForm from './pages/RegistrationForm';
import jwtDecode from "jwt-decode";

function App() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect (() => {
    
    const handleTokenChange = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.user);
  
        // Get token expiration time and current time
        const { exp } = decodedToken;
        const currentTime = Date.now();
        const timeUntilExpiration = exp*1000 - currentTime;
        
        // If token is in localStorage, but has expired, automatically log user out
        if (exp < currentTime) {
          localStorage.removeItem("token");
          setUser(null);
        } 
        
        // If token is in localStorage and has not yet expired, refresh the time until expiration
        if (timeUntilExpiration > 0) {
          setTimeout(() => {
            localStorage.removeItem("token");
            setUser(null);
          }, timeUntilExpiration);
        }
      }
    }
    
    window.addEventListener("userLogin", handleTokenChange);

    return () => {
      window.removeEventListener("userLogin", handleTokenChange);
    }
    
  }, [token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/new" element={<CreatePost user={user} />} />
        <Route path="/update/:id" element={<UpdatePost user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/register" element={<RegistrationForm user={user} />}></Route>
        <Route path="/:id" element={<BlogPost user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
