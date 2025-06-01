import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utilities/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] =useState([])

  const onDepartmentDelete =  (id)=>{

      const data =  departments.filter(dep => dep._id !== id);
      setDepartments(data)
  }
  

  useEffect(()=>{
   const fetchDepartments =async()=>{
    setDepLoading(true)
    try{
      const response =await axios.get('http://localhost:3000/api/department',{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      if(response.data.success){
        let sno=1;
       const data = await response.data.departments.map((dep)=>(
        {
           _id: dep._id,
           sno: sno++,
           dep_name: dep.dep_name,
           action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={fetchDepartments}></DepartmentButtons>)
       }
      ))
      setDepartments(data);
      setFilteredDepartments(data);
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
    finally{
      setDepLoading(false)
    }
   }
   fetchDepartments();
  },[])
   
  const filterDepartments = (e)=>{
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilteredDepartments(records)
  }

  return (
     <>{depLoading ? <div>Loading....</div> : 
    <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Departments</h3>
        </div>

        <div className='flex justify-between items-center'>
           <input type='text' placeholder="Search By Department Name"
          //  className='px-4 py-0.5' 
           className='w-full md:w-64 px-4 py-2 border border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-700 placeholder-gray-400 transition duration-300'

           onChange={filterDepartments}></input>
           <Link to="/admin-dashboard/add-department" 
          // className='px-4 py-1 bg-teal-600 rounded text-white'
           className='px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition duration-300'

           >Add New Department</Link>
        </div>
         
          <div className='mt-5'>
        <DataTable pagination  striped   columns={columns} data={filteredDepartments}></DataTable>
         </div> 

    </div>
    }</>
  )
}

export default DepartmentList

{/* <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
  <h2 className="text-xl font-bold text-gray-800 mb-4">
    Department List
  </h2>
  <DataTable
    columns={columns}
    data={departments}
    pagination
    highlightOnHover
    striped
    responsive
    className="custom-table"
  />
</div> */}
 




