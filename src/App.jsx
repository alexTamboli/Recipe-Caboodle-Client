import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import './App.css'
import Login from './components/accounts/Login';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
