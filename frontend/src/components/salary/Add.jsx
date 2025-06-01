import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utilities/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    })
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])


    const navigate =useNavigate();

     useEffect(() => {
              const getDepartments =async()=>{
              const departments = await fetchDepartments()
             
              setDepartments(departments);
            };
            getDepartments();
        }, [])

      const handleDepartment =async (e) =>{
            const empls = await getEmployees(e.target.value)
           //   console.log("Employees fetched for department:", empls);

            setEmployees(empls);

        }



    const handleChange = (e) => {
        const {name, value}= e.target ;   
     //     console.log(`handleChange called: ${name} = ${value}`);
 
          setSalary((prevData) => ({...prevData, [name] : value}))
        }
    

    const handleSubmit = async(e) => {
        e.preventDefault(); 

         try{
           const response =await axios.post(`https://ems-project-backend.onrender.com/api/salary/add`,salary,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            }
           });
          // console.log(response.data)
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
    <>{departments ? (
    <div className=" max-w-6xl mx-auto mt-1 p-8 bg-white shadow-2xl rounded-2xl " >
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 tracking-wide">
        Add Salary
      </h3>

      <form 
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6">
        

         {/* Department */}


        <div >
          <label className="block text-lg font-semibold text-gray-700 mb-2">Department</label>
            <select
             name="department"
             onChange={handleDepartment}
             className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"  
             required
            >
            <option  value="">Select Department</option>
            {departments.map((dep)=> {
              return  <option className='' key={dep._id} value={dep._id}>{dep.dep_name}</option>
            })}
           </select>
        </div>

         {/* employee */}
         <div >
          <label className="block text-lg font-semibold text-gray-700 mb-2">Employee</label>
          <select          
            name="employeeId"
            onChange={handleChange}
        //   onChange={(e) => console.log("Employee select changed:", e.target.value)}

            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"  
            required
          >
            <option  value="">Select Employee</option>

            {employees.map((emp)=> {
              return  <option className='' key={emp._id} value={emp._id}>{emp.userId?.name || emp.employeeId || "No name"}</option>
            })}
         </select>
        </div>
 

        {/*  basic Salary */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            onChange={handleChange}
            placeholder="Basic Salary"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
        </div>

        {/* Allowances */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Allowances</label>
          <input
            type="number"
            name="allowances"
            onChange={handleChange}
            placeholder="Allowances"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
        </div>

        {/* Deductions */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Deductions</label>
          <input
            type="number"
            name="deductions"
            onChange={handleChange}
            placeholder="Deductions"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
        </div>

        {/* Pay Date  */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Pay Date</label>
          <input
            type="date"
            name="payDate"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
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
            Add Salary
          </button>
        </div>
      </form>
    </div>
    ): <div>Loading....</div>}</>

  );
}

export default Add;
