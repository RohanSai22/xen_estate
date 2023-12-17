import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup= async (req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password, 10);
    const newUser=new User({username,email,password:hashedpassword});
    try{
        await newUser.save();//it takes time depending on internet
        res.status(201).json("User craeted succesfully");
    }
    catch(error){
        next(errorHandler(550,'error from function'));
    }
    console.log('done');
};
export const signin = async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found !'));
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(404,"Invalid Password"));
        //if both are correct then we need to authenticate the user which is done using adding a cookie inside browser[create hashed token of email/id and save this token inside browser cookies]
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const { password:pass, ...rest }= validUser._doc;
       res
       .cookie('access_token',token,{httpOnly:true,})
       .status(200)
       .json(rest);
       //if we want to limit our cookie we can do that by adding an argument in otherOptions {httpOnly:true,expires:new Date(Date.now()+24*60**60*1000)} in res.cookie

        //each user has unique id based on the id we can authenticate the user
    }//to verify data inside mongoose is findOne
    catch(error){
        next(error);
    }
}