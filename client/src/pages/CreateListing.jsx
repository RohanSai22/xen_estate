import { getDownloadURL, getStorage , ref ,uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase.js'; 
import React, { useState } from 'react'

export default function CreateListing() {
    const [files,setFiles]=useState([]);
    const [formData,setFormData]= useState({
        imageUrls:[],
    });

    const [imageUploadError, setImageUploadError] = useState(false);

    const [uploading,setUploading]= useState(false);

    console.log(formData);
    const handleImageSubmit = (e)=>{
        if(files.length>0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises=[];//we have more than 1 async behaviour so we need to wait for all of them and one by one image must be uploaded to storage

            for( let i=0;i<files.length;i++){
                promises.push(storeImage(files[i]));
            }
        Promise.all(promises).then((urls)=>{
            setFormData({ ...formData, 
                imageUrls: formData.imageUrls.concat(urls),
             });
        setImageUploadError(false);
        setUploading(false);
        }).catch((error)=>{
            setImageUploadError("Image Upload Failed (2 mb max for each image)");
            setUploading(false);
        });
        }
        else{
            setImageUploadError("You can upload only 6 images per listing");
            setUploading(false);
        }
    };

   /* const handleFileUpload=(file)=>{
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
      };*/

      
//storeImage is same as upload image in profile
    const storeImage= async (file)=>{
        return new Promise((resolve,reject)=>{
            const storage= getStorage(app);//to get storage of firebase
            const fileName= new Date().getTime() + file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask= uploadBytesResumable(storageRef,file);

            uploadTask.on(
                "state-changed",
                //her we can add progress of uploading images we can add it or not(Wrong ) we need to add snapshot even if we dont want to show progress
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(`Upload progess is ${progress}%`);
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    });
                },
            );
        });
    };

    const handleRemoveImage =(index) =>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i) => i!== index),
        })
    };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-center text-3xl my-7 font-bold'>Create a Listing</h1>
        <form className='flex  flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' className='rounded-lg p-3 border ' id='name' maxLength='62' minLength='10' required />
                <textarea type='text' placeholder='Description' className='rounded-lg p-3 border ' id='Description' required />
                <input type='text' placeholder='Address' className='rounded-lg p-3 border ' id='Address'  required />
                <div className='flex flex-wrap gap-6'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="sale" className='w-5 '/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="rent" className='w-5 '/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="parking" className='w-5 '/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                       
                        <input type='checkbox' id="furnished" className='w-5 '/>
                        <span>Furnished</span>
                        
                    </div>
                    <div className='flex gap-2'>
                
                        <input type='checkbox' id="offer" className='w-5 '/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input className='p-3  border border-gray-300 rounded-lg 'type='number' id='bedrooms' min='1' max='10'/>
                        <p >Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-300 rounded-lg 'type='number' id='bathrooms' min='1' max='10'/>
                        <p >Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-300 rounded-lg 'type='number' id='regularPrice' />
                        <div className='flex flex-col items-center'>

                        <p className=''>Regular Price</p>
                        <span>( Rs / month)</span>

                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-300 rounded-lg 'type='number' id='discountedPrice' />
                        <div className='flex flex-col items-center'>

                        <p className=''>Discounted Price</p>
                        <span>( Rs / month)</span>

                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-4 flex-1'> 
                <p className='flex flex-wrap font-semibold'>
                    Images:
                    <span className='ml-2 font-normal text-gray-700 '>
                        The first image will be the cover (max 6)
                    </span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-grey-300 rounded w-full' type='file' id ='images' accept='image/*' multiple/>
                    <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >{uploading? 'Uploading...' :'Upload'}</button>
                </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map( (url,idx) => (
                    <div key={url} className='flex justify-between p-3 border items-center'>
                    <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg'/>
                    <button type='button' onClick={()=>handleRemoveImage(idx)} className='p-3 rounde-lg uppercase hover:opacity-70 text-red-500'>Delete</button>
                    </div>
                ))
                }
            <button className=' p-3 bg-cyan-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity:80 ' >Create Listing</button>
            </div>
        </form>
    </main>
    
  )
};
//since button upload is inside a form we need to set its type to button by specifying  but if we specify that whole form will be submitted so we dont do that
//if we want both divs to occupy same space when screen size is increased or decreased then we use flex as flex-1 flex-1 for every div which we need for flex

                                            //This is the template to upload files from local storage to online storage of firebase 
 /* const handleFileUpload=(file)=>{
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
      };*/
//             Important : we need to add snapshot even if we dont want to show any progress



/*
                                How  to use the Map function:VVI
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map( (url) => (
                    <img src={url} alt='listing image' className='w-40 h-40 object-cover rounded-lg'/>
                ))
                }








*/