import React from 'react'
import Home from './Pages/Home'
import {Routes, Route} from "react-router-dom"
import Lists from './Pages/Lists'
import Orders from './Pages/Orders'
import Login from './Pages/Login'
import Add from './Pages/Add'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
        <ToastContainer />
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/lists' element={<Lists/>} />
        <Route path='/orders' element={<Orders/>} />
        
        <Route path='/login' element={<Login/>} />


      </Routes>
    </div>
  )
}

export default App
