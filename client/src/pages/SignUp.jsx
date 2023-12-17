import {Link } from 'react-router-dom';
export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8 p-3'>
        SignUp
      </h1>
      <form className=" flex flex-col gap-4 p-3 ">
        <input className="border p-3 rounded-lg"type="text" placeholder='username' id="username"/>
        <input className="border p-3 rounded-lg"type="text" placeholder='email' id="email"/>
        <input className="border p-3 rounded-lg"type="text" placeholder='password' id="password"/>
      <button className="bg-purple-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity:80">Sign Up</button>
      </form>
      <div className="p-3 max-wlg mx-auto flex gap-3 mt-5">
        <p>Have an account already?</p>
        <Link to="/sign-in" className="">
          <span className="text-blue-700  flex">Sign in</span>
        </Link>
      </div>
    </div>
  )
}
