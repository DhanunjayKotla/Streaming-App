import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import Home from './components/Home'
import Error from './components/Error'
import Video from './components/Video'
import Login from './components/Login'
import Signup from './components/Signup'

const cookies = new Cookies();

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={cookies.get('mycat') ? <Home /> : <Navigate to="/login" />} />
      <Route path="/video/*" element={<Video />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )

}

export default App
