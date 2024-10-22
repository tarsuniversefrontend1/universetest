

const CreateCardLoader = () => {
  return (
    <div className="w-full bg-white p-5 rounded-xl  animate-pulse">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-500 animate-pulse transition-all duration-500"></div>
          <div className="w-40 h-5 rounded-full bg-gray-600 animate-pulse transition-all duration-500"></div>
        </div>
        <div className="w-8 h-6 rounded-full bg-gray-600 animate-pulse transition-all duration-500"></div>
      </div>
      <div className="flex items-center justify-between w-full"></div>

      <div className="flex items-center w-full justify-between mt-3">
        <div className="flex items-center gap-8">
          {" "}
          <div className="w-14 h-6 rounded-full bg-gray-600 animate-pulse transition-all duration-500"></div>
          <div className="w-14 h-6 rounded-full bg-gray-600 animate-pulse transition-all duration-500"></div>
          <div className="w-14 h-6 rounded-full bg-gray-600 animate-pulse transition-all duration-500"></div>
        </div>{" "}
        <div className="w-16 h-6 rounded-full bg-gray-800 animate-pulse transition-all duration-500"></div>
      </div>
    </div>
  );
}

export default CreateCardLoader