// import React from 'react'

// const AddDepartment = () => {
//   return (
//     <div>
//         <div>
//             <h3>Add Department</h3>
//             <form>
//                 <div>
//                     <label htmlFor='dep_name'>Department Name</label>
//                     <input type='text' placeholder='Enter Department Name'></input>
//                 </div>
//                 <div>
//                   <label htmlFor='description'>Description</label>
//                   <textarea name="description" placeholder='Description'></textarea>
//                 </div>
//                 <button>Add Department</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default AddDepartment

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {


    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    })

    const handleChange =(e)=>{
        const{name,value}= e.target
        setDepartment({...department, [name]: value})
    }
    const navigate =useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
    //    console.log(department);
        try{
           const response =await axios.post("http://localhost:3000/api/department/add",department,{
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            }
           });
        //   console.log(response.data)
           if(response.data.success){
            navigate("/admin-dashboard/departments")
           }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }


  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
        Add New Department
      </h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dep_name" className="block text-lg font-semibold text-gray-700 mb-2">
            Department Name
          </label>
          <input
            type="text"
            id="dep_name"
            name="dep_name"
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl h-36 resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          ></textarea>
        </div>

        <div className="flex justify-center pt-2">
          <button
          
            type="submit"
            className="bg-teal-800 text-white font-medium px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md"
          >
            + Add Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
