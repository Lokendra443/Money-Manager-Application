import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/expense' element={<Expense/>}/>
          <Route path='/income' element={<Income/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/filter' element={<Filter/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

        </Routes>
      
      </BrowserRouter>
      
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App
