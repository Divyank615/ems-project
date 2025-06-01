
import './index.css'
import {BrowserRouter ,Routes, Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utilities/PrivateRoutes.jsx'
import RoleBasedRoutes from './utilities/RoleBasedRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'
import DepartmentList from './components/Departments/DepartmentList.jsx'
import AddDepartment from './components/Departments/AddDepartment.jsx'
import EditDepartment from './components/Departments/EditDepartment.jsx'
import List from './components/employee/List.jsx'
import Add from './components/employee/Add.jsx'
import View from './components/employee/View.jsx'
import Edit from './components/employee/Edit.jsx'
import AddSalary from './components/salary/Add.jsx'
import ViewSalary from './components/salary/View.jsx'
import SummaryCard from './components/EmployeeDashboard/Summary.jsx'
import LeaveList from './components/leave/List.jsx'
import AddLeave from './components/leave/Add.jsx'
import Setting from './components/EmployeeDashboard/Setting.jsx'
import Table from './components/leave/Table.jsx'
import Detail from './components/leave/Detail.jsx'


function App() {

  return ( 
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard"></Navigate>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/admin-dashboard" element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin"]}>
                  <AdminDashboard></AdminDashboard>
                </RoleBasedRoutes>
               </PrivateRoutes>
            }>

             <Route index element={<AdminSummary></AdminSummary>}></Route>
             <Route path='/admin-dashboard/departments' element={<DepartmentList></DepartmentList>}></Route>
             <Route path='/admin-dashboard/add-department' element={<AddDepartment></AddDepartment>}></Route>
             <Route path='/admin-dashboard/department/:id' element={<EditDepartment></EditDepartment>}></Route>


             <Route path='/admin-dashboard/employees' element={<List></List>}></Route>
             <Route path='/admin-dashboard/add-employee' element={<Add></Add>}></Route>
             <Route path='/admin-dashboard/employees/:id' element={<View></View>}></Route>
             <Route path='/admin-dashboard/employees/edit/:id' element={<Edit></Edit>}></Route>
             <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary></ViewSalary>}></Route>
             <Route path='/admin-dashboard/salary/add' element={<AddSalary></AddSalary>}></Route>
             <Route path='/admin-dashboard/leaves' element={<Table></Table>}></Route>
             <Route path='/admin-dashboard/leaves/:id' element={<Detail></Detail>}></Route>
             <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList></LeaveList>}></Route>
             <Route path='/admin-dashboard/setting' element={<Setting></Setting>}></Route>
             

           </Route>


            <Route path="/employee-dashboard" element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["employee"]}>
                   <EmployeeDashboard></EmployeeDashboard>
                 </RoleBasedRoutes>
               </PrivateRoutes>
              }>      
              <Route index element={<SummaryCard></SummaryCard>}></Route>
              <Route path="/employee-dashboard/profile/:id" element={<View></View>}></Route>
              <Route path="/employee-dashboard/leaves/:id" element={<LeaveList></LeaveList>}> </Route>     
              <Route path="/employee-dashboard/add-leave" element={<AddLeave></AddLeave>}> </Route>     
              <Route path="/employee-dashboard/salary/:id" element={<ViewSalary></ViewSalary>}> </Route>     
              <Route path="/employee-dashboard/setting" element={<Setting></Setting>}> </Route>     
   
           </Route>


         </Routes>
      </BrowserRouter>
  )
}

export default App
