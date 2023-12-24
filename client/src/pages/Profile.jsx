import { useState ,useRef,useEffect } from 'react';
import {getDownloadURL, getStorage ,list,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { useSelector } from 'react-redux'
import { updateUserSuccess,updateUserFailure,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
export default function Profile() {
  const {currentUser,loading,error}= useSelector((state)=>state.user);
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [showListingsError,setShowListingsError]=useState(false);
  const [userListings,setUserListings]=useState([]);
  const dispatch= useDispatch();

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);


  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName =new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress= (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) =>{
          setFormData({ ...formData , avatar: downloadURL});
        }
      );
    }
    );
  };

  const handleChange=(e)=>{
    setFormData({ ...formData , [e.target.id] : e.target.value });
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data =await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message))
    }
  };



  const handleDeleteUser= async ()=>{
    try{
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      });
      const data =await  res.json();
      if(data.success=== false){
        dispatch(deleteUserFailure(data.messgae));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async ()=>{
    try{
      dispatch(signOutUserStart());
      const res= await fetch('/api/auth/signout');
      const data=await res.json();
      if(data.success=== false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    }
    catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings= async (e)=>{
    try{
      setShowListingsError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data=await res.json();
      if(data.success=== false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    }
    catch(error){
      setShowListingsError(true);
    }
  };

  const handleListingDelete =async (listingId) =>{
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method :'DELETE',
    });
    const data= await res.json();
    if(data.success === false ){
      console.log(data.message);
      return;
    }
    setUserListings((prev)=> prev.filter((listing) => listing._id !== listingId));
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input hidden 
        onChange={(e)=>setFile(e.target.files[0])}
        type='file' 
        ref={fileRef} 
        accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} 
        src={formData?.avatar || currentUser.avatar} alt='profile' 
        className="rounded-full h-24 w-24  object-cover cursor-pointer self-center mt-2" />
        <p className='text-sm self-center'>
          { 
          fileUploadError ? (
            <span className='text-red-700'>Upload Size Error. Image nust be less than 2mb</span>
          ): filePerc > 0 && filePerc < 100 ? (
            <span className='text-purple-700  '>
              {`Uploading ${filePerc}%`}
            </span>)
            : filePerc === 100 ?( 
                <span className='text-green-700'>
                  Successfully Uploaded !
                </span>
            ):
            ( '' )
          }
        </p>
        <input className='border p-3 rounded-lg' type='text' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='email' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='password' placeholder='password' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-purple-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80 '>
          
          {loading ? 'Loading ...' : 'Update'}
          
          </button>

          <Link to="/create-listing" className='bg-green-600 p-3 mt-3 mb-3 uppercase text-white rounded hover:opacity-95 disabled:opacity-80 text-center'>
            Create Listing
          </Link> 


      </form>
      <div className='flex justify-between  mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
         Sign Out
        </span>
      </div>
    <p className="text-red-700   mt-5">{error?"Invalid response. Please Retry":" "}</p>
    <p className="text-green-600   mt-5">{updateSuccess?"User is updated Successfully":" "}</p>
    <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
    <p className="text-red-700 mt-5">
      {showListingsError?"Error showing the listings":''}
      </p>
      {
        userListings && userListings.length>0  &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-4 text-2xl font-semibold '>Your Listings</h1>
        {
        userListings.map((listing)=>(
          <div className ='gap-4 border rouded-lg flex items-center justify-between p-3' key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
              <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt='listing image'/>

            </Link>
            <Link  className='text-purple-700  font-semibold flex-1 hover:underline  truncate' to={`/listing/${listing._id}`}>
              <p >{listing.name}</p>
            </Link>
            <div className=' flex flex-col item-center'>
              <button onClick={()=>handleListingDelete(listing._id)}className='text-red-700 uppercase'>
                Delete</button>
                <button className='text-green-700 uppercase'>
                  Edit
                </button>
            </div>
          </div>
        
        ))
        }
        </div>
        }
    </div>
  );
}
//Rules to be changed to make read and write in github
/*
      allow read;
      allow write: if 
      request.resource.size <2*1024*1024 &&
      request.resource.contentType.matches('image/.*');
*/

//para tag is somewhat problematic