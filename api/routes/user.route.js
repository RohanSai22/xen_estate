import express from 'express';
import { test } from '../controllers/user.controller.js';
const router=express.Router();
//to send data to database we use putrequest or postrequest
//get is just used to get information
router.get('/test',test);
    //this logic also need to be put into another file [it is called as controller]
export default router;