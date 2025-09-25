import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
function App() {
  return (
 <>
<Routes>
    <Route path='/' element={<Auth/>}></Route>
    <Route path='/register' element={<Auth register/>}></Route>
     <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
 </>
  )
}

export default App
