const mongoose=require('mongoose');
const EmployeeSchema=mongoose.Schema({firstName:{type:String, required:true,trim:true},lastName:{type:String, required:true,trim:true},email:{type:String, required:true,trim:true},department:{type:String, enum: ['Tech', 'Marketing','Operations'],required:true,trim:true},salary:{type:Number, required:true,trim:true}});
const EmployeeModel=mongoose.model("employee",EmployeeSchema);

module.exports=EmployeeModel;