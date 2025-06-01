import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req ,res) =>{
    try{
        const {userId,leaveType,startDate,endDate,reason} =req.body;
        const employee =await Employee.findOne({userId})
        const newLeave =new Leave({
  
        employeeId: employee._id,leaveType,startDate,endDate,reason
  
        })
  
        await newLeave.save();
        return res.status(200).json({success: true})
      
      }catch(error){
        console.log(error.message)
         res.status(500).json({success: false,error: "leave addd server error"})
      }
}

const getLeave = async(req,res)=>{
      try{
       const {id} = req.params;
       let leaves = await Leave.find({employeeId: id})

       if(!leaves){
        const employee =await Employee.findOne({userId: id})
         leaves =await Leave.find({employeeId: employee._id}).populate('employeeId','employeeId')       
       }

       return res.status(200).json({success: true,leaves})
    }catch(error){
    return res.status(500).json({success: true, error: "salary get server error"})
   }
}

//server side 
const getLeaves =async(req,res)=>{
  try{
       const leaves =await Leave.find().populate({
        path: "employeeId",
        populate:[
           {path: 'department',
            select: "dep_name"
           },
           {
             path: 'userId',
             select: 'name'
           }
        ]
       })

      
       return res.status(200).json({success: true,leaves})
    }catch(error){
    return res.status(500).json({success: true, error: "salary get server error"})
   }   
}



const getLeaveDetail =async(req,res)=>{
try{
    const {id}=req.params;
       const leave =await Leave.findById({_id: id}).populate({
        path: "employeeId",
        populate:[
           {path: 'department',
            select: "dep_name"
           },
           {
             path: 'userId',
             select: 'name profileImage'
           }
        ]
       })

      
       return res.status(200).json({success: true,leave})
    }catch(error){
    return res.status(500).json({success: true, error: "leave get server error"})
   } 
}

const updateLeave =async(req,res)=>{
  try{
     const {id}=req.params;
     const leave =await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
     if(!leave){
     return res.status(404).json({success: true, error: "leave not founded"})
       
     }
      return res.status(200).json({success: true})
  
    }catch(error){
   // console.log(error.message)
    return res.status(500).json({success: false, error: "salary get server error"})
  }
}

export {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}