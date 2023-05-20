import React from 'react'

const PostSkeletion = () => {
  return (
    <div className="animate-pulse post mb-3 w-full ">
      <div className="user-data my-3 flex items-center justify-between">
        <div className="flex">
          <div className="w-12  rounded-full h-12 bg-slate-200"></div>
            
          <div className="ml-3 flex  items-center justify-start">
            <h2 className="text-lg p-0 font-medium h-6 rounded-md w-40 bg-slate-200"></h2>
            <small className="p-0 text-xs"></small>
          </div>
        </div>
        <div className="relative  rounded-full p-1 " >
            <div className='h-[25px] w-[25px] bg-slate-200 rounded-full'></div>
        </div>
      </div>
      <div className='w-full h-5 bg-slate-200 mb-3'></div>
      <div className="text-sm w-full mb-2 h-36 p-3  rounded-lg bg-slate-200"></div>
      <div className="img-section rounded-xl  cursor-pointer object-cover w-full">
        <img src={''} alt="" className="rounded-xl " />
      </div>
      <div className="like-section flex items-center justify-between mt-3   w-full ">
        <div className="flex ">
          <div className="like flex items-center">
          <div className='h-[28px] w-[28px] bg-slate-200 rounded-full'></div>
            
            
          </div>
          <div className="comment ml-5 flex items-center">
          <div className='h-[28px] w-[28px] bg-slate-200 rounded-full'></div>

          </div>
        </div>
        <div>
          <div className='h-[25px] w-[25px] bg-slate-200 rounded-full'></div>

          
        </div>
      </div>
    </div>
  )
}

export default PostSkeletion