import React from 'react'

const PostCardLoader = () => {
  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-sm shadow-gray-300">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse transition-all duration-500"></div>
          <div className="flex flex-col items-start gap-2">
            <div className="w-20 rounded-full bg-gray-600 animate-pulse transition-all duration-500 h-4"></div>
            <div className="w-24 rounded-full bg-gray-600 animate-pulse transition-all duration-500 h-3"></div>
          </div>
        </div>

        <div className="h-4 w-1 rounded-full bg-gray-400 animate-pulse"></div>
      </div>

      <div className="h-3 w-[90%] mt-5 rounded-full bg-gray-700 animate-pulse"></div>
      <div className="h-3 w-[80%] mt-2 rounded-full bg-gray-700 animate-pulse"></div>
      <div className="w-full h-52 mt-4 rounded-xl bg-gray-400 animate-pulse"></div>
      <div className='w-full h-[1px] bg-gray-200 mt-3'></div>
      <div className='mt-3 flex items-center gap-4 w-full'>
        <div className='h-7 w-8 rounded-lg bg-gray-400 animate-pulse'></div>
        <div className='h-7 w-8 rounded-lg bg-gray-400 animate-pulse'></div>
        <div className='h-7 w-8 rounded-lg bg-gray-400 animate-pulse'></div>
      </div>
    </div>
  );
}

export default PostCardLoader