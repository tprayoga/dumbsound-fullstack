import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Addartis from '../pages/Addartis'
import Addmusic from '../pages/Addmusic'
import Home from '../pages/Home'
import Pay from '../pages/Pay'
import Transactions from '../pages/Transactions'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pay' element={<Pay/>}/>
      <Route path='/add-music' element={<Addmusic/>}/>
      <Route path='/add-artis' element={<Addartis/>}/>
      <Route path='/transaction' element={<Transactions/>}/>
    </Routes>
  )
}

export default Routers