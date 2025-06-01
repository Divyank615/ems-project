// import React,{useState} from 'react'

// const ChangePasswordForm = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Add API call for password change
//     console.log("Old:", oldPassword, "New:", newPassword, "Confirm:", confirmPassword);
//   };

// const Setting = () => {
//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border border-teal-100">
//       <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Change Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
        
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Old Password</label>
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Confirm New Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition duration-200"
//         >
//           Change Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Setting;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Setting = () => {
    const navigate =useNavigate();
    const {user} =useAuth();
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
    
     const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [error,setError] =useState(null);

    const handleChange =(e) =>{
        const{name,value} =e.target;
        setSetting({...setting, [name]: value});
    }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Add API call for password change
//     console.log("Old:", oldPassword, "New:", newPassword, "Confirm:", confirmPassword);
//   };


  const handleSubmit = async(e) => {
        e.preventDefault(); 
       if(setting.newPassword != setting.confirmPassword){
        setError("password not matched !");
        
       }else{
         try{
           const response =await axios.put(`https://ems-project-backend.onrender.com/api/setting/change-password`,setting,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            }
           });
          // console.log(response.data)
           if(response.data.success){
            setError("")
           setTimeout(()=>{
            navigate("/Login?message=PasswordChanged")
           },250);
            
           }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }}


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border border-teal-100">
      <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-600 font-medium text-center">{error}</p>}

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Old Password</label>
          <input
            type="password"
            name='oldPassword'
            placeholder='Change Password'
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
             placeholder='Change Password'
             onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
