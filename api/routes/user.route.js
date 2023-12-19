import express from 'express';
import { test, updateUser,deleteUser, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();
//to send data to database we use putrequest or postrequest
//get is just used to get information
router.get('/test',test);
router.post('/update/:id', verifyToken ,updateUser);
router.delete('/delete/:id', verifyToken ,deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);
    //this logic also need to be put into another file [it is called as controller]
export default router;
