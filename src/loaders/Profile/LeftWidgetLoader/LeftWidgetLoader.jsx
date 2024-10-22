import React from 'react'

const LeftWidgetLoader = () => {
  return (
    <div>
      <div className="w-full shadow-sm shadow-gray-300 rounded-xl p-5 bg-white">
        <div className="flex flex-col  animate-pulse gap-2">
          <div className="w-36 -mt-20 h-36 mx-auto rounded-full bg-gray-600 "></div>
          <div className="h-8 w-40 rounded-full bg-gray-400 mt-4"></div>
          <div className="h-5 w-40 rounded-full bg-gray-400"></div>
          <div className="h-3 w-32 rounded-full bg-gray-400 mt-2"></div>
          <div className="h-3 w-36 rounded-full bg-gray-400"></div>
          <div className="flex items-center w-full mt-2 gap-3">
            <div className="h-14 rounded-lg bg-gray-400 w-full"></div>
            <div className="h-14 rounded-lg bg-gray-400 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftWidgetLoader