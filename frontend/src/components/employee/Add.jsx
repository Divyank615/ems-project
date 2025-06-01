// // import React from 'react'

// // const Add = () => {
// //   return (
// //     <div>
// //         <h2>Add New Employee</h2>
// //             <form>
// //                 <div>
// //                     <div>
// //                         <label>
// //                             Name
// //                         </label>
// //                         <input
// //                         type='text'
// //                         name='name'
// //                         placeholder='Insert Name'
// //                          required>
// //                         </input>
// //                     </div>
// //                 </div>
// //             </form>
        
// //     </div>
// //   )
// // }

// // export default Add

import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utilities/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate =useNavigate();

    useEffect(() => {
          const getDepartments =async()=>{
          const departments = await fetchDepartments()
          setDepartments(departments);
        };
        getDepartments();
    }, [])

    const handleChange = (e)=>{
        const {name, value, files}= e.target  
        if(name === "image"){
            setFormData((prevData) => ({...prevData, [name] : files[0]}))
        }else{
            setFormData((prevData) => ({...prevData, [name] : value}))
        }
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        })

         try{
           const response =await axios.post("https://ems-project-backend.onrender.com/api/employee/add",formDataObj,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            }
           });
        //   console.log(response.data)
           if(response.data.success){
            navigate("/admin-dashboard/employees")
           }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    
  return (
    <div className=" max-w-6xl mx-auto mt-1 p-8 bg-white shadow-2xl rounded-2xl " >
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
        Add New Employee
      </h3>

      <form 
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Insert Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Insert Email"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
         required
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
         required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          >
            <option value="">Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            name="designation"
            onChange={handleChange}
            placeholder="Designation"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Department</label>
          <select
            
            name="department"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"  
         required
         >
            <option  value="">Select Department</option>
            {departments.map((dep)=> {
              return  <option className='' key={dep._id} value={dep._id}>{dep.dep_name}</option>
            })}
         </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Salary"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
         required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="******"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
             required
         />
        </div>

        {/* Role */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Role</label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            placeholder='Upload Image'
            accept="image/*"
            className="w-full file:px-5 file:py-3 file:rounded-xl file:border-0 file:bg-teal-100 file:text-teal-800 hover:file:bg-teal-200 transition"
         
          />
        </div>

        {/* Empty div to balance grid */}
        <div></div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
          <button
            type="submit"
            className="bg-teal-800 text-white font-medium px-10 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
          >
            + Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;

// import React from 'react';

// const Add = () => {
//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
//       <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
//         Add New Employee
//       </h3>

//       <form className="space-y-6">
//         {/* Name */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Insert Name"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Insert Email"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Employee ID */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Employee ID</label>
//           <input
//             type="text"
//             name="employeeId"
//             placeholder="Employee ID"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Date of Birth */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Gender</label>
//           <select
//             name="gender"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>

//         {/* Marital Status */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Marital Status</label>
//           <select
//             name="maritalStatus"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           >
//             <option value="">Select Status</option>
//             <option>Single</option>
//             <option>Married</option>
//           </select>
//         </div>

//         {/* Designation */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Designation</label>
//           <input
//             type="text"
//             name="designation"
//             placeholder="Designation"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Department */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Department</label>
//           <input
//             type="text"
//             name="department"
//             placeholder="Department"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Salary */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Salary</label>
//           <input
//             type="number"
//             name="salary"
//             placeholder="Salary"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           />
//         </div>

//         {/* Role */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Role</label>
//           <select
//             name="role"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           >
//             <option value="">Select Role</option>
//             <option>Admin</option>
//             <option>HR</option>
//             <option>Employee</option>
//           </select>
//         </div>

//         {/* Upload Image */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             className="w-full file:px-5 file:py-3 file:rounded-xl file:border-0 file:bg-teal-100 file:text-teal-800 hover:file:bg-teal-200 transition"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center pt-2">
//           <button
//             type="submit"
//             className="bg-teal-800 text-white font-medium px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
//           >
//             + Add Employee
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Add;
