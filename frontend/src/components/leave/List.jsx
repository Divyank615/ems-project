import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const List = () => {
    let sno=1;
   // const {user}=useAuth()
    const [leaves, setLeaves] = useState(null)
   // const {empId} =useParams();
    const {id}=useParams();
    const {user} =useAuth();
    

     const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
       // setFilteredLeaves(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if(!leaves){
    return <div>Loading ...</div>
  }

  return (
    <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>

        <div className='flex justify-between items-center'>
           <input type='text' placeholder="Search By Leave Name"
            // className='px-4 py-0.5 border'
            className='w-full md:w-64 px-4 py-2 border border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-700 placeholder-gray-400 transition duration-300'
           // onChange={handleFilter} 
            ></input>

           {user.role === "employee" && 
            <Link to="/employee-dashboard/add-leave" 
                className='px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition duration-300'
               >Add New Leave</Link>
          }
        </div>
           
          {/* <div className='mt-5'>
        <DataTable pagination  striped   columns={columns} data={filteredEmployee}></DataTable>
         </div>  */}
        
        <div className='mt-8'> 
          <table className='min-w-full text-sm text-left text-gray-700 border'>
                <thead className='text-xs text-white uppercase bg-teal-700'>
                  <tr>
                    <th className='px-6 py-3'>S No</th>
                    <th className='px-6 py-3'>Leave Type</th>
                    <th className='px-6 py-3'>From</th>
                    <th className='px-6 py-3'>To</th>
                    <th className='px-6 py-3'>Description</th>
                    <th className='px-6 py-3'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className='bg-white even:bg-teal-50 border-b hover:bg-teal-100 transition-all'
                    >
                      <td className='px-6 py-3'>{sno++}</td>
                      <td className='px-6 py-3 font-medium'>{leave.leaveType}</td>
                      <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className='px-6 py-3'>{leave.reason}</td>
                      <td className='px-6 py-3'>{leave.status}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default List