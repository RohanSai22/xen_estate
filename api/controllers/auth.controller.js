import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errohandler } from '../utils/error.js';
export const signup= async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username,email,password:hashedpassword});
    try{
        await newUser.save();//it takes time depending on internet
        res.status(201).json("User craeted succesfully");
    }
    catch(error){
        next(errohandler(550,'error from function'));
    }
    console.log('done')
};