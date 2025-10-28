import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './Pages/Registration'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Nav from './Component/Nav'
import { userDataContext } from './Context/UserContext'
import About from './Pages/About'
import Collections from './Pages/Collections'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import ProductDetail from './Pages/productDetails'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/placeOrder'

import Order from './Pages/Order'





function App() {
  let {userData} = useContext(userDataContext)
   
  return (
    <>
    
     < Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/collection' element={<Collections/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/productdetail/:productId' element={<ProductDetail/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/placeOrder' element={<PlaceOrder/>}/>
        <Route path='/order' element={<Order/>}/>



      </Routes>
    </>
  )
}

export default App



 