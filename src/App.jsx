import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router'
import Home from './pages/Home'
import TodoList from './pages/TodosList'
import { login } from './services/login.service'

const App = () => {
  let loginRes = login()
  console.log(loginRes);
  
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/todos" element={<TodoList/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App