import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utilities/EmployeeHelper.jsx';
import DataTable from 'react-data-table-component';
import axios from 'axios';



const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployee, setFilteredEmployee] = useState([])

     useEffect(()=>{

       const fetchEmployees =async()=>{

        setEmpLoading(true)
        try{
          const response =await axios.get('https://ems-project-backend.onrender.com/api/employee',{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          });

          console.log(response.data)
          if(response.data.success){
            let sno=1;
           const data = await response.data.employees.map((emp)=>(
            {
               _id: emp._id,
               sno: sno++,
               dep_name: emp.department ? emp.department.dep_name : "N/A",
               name: emp.userId ? emp.userId.name : "N/A",
               dob: emp.dob ? new Date(emp.dob).toLocaleDateString(): "N/A",
               profileImage: <img  className="w-10 h-10 rounded-full object-cover" src={`http://localhost:3000/${emp.userId.profileImage}`}></img> ,
               action: (<EmployeeButtons Id={emp._id}></EmployeeButtons>)
           }
          ))

          setEmployees(data);
          setFilteredEmployee(data);
          }
        }catch(error){

          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }
        finally{
          setEmpLoading(false)
        }
       }
       fetchEmployees();
      },[])
   

      const handleFilter = (e) =>{
        const records = employees.filter((emp) => {
          return  emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
      setFilteredEmployee(records);
      }

  return (
     <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Employees</h3>
        </div>

        <div className='flex justify-between items-center'>
           <input type='text' placeholder="Search By Employee Name"
            // className='px-4 py-0.5 border'
            className='w-full md:w-64 px-4 py-2 border border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-700 placeholder-gray-400 transition duration-300'
            onChange={handleFilter} 
            ></input>
            <Link to="/admin-dashboard/add-employee" 
           // className='px-4 py-1 bg-teal-600 rounded text-white'
            className='px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm transition duration-300'
           >Add New Employee</Link>
        </div>
         
          <div className='mt-5'>
        <DataTable pagination  striped   columns={columns} data={filteredEmployee}></DataTable>
         </div> 

    </div>
  )
}

export default List
