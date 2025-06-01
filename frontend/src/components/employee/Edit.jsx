import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utilities/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    })
    const [departments, setDepartments] = useState(null)
    const navigate =useNavigate();
    const {id} =useParams();

     useEffect(() => {
              const getDepartments =async()=>{
              const departments = await fetchDepartments()
              setDepartments(departments);
            };
            getDepartments();
        }, [])

     useEffect(() => {
       const fetchEmployee =async()=>{
        
    //    setDepLoading(true)
        try{
          const response =await axios.get(`http://localhost:3000/api/employee/${id}`,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
          if(response.data.success){
            const employee = response.data.employee
             setEmployee((prev) => ({...prev,
                name: employee.userId.name,
                maritalStatus: employee.maritalStatus,
                designation: employee.designation,
                salary: employee.salary,
                department: employee.department
             }))
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }
       
       }
      fetchEmployee();
      
    }, [])

    const handleChange = (e) => {
        const {name, value}= e.target ;    
          setEmployee((prevData) => ({...prevData, [name] : value}))
        }
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
    

         try{
           const response =await axios.put(`http://localhost:3000/api/employee/${id}`,employee,{
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
    <>{departments && employee ? (
    <div className=" max-w-6xl mx-auto mt-1 p-8 bg-white shadow-2xl rounded-2xl " >
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
        Edit Employee
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
            value={employee.name}
            onChange={handleChange}
            placeholder="Insert Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          />
        </div>



  


        {/* Marital Status */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            value={employee.maritalStatus}
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
            value={employee.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          required
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
         required
          />
        </div>

          {/* Department */}
        <div className='col-span-2'>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Department</label>
          <select
            
            name="department"
            onChange={handleChange}
             value={employee.department}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"  
         required
         >
            <option  value="">Select Department</option>
            {departments.map((dep)=> {
              return  <option className='' key={dep._id} value={dep._id}>{dep.dep_name}</option>
            })}
         </select>
        </div>

  

        {/* Empty div to balance grid */}
        <div></div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
          <button
            type="submit"
            className="bg-teal-800 text-white font-medium px-10 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
    ): <div>Loading....</div>}</>

  );
}

export default Edit;