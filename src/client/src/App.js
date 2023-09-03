import './App.css';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import BlogPost from './pages/BlogPost';

function App() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/get-admin-token")
    .then((res) => res.json())
    .then((data) => {
        const adminToken = data.adminToken;
        if (adminToken === token) {
            setIsAdmin(true);
        }
    })
    .catch((err) => {
        console.error(err)
    });
  }, [isAdmin])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} adminToken={token} />} />
        <Route path="/new" element={<CreatePost isAdmin={isAdmin} adminToken={token} />} />
        <Route path="/update/:id" element={<UpdatePost isAdmin={isAdmin} adminToken={token} />} />
        <Route path="/:id" element={<BlogPost isAdmin={isAdmin} adminToken={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
