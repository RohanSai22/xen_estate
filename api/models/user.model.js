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
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
},
{timestamps:true}
);
//time of creation and updation of users
const User= mongoose.model('User',userSchema);
export default User;