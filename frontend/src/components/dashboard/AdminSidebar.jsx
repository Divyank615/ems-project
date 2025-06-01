import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaTachometerAlt, FaUsers, FaBuilding,FaCalendarAlt, FaCogs, FaMoneyBillWave } from 'react-icons/fa'

const AdminSidebar = () => {
//   return (
//     <div>
//         <div>
//             <h3>Employee MS</h3>
//         </div>
//         <div>
//             <NavLink to="/admin-dashboard">
//                 <FaTachometerAlt></FaTachometerAlt>
//                 <span>Dashboard</span>
//             </NavLink>

//             <NavLink to="/admin-dashboard">
//                 <FaUsers></FaUsers>
//                 <span>Employees</span>
//             </NavLink>

//             <NavLink to="/admin-dashboard">
//                 <FaBuilding></FaBuilding>
//                 <span>Department</span>
//             </NavLink>

//             <NavLink to="/admin-dashboard">
//                 <FaCalendarAlt></FaCalendarAlt>
//                 <span>Leave</span>
//             </NavLink>

//             <NavLink to="/admin-dashboard">
//                 <FaMoneyBillWave></FaMoneyBillWave>
//                 <span>Salary</span>
//             </NavLink>

//             <NavLink to="/admin-dashboard">
//                 <FaCogs></FaCogs>
//                 <span>Settings</span>
//             </NavLink>
//         </div>
//     </div>
//   )
 return (
    <div className="  flex  flex-col  h-screen w-64  border-gray-300">
      {/* Header */}
      <div className="bg-teal-800 p-6 ">
        <h3 className="text-white text-3xl font-extrabold tracking-wide pacifico-regular">Employee MS</h3>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 bg-gray-300 flex flex-col space-y-3 px-3 py-6">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`   
          }
           end
        >
          <div className="text-lg"><FaTachometerAlt /></div>
          <span className="text-lg">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`
          }
        >
          <div className="text-lg"><FaUsers /></div>
          <span className="text-lg ">Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`
          }
        >
          <div className="text-lg"><FaBuilding /></div>
          <span className="text-lg">Department</span>
        </NavLink>

         <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`
          }
        >
          <div className="text-lg"><FaMoneyBillWave /></div>
          <span className="text-lg">Salary</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`
          }
        >
          <div className="text-lg"><FaCalendarAlt /></div>
          <span className="text-lg">Leave</span>
        </NavLink>

       

        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer
            transition duration-300 ease-in-out
            text-gray-800 hover:bg-teal-300 hover:text-teal-700
            ${isActive ? 'bg-teal-600 text-white font-semibold shadow-md' : ''}`
          }
        >
          <div className="text-lg"><FaCogs /></div>
          <span className="text-lg">Settings</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default AdminSidebar