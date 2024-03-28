const {Router}=require("express");
const authorization=require("../middlewares/auth.middleware");
const EmployeeModel=require("../models/Employee.model");

const EmployeeController=Router();
EmployeeController.get("/test",(req,res)=>{
    if(req.session.user) res.json({user:req.session.user})
    else res.json("working")
  })
  EmployeeController.post("/employees",async (req,res)=>{
    try
    {
        const {firstName,lastName,email,department,salary}=req.body;
        const employee = new EmployeeModel({
            firstName,lastName,email,department,salary
        })
        await employee.save();
        res.json({message:"added"});
    }
    catch(err){
        console.log("error",err);
        res.json({message:err});
    }})
    EmployeeController.get("/",async (req,res)=>{
        try{
            const { page = 1, limit = 5 } = req.query;
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
           const employee = await EmployeeModel.find({}).skip((pageNumber - 1) * limitNumber)
           .limit(limitNumber);
           const total_count=await EmployeeModel.find({}).count();
               res.json({employee,total_count});
           }
       catch(e){console.log("error",e);
        res.json({message:e});}
    })
  module.exports=EmployeeController;