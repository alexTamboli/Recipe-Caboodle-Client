import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import './App.css'
import Login from './components/accounts/Login';
import Dashboard from './components/layouts/Dashboard';
import { useSelector } from 'react-redux';
import Loading from './components/layouts/Loading';
import PrivateRoute from './utils/PrivateRoute';
import Register from './components/accounts/Register';

function App() {

  const authLoading = useSelector(state => state.auth.loading);
  return (
    <>
      <Router>
        <Header />
        {authLoading ? <Loading /> :
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        }
      </Router>
    </>
  )
}

export default App
