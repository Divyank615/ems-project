import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


// const Login = () => {
//   return (
    // <div>
    //     <h2>Employee Management System</h2>
    //     <form>
    //         <h2>Login</h2>
    //         <div>
    //           <label htmlFor='email'>Email</label>
    //           <input type='email' placeholder='Enter your Email'></input>
    //         </div>

    //          <div>
    //           <label htmlFor='password'>password</label>
    //           <input type='password' placeholder='********'></input>
    //         </div>

    //         <button>Login</button>
    //     </form>
    // </div>
 
//   )
// };


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} =useAuth()
    const navigate =useNavigate()
    const location =useLocation()
    const queryParams =new URLSearchParams(location.search);
    const message =queryParams.get("message");

    const handleSubmit = async(e)=>{

        e.preventDefault()
     //   debugger;
      //    console.log("Login button clicked"); 
      //     console.log({ email, password });  

        try{
           const response =await axios.post("http://localhost:3000/api/auth/login",{email,password});
         //      console.log("Response from backend:", response.data);

         if(response.data.success){
         //   alert("Successfully Login")
           login(response.data.user)
           localStorage.setItem("token",response.data.token)
          // console.log("Token saved in localStorage:", localStorage.getItem("token"));

         //  console.log("Token set:", response.data.token)
         //  console.log("User after login:", response.data.user)
           if(response.data.user.role === "admin"){
            navigate("/admin-dashboard")
           }else{
            navigate("/employee-dashboard")
           }
         }
        }catch(error){
              console.error("Login error:", error);

           if(error.response && !error.response.data.success){
            setError(error.response.data.error)
           }else{
            setError("server error");
           }
        }
    }

  return (
    <main className="relative h-screen w-full bg-white">
      {/* Upper half teal */}
      <div className="h-1/2 bg-teal-500 w-full"></div>

      {/* Lower half white */}
      <div className="h-1/2 bg-white w-full"></div>

      {/* Page Title - Employee Management System */}
      <h1 className=" pacifico-regular absolute top-14 left-1/2 -translate-x-1/2 text-4xl font-extrabold text-teal-950 tracking-wide">
        Employee Management System
      </h1>

      {/* Centered login card overlapping both halves */}
      <div className="absolute top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl shadow-2xl border border-teal-200 p-10">
        <h2 className="text-teal-600 font-semibold text-3xl mb-8 text-center">Login</h2>
         {error && <p className='text-red-500'>{error}</p>}
        
         {/* {message === "PasswordChanged" && (
           <p className="text-green-600 mb-4 text-center font-medium">
             Password changed successfully.Login again.
           </p> 
          )} */}
          {message === "PasswordChanged" && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-3 shadow-sm animate-fade-in-down">
           <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
         </svg>
        <span className="font-medium">Password changed successfully. Login Again .</span>
      </div>
      )}


        <form className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-teal-600 mb-2 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-3 border border-teal-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-teal-600 mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              className="w-full px-4 py-3 border border-teal-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              onChange={e=>setPassword(e.target.value)}
              required
           />
          </div>

         
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2 text-teal-600">
              <input type="checkbox" className="h-4 w-4 rounded border-teal-300 focus:ring-2 focus:ring-teal-300" />
              Remember me
            </label>

             {/* <button
              type="button"
              className="text-teal-600 hover:underline focus:outline-none"
            > 
              Forgot Password?
            </button> */}
            <a href='#' className="text-teal-600 hover:underline focus:outline-none">
                 Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-all font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login

