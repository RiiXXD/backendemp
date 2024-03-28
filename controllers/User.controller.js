const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserModel=require("../models/Authuser.model");
const { redirect } = require("react-router-dom");
const { authenticate } = require("passport");
const multer = require('multer');

require('dotenv').config()
const UserController=Router();
UserController.get("/test",(req,res)=>{
  if(req.session.user) res.json({user:req.session.user})
  else res.json("working")
})

UserController.post("/sign",async(req,res)=>{
    try{
        const{email, password}=req.body;

      const existingUser=await UserModel.findOne({email});
       if(existingUser){
        res.json("Already an user!")
       }
       else{ console.log(email, password);
        bcrypt.hash(password, 5, async function(err, hash) {
            if(hash){
                const user=new UserModel({
                email,
                password:hash,
                
            })
            await user.save();
         
            res.json({msg:"Sign Up!",isRegistered:true})
        }
            else if(err){
                res.json({msg:"Something went wrong!",isRegistered:false})
                console.log(err);
            }
            else{
                res.json("Invalid Credentials!");
               
            }
            
        });}
       
    }
    catch(e){console.log("error",e);}
})

UserController.post("/login",async (req,res)=>{
   try
   {
    const{ email, password}=req.body;
 
    const existingUser=await UserModel.findOne({email});
    if(existingUser){
    const cipher=existingUser.password;
    bcrypt.compare(password,cipher,(err,result)=>{
      if(err){
        res.json({msg:"Invalid credentials",error:err});
      }
      else if(result){
        const token=jwt.sign({userId:existingUser._id},process.env.EncryptionKey);
             res.json({msg:"Login Successful",user:{ email:existingUser._doc.email,id:existingUser._doc._id,token}})
      }
      else{
        res.json({msg:"Invalid credentials"});
      }
    })}
        
    else{
      res.json({msg:"Invalid credentials"})
    }}
       catch(e){
        console.log(e)
       }     
        
})







module.exports=UserController;