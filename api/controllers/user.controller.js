import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const test = (req,res)=>{
    res.json({
        message:'Api route is  not working ',
    });
    //this logic also need to be put into another file [it is called as controller]  
};
export const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own account'));
    try{
        if(req.body.password){
            req.body.password =bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                avatar:req.body.avatar,
                email:req.body.email,
            }//here  we can use req.body simply but in insomnia we can add as admin true as argument and a person can make himself admin just by sending that json post so we seperately enter them
            
        },{new : true})

        const {password, ...rest}= updatedUser._doc;

        res.status(200).json({rest});
    }
    catch(error){
        next(error);
    }
};

export const deleteUser= async (req,res,next) =>{
    if(req.user.id != req.params.id) return next(errorHandler(401,"You can only delete your own account"));
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message:"User has been deleted"});
    }
    catch(error){
        next(error);
    }

};


export const getUserListings = async (req,res,next)=>{
    
    if(req.user.id === req.params.id){
    try{
        const listings= await Listing.find({
            userRef : req.params.id,
        });
        res.status(200).json(listings);
        }
    catch(error){
        next(error);
        }
    }
    else{
        return next(errorHandler(401,"You can only view your own listings"));
    }

}