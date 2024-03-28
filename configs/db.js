const mongoose = require('mongoose');
// const CommentModel=require('../models/Comment.model')
// const RecipeModel=require('../models/Recipe.model') 
// const UserModel=require('../models/User.model')
const UserModel=require('../models/Authuser.model');
require('dotenv').config();
const connection=mongoose.connect(`${process.env.MONGO_URL}EmployeeDb`);

module.exports=connection;