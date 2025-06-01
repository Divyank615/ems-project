import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

const EmployeeDashboard = () => {
    
  return (
     <div className='flex'>
       <Sidebar></Sidebar>
       <div className=' flex-1 bg-gray-100 h-screen'>
           <Navbar></Navbar>
           {/* <AdminSummary></AdminSummary> */}
           <Outlet></Outlet>
       </div>
    </div>
  )
}

export default EmployeeDashboard