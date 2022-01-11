
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';
import Single from './pages/Single';
import Category from './pages/Category';
import AddNewPost from './pages/AddNewPost';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { Context } from './context/Context';
import EditPost from './pages/EditPost';

function App() {

  const {user} = useContext(Context);

  return (
    <>
    <BrowserRouter>

    <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:catid" element={<Category />} />
        <Route path="/addnewpost" element={user ? <AddNewPost /> : <Login />} />
        <Route path="/edit/:id" element={user ? <EditPost /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<Single />} />
      </Routes>

    <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;
