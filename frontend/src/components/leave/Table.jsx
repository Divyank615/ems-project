import React, { useEffect, useState } from 'react'
import { EmployeeButtons } from '../../utilities/EmployeeHelper.jsx';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utilities/LeaveHelper.jsx';
import axios from 'axios';


const Table = () => {

    const [leaves, setLeaves] = useState([])
    const [filteredLeaves, setFilteredLeaves] = useState(null)
    
   const fetchLeaves =async() =>{
     try{
         const response =await axios.get('http://localhost:3000/api/leave',{
          headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
         });
     
     console.log(response.data)
     if(response.data.success){
       let sno=1;
      const data =  response.data.leaves.map((leave)=>(
       {
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId || "N/A",
                    name: leave.employeeId?.userId?.name || "N/A",
                    leaveType: leave.leaveType || "N/A",
                    department: leave.employeeId.department?.dep_name || "N/A",
                    days:
                    Math.abs(
                      Math.floor(
                       (new Date(leave.endDate) - new Date(leave.startDate)) /
                          (1000 * 60 * 60 * 24)
                          )
                         ) + 1,
                      status: leave.status || "N/A",
                    action: (<LeaveButtons Id={leave._id}></LeaveButtons>)
                 }
       ))
     
       setLeaves(data);
       console.log(data);
        setFilteredLeaves(data);
     }
    }catch(error){
     
       if(error.response && !error.response.data.success){
       alert(error.response.data.error)
      }
    }
   }

    useEffect(()=>{
  fetchLeaves();
    },[])

    const filterByInput=(e)=>{
      const data =leaves.filter(leave => 
        leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase()))
        setFilteredLeaves(data);
    }

    const filterByButton=(status)=>{
      const data =leaves.filter(leave => 
        leave.status
        .toLowerCase()
        .includes(status.toLowerCase()))
        setFilteredLeaves(data);
    }    
 

  return (
<>
    {filteredLeaves ? (
    <div className='p-5'>
         <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
           </div>
             <div className='flex justify-between items-center'>
                <input type='text' 
                placeholder="Search By Emp Id"
                    // className='px-4 py-0.5 border'
                 className='w-full md:w-64 px-4 py-2 border border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-700 placeholder-gray-400 transition duration-300'
                    onChange={filterByInput} 
                ></input>

              <div className='space-x-3'>
                <button className='px-4 py-2 bg-teal-800 cursor-pointer hover:bg-teal-600 text-white rounded-lg shadow-sm transition duration-300'
                 onClick={() => filterByButton("Pending")}>
                    Pending
                </button>


                <button className='px-4 py-2 bg-teal-800 cursor-pointer hover:bg-teal-600 text-white rounded-lg shadow-sm transition duration-300'
                   onClick={() => filterByButton("Approved")}>Approved
                </button>


                <button className='px-4 py-2 bg-teal-800 cursor-pointer hover:bg-teal-600 text-white rounded-lg shadow-sm transition duration-300'
                   onClick={() => filterByButton("Rejected")}>Rejected
                </button>
                </div>
                
            </div>


            <DataTable className='mt-5' pagination columns={columns} data={filteredLeaves || []} />

        </div>
    ) : (
         <div>Loading...</div>
    )}
 </>
  )
}

export default Table