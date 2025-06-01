import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user,logout} =useAuth()
//   return (
//     <div className='flex justify-between h-12 bg-teal-500'>
//         <p>Welcome {user.name}</p>
//         <button>Logout</button>
//     </div>
//   )
  return (
    <div className="w-full">
      {/* Top Teal Bar */}
      <div className="bg-teal-800 text-white  px-6 py-5.5 flex justify-between items-center shadow-sm">
        <p className="text-lg font-bold text-xl">Welcome, {user?.name}</p>
         <button className=" cursor-pointer bg-white text-teal-800 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-200"
          onClick={logout}
         >
          Logout
        </button>
      </div>

      {/* Bottom Gray Strip (Optional if you want it) */}
      <div className="bg-gray-100 h-2"></div>
    </div>
  )
}

export default Navbar