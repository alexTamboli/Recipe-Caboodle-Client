import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
