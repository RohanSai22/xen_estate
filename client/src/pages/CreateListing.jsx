import React from 'react'

export default function CreateListing() {
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
                    <input className='p-3 border border-grey-300 rounded w-full' type='file' id ='images' accept='image/*' multiple/>
                    <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button className=' p-3 bg-orange-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity:80 ' >Create Listing</button>
            </div>
        </form>
    </main>
    
  )
}
//if we want both divs to occupy same space when screen size is increased or decreased then we use flex as flex-1 flex-1 for every div which we need for flex
