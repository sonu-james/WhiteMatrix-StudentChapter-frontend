import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
function App() {
  return (
 <>
<Routes>
    <Route path='/' element={<Auth/>}></Route>
    <Route path='/register' element={<Auth register/>}></Route>
     <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
    </Routes>
 </>
  )
}

export default App
