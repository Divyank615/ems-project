// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

// const View = () => {
   
//    const [salaries, setSalaries] = useState(null)
//    const [filteredSalaries, setFilteredSalaries] = useState(null)
//    const {id}= useParams();

//    const fetchSalaries =async()=>{
        
//     //    setDepLoading(true)
//         try{
//           const response =await axios.get(`http://localhost:3000/api/salary/${id}`,{
//             headers: {
//               "Authorization": `Bearer ${localStorage.getItem("token")}`
//               }
//           });
//           console.log(response.data)
//           if(response.data.success){
//              setSalaries(response.data.salary)
//              setFilteredSalaries(response.data.salary);
//           }
//         }catch(error){
//           if(error.response && !error.response.data.success){
//             alert(error.response.data.error)
//           }
//         }
//     }
   
//     useEffect(()=> {
//         fetchSalaries();
//     },[]);

//    const filterSalaries = (q) =>{
//         const filteredRecords = employees.filter((leave) => {
//           return  leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
//         })
//       setFilteredSalaries(filteredRecords);
//       }
    

//   return (
//     <>
//     {filteredSalaries === null ? (
//         <div>Loading....</div>
//     ) : (
//         <div className='overflow-x-auto p-5'>
//             <div className='text-center'>
//                 <h2 className='text-2xl font-bold'>Salary History</h2>
//             </div>
//             <div className='flex justify-end my-3'>
//                 <input type='text'
//                 placeholder='Search By Emp Id'
//                 className=''
//                 onChange={filterSalaries}
//                 >
//                 </input>
//             </div>

//             {filteredSalaries.length>0 ?(
//               <table className='w-full text-sm text-left text-gray-500' >
//                 <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
//                     <tr>
//                         <th className='px-6 py-3'>S No</th>
//                         <th className='px-6 py-3'>Emp Id</th>
//                         <th className='px-6 py-3'>Salary</th>
//                         <th className='px-6 py-3'>Allowance</th>
//                         <th className='px-6 py-3'>Deduction</th>
//                         <th className='px-6 py-3'>Total</th>
//                         <th className='px-6 py-3'>Pay Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                    {filterSalaries.map((salary)=>(
//                     <tr 
//                     key ={salary.id}
//                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
//                     >
//                      <td className='px-6 py-3'>{sno++}</td>
//                      <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
//                      <td className='px-6 py-3'>{salary.basicSalary}</td>
//                      <td className='px-6 py-3'>{salary.allowance}</td>
//                      <td className='px-6 py-3'>{salary.deduction}</td>
//                      <td className='px-6 py-3'>{salary.netSalary}</td>
//                      <td className='px-6 py-3'>{newDate(salary.payDate).toLocaleDateString()}</td>
//                     </tr>
//                    ))}
//                 </tbody>
//               </table> 
//             ): <div>No records Found !</div>
//         </div>
//      )}   
//     </>


    
//   );
  
// };

// export default View;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno =1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://ems-project-backend.onrender.com/api/salary/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

//   return (
//     <>
//       {filteredSalaries === null ? (
//         <div>Loading....</div>
//       ) : (
//         <div className='overflow-x-auto p-5'>
//           <div className='text-center'>
//             <h2 className='text-2xl font-bold'>Salary History</h2>
//           </div>
//           <div className='flex justify-end my-3'>
//             <input
//               type='text'
//               placeholder='Search By Emp Id'
//               className='border px-3 py-1 rounded'
//               onChange={filterSalaries}
//             />
//           </div>

//           {filteredSalaries.length > 0 ? (
//             <table className='w-full text-sm text-left text-gray-500'>
//               <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
//                 <tr>
//                   <th className='px-6 py-3'>S No</th>
//                   <th className='px-6 py-3'>Emp Id</th>
//                   <th className='px-6 py-3'>Salary</th>
//                   <th className='px-6 py-3'>Allowance</th>
//                   <th className='px-6 py-3'>Deduction</th>
//                   <th className='px-6 py-3'>Total</th>
//                   <th className='px-6 py-3'>Pay Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSalaries.map((salary) => (
//                   <tr
//                     key={salary._id}
//                     className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
//                   >
//                     <td className='px-6 py-3'>{sno++}</td>
//                     <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
//                     <td className='px-6 py-3'>{salary.basicSalary}</td>
//                     <td className='px-6 py-3'>{salary.allowances}</td>
//                     <td className='px-6 py-3'>{salary.deductions}</td>
//                     <td className='px-6 py-3'>{salary.netSalary}</td>
//                     <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div>No records Found!</div>
//           )}
//         </div>
//       )}
//     </>
//   );

return (
  <>
    {filteredSalaries === null ? (
      <div className='text-center text-lg font-semibold text-gray-600 mt-10'>
        Loading...
      </div>
    ) : (
      <div className='w-full px-4 md:px-10 lg:px-20 xl:px-32 py-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl font-bold text-teal-800'>Salary History</h2>
          </div>

          <div className='flex justify-end mb-4'>
            <input
              type='text'
              placeholder='Search By Emp Id'
              className='w-full md:w-64 px-4 py-2 border border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-700 placeholder-gray-400 transition duration-300'              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm text-left text-gray-700 border'>
                <thead className='text-xs text-white uppercase bg-teal-700'>
                  <tr>
                    <th className='px-6 py-3'>S No</th>
                    <th className='px-6 py-3'>Emp Id</th>
                    <th className='px-6 py-3'>Salary</th>
                    <th className='px-6 py-3'>Allowance</th>
                    <th className='px-6 py-3'>Deduction</th>
                    <th className='px-6 py-3'>Total</th>
                    <th className='px-6 py-3'>Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary._id}
                      className='bg-white even:bg-teal-50 border-b hover:bg-teal-100 transition-all'
                    >
                      <td className='px-6 py-3'>{sno++}</td>
                      <td className='px-6 py-3 font-medium'>{salary.employeeId.employeeId}</td>
                      <td className='px-6 py-3'>₹{salary.basicSalary}</td>
                      <td className='px-6 py-3'>₹{salary.allowances}</td>
                      <td className='px-6 py-3'>₹{salary.deductions}</td>
                      <td className='px-6 py-3 font-semibold text-teal-700'>₹{salary.netSalary}</td>
                      <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-center text-gray-500 mt-4'>No records Found!</div>
          )}
        </div>
      </div>
    )}
  </>
);



};



export default View;
