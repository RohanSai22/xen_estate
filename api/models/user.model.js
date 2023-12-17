//creating user Model
import mongoose from 'mongoose';

//user data entry to database with requirements
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true,});
//time of creation and updation of users
var User= mongoose.model('User',userSchema);
export default User;