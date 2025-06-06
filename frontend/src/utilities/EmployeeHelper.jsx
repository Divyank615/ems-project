 import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns =[
    {  
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
     {  
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px"
    },
    {  
        name: "Image",
        selector: (row) => row.profileImage,
        width: "150px"
       
    },
    {  
        name: "Department",
        selector: (row) => row.dep_name,
         width: "170px"
       
    },
    {  
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "170px"

    },
    
     {  
        name: "Action",
        selector: (row) => row.action,
      //  center: 'true'
     
    },

]


 export const fetchDepartments =async()=>{
    let departments 
    try{
      const response =await axios.get('https://ems-project-backend.onrender.com/api/department',{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      if(response.data.success){
         departments = response.data.departments
       }
    
      }
    catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
    return departments
   };

   //employees fetching for salaary 

    export const getEmployees =async(id)=>{
    let employees;
    try{
      const response =await axios.get(`https://ems-project-backend.onrender.com/api/employee/department/${id}`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
    //  console.log(response)
      if(response.data.success){
         employees = response.data.employees
       }
    
      }
    catch(error){
      if(error.response && !error.response.data.success){

        alert(error.response.data.error)
      }
    }
    return employees
   };

   export const EmployeeButtons =({Id })=>{
    const navigate =useNavigate();

   
    return(
        <div className="flex space-x-4">
            <button 
            onClick={()=> navigate(`/admin-dashboard/employees/${Id}`)}
            className="px-3 py-1 rounded bg-teal-700 text-white cursor-pointer">View</button>
        
            <button className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
                onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}
                > Edit
            </button>

            <button className="px-3 py-1 rounded bg-yellow-600 text-white cursor-pointer"
                onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
                
                > Salary
            </button>

            <button className="px-3 py-1 rounded bg-red-400 text-white cursor-pointer"
               onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}

                > Leave
            </button>


        </div>
    )
}
