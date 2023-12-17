import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const signup= async (req,res)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username,email,password:hashedpassword});
    try{
        await newUser.save()//it takes time depending on internet
        res.status(201).json("User craeted succesfully");
    }
    catch(error){
        res.status(500).json(error.message);
    }
    console.log('done')
};