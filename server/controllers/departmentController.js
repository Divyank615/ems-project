import Department from "../models/Department.js";

const addDepartment = async (req,res)=>{
// console.log("Add Department controller called");
//   console.log("Request body:", req.body);
    try{
    const {dep_name,description} =req.body;
    const newDep = new Department({
        dep_name,
        description
    })
    await newDep.save();
  //  console.log("Department saved:", newDep);
    return res.status(200).json({success: true,department: newDep})
    }catch(error){
        return res.status(500).json({success: false,error: "add department server error"})
    }
}

const getDepartments =async (req,res)=>{
  try{
    const departments =await Department.find()
    return res.status(200).json({success: true,departments})
  }catch(error){
  return res.status(500).json({success: false,error: "get department server error"})
         
  }
}

const getDepartment =async(req,res)=>{
    try{
      const {id}= req.params;
       const department = await Department.findById({_id: id})
       return res.status(200).json({success: true, department})
    }catch(error){
      return res.status(500).json({success: false ,error: "edit department server error"})
    }
}

const updateDepartment =async(req,res)=>{
   try{
      const {id}=req.params;
       const {dep_name, description}=req.body;
       const updateDep =await Department.findByIdAndUpdate({_id: id},{
         dep_name: dep_name,
         description: description
       })

       return res.status(200).json({success: true,updateDep})
   }catch(error){
    return res.status(500).json({success: false,error: "update department server error"})
   }
}

const deleteDepartment =async(req,res)=>{
    try{
       const {id}=req.params;
           console.log("Delete request received for id:", id);

       const deleteDep =await Department.findByIdAndDelete(id)
        if (!deleteDep) {
      console.log("Department not found with id:", id);
      return res.status(404).json({ success: false, error: "Department not found" });
    }
        console.log("Deleted department:", deleteDep);

       return res.status(200).json({success: true,deleteDep})
    }catch(error){
        return res.status(500).json({success: false,error: "delete department server error"})
    }
}

export {addDepartment,getDepartments,getDepartment,updateDepartment,deleteDepartment}
