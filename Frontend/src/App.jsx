import React from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignin from './pages/CaptainSignin';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<UserLogin/>} />
        <Route path='/signup' element = {<UserSignup/>} />
        <Route path='/captain-login' element = {<CaptainLogin/>}/>
        <Route path='/captain-signup' element = {<CaptainSignin/>}/>
      </Routes>
    </div>
  )
}

export default App
