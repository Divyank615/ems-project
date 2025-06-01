import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const login =async(req,res) =>{
  //  console.log("Request body:", req.body); 

  try{
     const {email,password} =req.body;
      //   console.log("Login attempt:", email, password);

     const user =await User.findOne({email})
     if(!user){
      return  res.status(404).json({success: false, error: "User Not Found"})
     }

      //   console.log("User password hash:", user.password);
     
          if (!password || !user.password) {
      return res.status(400).json({ success: false, error: "Password data missing" });
    }

     const isMatch =await bcrypt.compare(password, user.password)
     if(!isMatch){
     return res.status(404).json({success: false, error: "Wrong Pasword"})

     }
    
     const token = jwt.sign({_id: user._id, role: user.role},
        process.env.JWT_KEY,{expiresIn: "10d"}
     )
     
    return res.status(200).json({success:true, token ,user: {_id: user._id,name: user.name,role: user.role}})
      
  }catch(error){
        console.log("Login error:", error);

    // console.log(error);
   return res.status(200).json({success: false,error: error.message})
  }
}

const verify =(req,res) =>{
    return res.status(200).json({success: true,user: req.user})
}

export {login,verify}