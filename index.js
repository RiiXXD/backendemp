const cors=require('cors');
const express=require('express');
const { redirect } = require("react-router-dom");

const UserController=require('./controllers/User.controller')
const EmployeeController=require('./controllers/Employee.controller')
const connection = require('./configs/db')

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());




app.use("/user",UserController)
app.use("/employee",EmployeeController)
app.get("/", async (req,res)=>{
  res.status(200).json(
    {endpoints:{
    "user":{
    "/login":"login",
    "/sign":"Sign up",
},}});
 
})





app.listen(process.env.Port,async()=>{
  try{
     connection;
     console.log("Connection Established With DB");
  }
  catch(e){console.log("Error While Connecting To Database",e);
  }
  console.log('listening on',process.env.Port);  
})