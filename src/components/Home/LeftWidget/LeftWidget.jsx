
"use client";
import favorites from "../../../../Public/icons/home/leftWidget/favorites.svg";
import projects from "../../../../Public/icons/home/leftWidget/projects.svg";
import drafts from "../../../../Public/icons/home/leftWidget/drafts.svg";
import products from "../../../../Public/icons/home/leftWidget/products.svg";
import cart from "../../../../Public/icons/home/leftWidget/carts.svg";
import Image from "next/image";
const LeftWidget = () => {
  return (
    <div className="w-full lg:block hidden sticky top-[4.5rem]">
      
          {" "}
          <div className="bg-white py-5  rounded-xl shadow shadow-gray-300 w-full  ">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4 w-full group py-3.5 px-[1.7rem] hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <Image
                  className="w-4  col-span-2 lg:col-span-1"
                  loading="lazy"
                  src={favorites}
                  alt="favorites"
                  width={10}
                ></Image>

                <p className="text-miniTitle col-span-6 font-light">
                  Favorites
                </p>
              </div>
              <div className="flex items-center gap-4 w-full group py-3.5 px-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <Image
                  className="w-5 col-span-2 lg:col-span-1"
                  loading="lazy"
                  src={projects}
                  alt="favorites"
                  width={10}
                ></Image>

                <p className="text-miniTitle col-span-6 font-light">Projects</p>
              </div>
              <div className="flex items-center gap-4 w-full group py-3.5 px-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <Image
                  className="w-5 col-span-2 lg:col-span-1"
                  loading="lazy"
                  src={products}
                  alt="favorites"
                  width={10}
                ></Image>

                <p className="text-miniTitle col-span-6 font-light">Products</p>
              </div>
              <div className="flex items-center gap-5 w-full group py-3.5 px-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <Image
                  className="w-4 col-span-2 lg:col-span-1"
                  loading="lazy"
                  src={drafts}
                  alt="favorites"
                  width={10}
                ></Image>

                <p className="text-miniTitle col-span-6 font-light">Drafts</p>
              </div>
              <div className="flex items-center gap-4 w-full group py-3.5 px-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                <Image
                  className="w-5 col-span-2 lg:col-span-1"
                  loading="lazy"
                  src={cart}
                  alt="favorites"
                  width={10}
                ></Image>

                <p className="text-miniTitle col-span-6 font-light">Cart</p>
              </div>
            </div>
          </div>
        
    </div>
  );
}

export default LeftWidget