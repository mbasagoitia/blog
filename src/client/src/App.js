import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import BlogPost from './pages/BlogPost';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
