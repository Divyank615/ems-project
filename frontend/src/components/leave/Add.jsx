import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
 
//    return (
//     <div className=" max-w-6xl mx-auto mt-1 p-8 bg-white shadow-2xl rounded-2xl " >
//       <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
//         Request For a Leave
//       </h3>

//       <form 
//      // onSubmit={handleSubmit}
//       className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Leave Type */}

//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Leave Type</label>
//           <select
//             name="leave"
//           //  onChange={handleChange}
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           required
//           >
//             <option value="">Select Leave</option>
//             <option value="Sick Leave">Sick Leave</option>
//             <option value="Casual Leave">Casual Leave</option>
//             <option value="Annual Leave">Annual Leave</option>
//           </select>
//         </div>
      

//         {/* from date */}
      
      
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">From Date</label>
//           <input
//             type="date"
//             name="startDate"
//            // onChange={handleChange}
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           required
//           />
//         </div>


//         {/* to date */}
        
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">To Date</label>
//           <input
//             type="date"
//             name="endDate"
//            // onChange={handleChange}
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           required
//           />
//         </div>



//         {/* Description */}
//         <div>
//           <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
//           <textarea
            
//             name="reason"
//           //  onChange={handleChange}
//             placeholder="Reason"
//             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
//           required
//           />
//         </div>

//         {/* Empty div to balance grid */}
//         <div></div>

//         {/* Submit Button */}
//         <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
//           <button
//             type="submit"
//             className="bg-teal-800 text-white font-medium px-10 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
//           >
//             + Add Leave
//           </button>
//         </div>
//       </form>
//     </div>
//   );


const {user} =useAuth();
const navigate =useNavigate();

const [leave, setLeave] = useState({
    userId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''

});



useEffect(()=>{
    if(user && user._id) {
        setLeave(prev => ({ ...prev,userId: user._id}))
    }
},[user]);



const handleChange =(e)=>{
    const {name, value} =e.target
    setLeave((prevState)=>({...prevState,[name] : value}))

};

const handleSubmit =async(e) =>{
    e.preventDefault();
    try{
          const response =await axios.post(`http://localhost:3000/api/leave/add`,leave,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
          
          if(response.data.success){
           navigate('/employee-dashboard/leaves')
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        } 
}


return (
  <div className=" max-w-6xl mx-auto mt-1 p-8 bg-white shadow-2xl rounded-2xl ">
    <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
      Request For a Leave
    </h3>

    <form 
       onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6"
    >
      {/* Leave Type - Full Width */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Leave Type</label>
        <select
          name="leaveType"
           onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
        >
          <option value="">Select Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>
      </div>

      {/* From Date & To Date - Same Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">From Date</label>
          <input
            type="date"
            name="startDate"
             onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">To Date</label>
          <input
            type="date"
            name="endDate"
             onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
        </div>
      </div>

      {/* Description - Full Width */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          name="reason"
           onChange={handleChange}
          placeholder="Reason"
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-teal-800 text-white font-medium px-10 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
        >
          + Add Leave
        </button>
      </div>
    </form>
  </div>
);

}

export default Add