import axios from 'axios'
import React, { useState,useContext,createContext, useEffect } from 'react'


const userContext =createContext()


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    
        const verifyUser = async()=>{
            try{
              const token = localStorage.getItem("token")
        //      console.log("Verifying User...");
        //      console.log("Token found:", token);
              if(token){
              const response =await axios.get('https://ems-project-backend.onrender.com/api/auth/verify',{
                headers: {
                    "Authorization" : `Bearer ${token} `
                }
              });
            
             
              if(response.data.success){
                setUser(response.data.user)
                
              }
            }else{
                setUser(null)
            }
            }catch(error){
              console.log(error)
                if(error.response && !error.response.data.error){
                 setUser(null)
                }
            }finally{
                setLoading(false)
            }
        };
     useEffect(()=>{
        verifyUser()
    }, [])



    const login= async(user)=>{
        setUser(user);
    //      console.log("Login function called with user:", user);

      //  await verifyUser();
    }
    const logout =()=>{

       setUser(null)
       localStorage.removeItem("token")

    }

    

     



  return (
    <userContext.Provider value={{user,login,logout,loading}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth =()=> useContext(userContext)
export default AuthProvider
