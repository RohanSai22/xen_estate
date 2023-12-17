import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
  console.log('connected to db');
})
.catch((err)=>{
  console.log(err);
});
//we cannot use @ in the password of mongoDB if we want to use them then we need to utilize hex characters
//if we want to share it in github then we need to hide it

const app = express();//many methods to use app.listen is used to listen a port number
app.use(express.json());//allows json as input so we recive jsons of user details using post
app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
}
);
app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500//500-INTERNAL SERVER ERROR
  const message=err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});
//anything can be sent to client but it is not best practice[best practice is to create seperate api routes ]

//each time we change log in code we need to run server each time which is timeconsuming so we use package named nodemon --npm i nodemon
//after that we can write as nodemon api/index.js but best practice is to add script for that

/*
In package.json
node is required for the backend
"scripts": {
    "dev":"nodemon api/index.js",
    "start":"node api/index.js"
  },
*/

//VVVVVVVVVIIIIIIIIIIIIIIIIIIII:(very very important)
//use npm start if npm run dev is not working properly