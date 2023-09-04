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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect (() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
      console.log(userRole);
    }
    // possible problems here?
  }, [isLoggedIn, userRole])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
