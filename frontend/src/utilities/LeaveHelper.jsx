 import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns =[
    {  
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
     {  
        name: "Emp ID",
        selector: (row) => row.employeeId,
        //sortable: true,
        width: "150px"
    },
    {  
        name: "Name",
        selector: (row) => row.name,
        width: "150px"
       
    },
    {  
        name: "Leave Type",
        selector: (row) => row.leaveType,
         width: "160px"
       
    },
    {  
        name: "Department",
        selector: (row) => row.department,
     //   sortable: true,
        width: "170px"

    },
     {  
        name: "Days",
        selector: (row) => row.days,
        width: "120px"
       
    },
     {  
        name: "Status",
        selector: (row) => row.status,
        width: "160px"
       
    },
    
     {  
        name: "Action",
        selector: (row) => row.action,
        width: "120px"
      //  center: 'true'
     
    },

];

export const LeaveButtons =({ Id })=>{
    const navigate =useNavigate();

    const handleView =(id)=>{
        navigate(`/admin-dashboard/leaves/${id}`)
    }


return(
    <button
    className="px-4 py-1 bg-teal-800 cursor-pointer rounded text-white hover:bg-teal-600"
    onClick={()=> handleView(Id)}
    >View</button>
)
};