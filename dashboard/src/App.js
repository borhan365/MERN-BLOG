import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Login />
      <div className='main-dashboard'>
        <div className='dashboard-sidebar'>
          <Sidebar />
        </div>
        <div className='dashboard-wrapper'>
            <Header />
          <div className='dashboard-body'>
            <Home />
          </div>
        </div>
      </div>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
