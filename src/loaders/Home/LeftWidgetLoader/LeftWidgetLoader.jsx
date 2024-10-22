import React from 'react'

const LeftWidgetLoader = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm shadow-gray-300 p-5'>
      <div className='flex flex-col gap-6'> 
      <div className='w-28 bg-gray-500 h-6  animate-pulse transition-all duration-500 rounded-full'></div>
      <div className='w-36 bg-gray-500 h-6  animate-pulse transition-all duration-500 rounded-full'></div>
      <div className='w-28 bg-gray-500 h-6  animate-pulse transition-all duration-500 rounded-full'></div>
      <div className='w-32 bg-gray-500 h-6  animate-pulse transition-all duration-500 rounded-full'></div>
      <div className='w-28 bg-gray-500 h-6  animate-pulse transition-all duration-500 rounded-full'></div>
      </div>
       
    </div>
  )
}

export default LeftWidgetLoader