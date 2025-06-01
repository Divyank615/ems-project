// import React from 'react'
// import SummaryCard from './SummaryCard'
// import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'

// const AdminSummary = () => {
//   return (
//     <div className='p-6'>
//          <h3 className='text-2xl font-bold'>Dashboard overview</h3>
//          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
//             <SummaryCard icon={<FaUsers></FaUsers>} text="Total Employees" number={13} color="bg-teal-700"></SummaryCard>
//             <SummaryCard icon={<FaBuilding></FaBuilding>} text="Total Departments" number={5} color="bg-yellow-700"></SummaryCard>
//             <SummaryCard icon={<FaMoneyBillWave></FaMoneyBillWave>} text="Monthly Salary" number="$654" color="bg-red-700"></SummaryCard>
//          </div>

//          <div className='mt-12'>
//             <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
//                <SummaryCard icon={<FaFileAlt></FaFileAlt>} text="Leave Applied" number={5} color="bg-teal-700"></SummaryCard>
//                <SummaryCard icon={<FaCheckCircle></FaCheckCircle>} text="Leave Approved" number={2} color="bg-green-700"></SummaryCard>
//                <SummaryCard icon={<FaHourglassHalf></FaHourglassHalf>} text="Leave Pending " number={4} color="bg-yellow-700"></SummaryCard>
//                <SummaryCard icon={<FaTimesCircle></FaTimesCircle>} text="Leave Rejected" number={1} color="bg-red-700"></SummaryCard>
//             </div>
//          </div>
//     </div>
//   )
// }

// export default AdminSummary

import React from 'react';
import SummaryCard from './SummaryCard';
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from 'react-icons/fa';

const AdminSummary = () => {
  return (
    <div className="p-6">
      {/* Section: Dashboard Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h3>
        <p className="text-sm text-gray-500">Quick summary of employee and department stats</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-teal-700" />
          <SummaryCard icon={<FaBuilding />} text="Total Departments" number={5} color="bg-yellow-700" />
          <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$654" color="bg-red-700" />
        </div>
      </div>

      {/* Section: Leave Details */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-12">
        <h4 className="text-center text-2xl font-bold text-gray-800">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-700" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-700" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-yellow-700" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-700" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
