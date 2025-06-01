import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'


const Detail = () => {
    const {id} =useParams();
    const [leave, setLeave] = useState(null)
    const navigate =useNavigate();

    useEffect(() => {
       const fetchLeave =async()=>{
        
    //    setDepLoading(true)
        try{
          const response =await axios.get(`https://ems-project-backend.onrender.com/api/leave/detail/${id}`,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
          
          if(response.data.success){
         console.log("Leave detail:", response.data.leave);  // <-- yaha
           
             setLeave(response.data.leave)
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }
       
       }
      fetchLeave();
      
    }, [])
    
//   return (
//           {/* <img src={`http://localhost:3000/${employee.userId.profileImage}`} alt=''></img> */}
   
//   )

    const changeStatus =async(id,status)=>{
  try{
          const response =await axios.put(`https://ems-project-backend.onrender.com/api/leave/${id}`,{status},
            {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
          
          if(response.data.success){
            navigate('/admin-dashboard/leaves')
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }      
    }

return (
    <>{leave ? (
//   <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
//     <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl w-full">
//       <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
//         Employee Details
//       </h2>

//       <div className="flex flex-col md:flex-row items-center gap-10">
        
//         {/* Profile Image */}
//         <div className="w-60 h-60">
//           <img
//             src={`http://localhost:3000/${employee.userId.profileImage}`}
//             alt="Employee"
//             className="w-full h-full object-cover rounded-full border-4 border-teal-600 shadow-md"
//           />
//         </div>

//         {/* Details Section */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">

//           <div>
//             <h4 className="text-sm text-gray-500">Name</h4>
//             <p className="text-lg font-semibold">{employee.userId.name}</p>
//           </div>

//           <div>
//             <h4 className="text-sm text-gray-500">Employee ID</h4>
//             <p className="text-lg font-semibold">{employee.employeeId}</p>
//           </div>

//           <div>
//             <h4 className="text-sm text-gray-500">Date of Birth</h4>
//             <p className="text-lg font-semibold">{new Date(employee.dob).toDateString()}</p>
//           </div>

//           <div>
//             <h4 className="text-sm text-gray-500">Gender</h4>
//             <p className="text-lg font-semibold">{employee.gender}</p>
//           </div>

//           <div>
//             <h4 className="text-sm text-gray-500">Department</h4>
//             <p className="text-lg font-semibold">{employee.department.dep_name? employee.department.dep_name : "N/A"}</p>
//           </div>

//           <div>
//             <h4 className="text-sm text-gray-500">Marital Status</h4>
//             <p className="text-lg font-semibold">{employee.maritalStatus}</p>
//           </div>

//         </div>
//       </div>
//     </div>
//   </div>
    
    // <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
    //     <h2 className='text-2xl font-bold mb-8 text-center'>
    //         Employee Deatils
    //     </h2>
    //     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    //         <div>
    //             <img
    //             src={`http://localhost:3000/${employee.userId.profileImage}`} 
    //              className='rounded-full border w-72'

    //             >
    //             </img>
    //         </div>
    //         <div>
    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Name:</p>
    //                 <p className='font-medium'>{employee.userId.name}</p>
    //             </div>
   

    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Employee ID:</p>
    //                 <p className='font-medium'>{employee.employeeId}</p>
    //             </div>
    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Date of Birth:</p>
    //                 <p className='font-medium'>
    //                     {new Date(employee.dob).toLocaleDateString()}
    //                 </p>
    //             </div>
    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Gender:</p>
    //                 <p className='font-medium'>{employee.gender}</p>
    //             </div>
    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Department:</p>
    //                 <p className='font-medium'>{employee.department.dep_name}</p>
    //             </div>
    //             <div className='flex space-x-3 mb-5'>
    //                 <p className='text-lg font-bold'>Marital Status:</p>
    //                 <p className='font-medium'>{employee.maritalStatus}</p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
//  <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
//   <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
//     Employee Details
//   </h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//     <div className="flex justify-center">
//       <img
//         src={`http://localhost:3000/${employee.userId.profileImage}`}
//         alt={`${employee.userId.name} profile`}
//         className="rounded-full border-4 border-gray-300 shadow-md w-64 h-64 object-cover"
//       />
//     </div>
//     <div className="space-y-5 text-gray-700 font-medium text-lg">
//       <div className="flex space-x-3 items-center">
//         <p className="font-semibold w-36">Name:</p>
//         <p>{employee.userId.name}</p>
//       </div>

//       <div className="flex space-x-4 items-center">
//         <p className="font-semibold w-36">Employee ID:</p>
//         <p>{employee.employeeId}</p>
//       </div>

//       <div className="flex space-x-4 items-center">
//         <p className="font-semibold w-36">Date of Birth:</p>
//         <p>{new Date(employee.dob).toLocaleDateString()}</p>
//       </div>

//       <div className="flex space-x-4 items-center">
//         <p className="font-semibold w-36">Gender:</p>
//         <p>{employee.gender}</p>
//       </div>

//       <div className="flex space-x-4 items-center">
//         <p className="font-semibold w-36">Department:</p>
//         <p>{employee.department.dep_name}</p>
//       </div>

//       <div className="flex space-x-4 items-center">
//         <p className="font-semibold w-36">Marital Status:</p>
//         <p>{employee.maritalStatus}</p>
//       </div>
//     </div>
//   </div>
// </div>

<div className="max-w-3xl mx-auto mt-4 bg-white p-8 py-12 rounded-lg shadow-lg border border-gray-200 min-h-[500px] border-l-8 border-teal-600">
  <h2 className="text-3xl font-semibold mb-9 text-center text-teal-800 tracking-wide">
    Leave Details
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="flex justify-center">
      <img
        src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
        alt={`${leave.employeeId.userId.name} profile`}
        className="rounded-full border-4 border-gray-300 shadow-md w-64 h-64 object-cover"
      />
    </div>
    <div className="space-y-6 text-gray-700 font-medium text-lg">
      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Name : </p>
         <p>{leave.employeeId.userId.name}</p> 
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Employee ID  : </p>
        <p>{leave.employeeId.employeeId}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Leave Type  : </p>
        <p>{leave.leaveType}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Reason  : </p>
        <p>{leave.reason}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Department  : </p>
        <p>{leave.employeeId.department.dep_name}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">Start Date  : </p>
        <p>{new Date(leave.startDate).toLocaleDateString()}</p>
      </div>

     <div className="flex space-x-3 mb-5">
        <p className="font-semibold w-36">End Date  : </p>
        <p>{new Date(leave.endDate).toLocaleDateString()}</p>
      </div>




      {/* <div className="flex space-x-1 mb-2">
        <p className="font-semibold w-36">
            {leave.status === "Pending" ? "Action : " : "Status :"} 
            </p>
            {leave.status === "Pending" ? (
                <div className='flex-space-x-1 '>

                <button className="px-1 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Approve</button>
                <button className="px-1 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Reject</button>
                </div>
            ): 
              <p>{leave.status}</p>
          }
      </div> */}


      <div className="flex space-x-1 mb-2">
       <p className="font-semibold w-36">
        {leave.status === "Pending" ? "Action : " : "Status :"} 
       </p>
        {leave.status === "Pending" ? (
     <div className="flex space-x-1 flex-1 max-w-xs"> 
         <button className="flex-1 px-1 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
         
        onClick={()=> changeStatus(leave._id, "Approved")}
        
        >Approve
        </button>
        <button className="flex-1 px-1 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        onClick={()=> changeStatus(leave._id, "Rejected")}
        >Reject
         </button>
       </div>
       ) : (
        <p>{leave.status}</p>
       )}
    </div>

    </div>
  </div>
</div>

  ): <div>Loading...</div>}</>
);

}

export default Detail
