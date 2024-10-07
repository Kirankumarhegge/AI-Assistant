import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './components/Login.jsx';
import { gapi } from 'gapi-script';
import SignUp from './components/SignUp';
import UpdateProfile from './components/UpdateProfile.jsx';
import ChatBot from './components/ChatBot.jsx';
import { googleClientId } from './utils/util.js';

function App() {

  useEffect(() => {
    function start () {
      gapi.client.init({
        clientId : googleClientId,
        scope : ""
      })
    }

    gapi.load('client:auth2', start)
  }) 


  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/updateprofile" element={<UpdateProfile />}></Route>
            <Route path="/chatBot" element={<ChatBot />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App