import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from "react";

import AppContext from "./context/AppContext";

import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Community } from './pages/Community';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';

function App() {
  const { setUsers, token, setToken } = useContext(AppContext)

  const isUserLoggedIn = (localStorage.getItem('loggedIn') === 'true');
  console.log(isUserLoggedIn)

  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    // Forçar a atualização da página quando o estado de login mudar
    setForceUpdate(prev => !prev);
  }, [isUserLoggedIn]);
  
  console.log(token, 'login')

  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/community' element={isUserLoggedIn ? <Community /> : <Navigate to='/register' />} />
          <Route path='/profile/:id' element={ isUserLoggedIn ?<Profile /> : <Navigate to='/register' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
