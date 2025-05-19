import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import { AppProvider } from './components/context'


function App() {  

  return (
  <AppProvider> 
   <div >
    <Router>
      <Routes>
        <Route path='/' element={ <Home/> } />
      </Routes>
    </Router>
    </div>
    </AppProvider>
  )
}

export default App
