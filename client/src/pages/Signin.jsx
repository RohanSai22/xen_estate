import { useState } from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';//using this we can dispatch the function that we have

import { signInStart ,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
export default function SignIn() {
  const [formData,setFormData]= useState({});
  const {loading,error}= useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res= await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success== false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/')
  }
  catch(error){
    dispatch(signInFailure(error.message));
  }
};
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8 p-3'>
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 p-3 ">
        <input className="border p-3 rounded-lg"type="text" placeholder='email' id="email" onChange={handleChange}/>
        <input className="border p-3 rounded-lg "type="password" placeholder='password' id="password" onChange={handleChange}/>
      <button disabled ={loading} className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity:80">
       {loading? 'loading...':'Sign In'}
       </button>
       <OAuth/>
      </form>
      <div className="p-3 max-wlg mx-auto flex gap-3 mt-5">
        <p>Do not have an account ?</p>
        <Link to="/sign-up">
          <span className="text-blue-700  flex">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600  flex p-3 mt-2">{error}</p>}
    </div>
  );
}
