import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

 export const columns =[
    {  
        name: "S No",
        selector: (row) => row.sno
    },
     {  
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
     {  
        name: "Action",
        selector: (row) => row.action
    },

]

export const DepartmentButtons =({Id , onDepartmentDelete})=>{
    const navigate =useNavigate();

    const handleDelete= async()=>{
          console.log("Deleting department with Id:", Id);  // Add this line

    const confirm =window.confirm("Do you want to delete this department")
        
        if(confirm){
      
        try{  
             const response =await axios.delete(`https://ems-project-backend.onrender.com/api/department/${Id}`,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
          if(response.data.success){
              onDepartmentDelete()
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        }
     } 
    };
    return(
        <div className="flex space-x-4">
            <button 
            onClick={()=> navigate(`/admin-dashboard/department/${Id}`)}
            className="px-3 py-1 rounded bg-teal-600 text-white cursor-pointer">Edit</button>
        
            <button className="px-3 py-1 rounded bg-red-600 text-white cursor-pointer"
                
               onClick ={() => handleDelete(Id)}  
                > Delete
            </button>
        </div>
    )
}
