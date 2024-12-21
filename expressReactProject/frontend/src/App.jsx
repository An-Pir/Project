import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { getToken } from './utils/auth'
import Registration from './components/Registration'
import Login from './components/Login'
import Main from './components/Main'
import Header from './components/Header'
import NewProduct from './components/NewProductForm'
import Cart from './components/Cart'


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Registration /></PrivateRoute>} />
        <Route path="/products/new" element={<PrivateRoute><NewProduct /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App
