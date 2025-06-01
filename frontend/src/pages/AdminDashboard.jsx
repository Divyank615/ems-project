import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'
import AdminSummary from '../components/dashboard/AdminSummary.jsx'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {
    const {user} =useAuth()


    // if (loading) {
    //      return <div>Loading ...</div>
    // }
    // if(!user){
    //     navigate('/login')
    // }

  return (
    <div className='flex'>
       <AdminSidebar></AdminSidebar>
       <div className=' flex-1 bg-gray-100 h-screen'>
           <Navbar></Navbar>
           {/* <AdminSummary></AdminSummary> */}
           <Outlet></Outlet>
       </div>
    </div>
  )
}

export default AdminDashboard