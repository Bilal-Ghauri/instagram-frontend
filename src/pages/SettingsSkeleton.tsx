import React from "react";

const SettingsSkeleton = () => {
  return (
    <div className="flex mt-10 gap-10">
      <div className="animate-pulse flex-grow-[11] pb-10">
        <div>
          <div className="h-56 md:h-72 rounded-xl bg-slate-200  relative">
            <button className="absolute top-2 right-4 h-10 w-10 rounded-full bg-slate-200">
              <div className="relative overflow-hidden">
                <div className="h-10 w-10  bg-slate-200 rounded-full flex items-center justify-center"></div>
              </div>
            </button>
            <div className="flex  w-full  absolute bottom-[-63px] pl-2 sm:pl-4 items-center ">
              <div className="relative">
                <div className="rounded-full h-28 w-28 outline-1 bg-slate-200"></div>

                <button className="absolute right-0  bottom-0">
                  <div className="relative overflow-hidden">
                    <div className="h-10 w-10 border  bg-slate-200 rounded-full flex items-center justify-center"></div>
                  </div>
                </button>
              </div>
              <input
                type="text"
                className=" text-3xl border-b-2 pb-1 md:text-4xl ml-2 md:ml-5 bg-slate-200 w-32 md:w-72 font-medium mt-10  outline-none text-gray-500"
              />
            </div>
            <button className="bg-slate-200  hidden md:flex items-center rounded-lg px-8 text-white py-3 absolute top-[103%] right-0"></button>
          </div>
        </div>
        <div className="mt-24">
          <div className="text-lg font-medium h-5 w-10 bg-slate-200"></div>
          <textarea
            name="bio"
            placeholder=""
            className=" h-32 bg-slate-200 w-full p-2 px-4 mt-2 rounded-lg"
          />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
          <div>
            <div className="text-lg font-medium h-5 w-10 bg-slate-200">
              
            </div>
            <input className="border  p-2 mt-2 bg-slate-200 h-10 w-full rounded-lg" />
          </div>
          <div>
            <div className="text-lg font-medium h-5 w-10 bg-slate-200">
              
            </div>
            <input className="border h-5 bg-slate-200 w-full p-2 mt-2 rounded-lg" />
          </div>
          <div>
            <div className="text-lg font-medium h-5 w-10 bg-slate-200">
              
            </div>
            <input className="border w-full h-5 bg-slate-200 p-2 mt-2 rounded-lg" />
          </div>
          <div>
            <div className="text-lg font-medium h-5 w-10 bg-slate-200">
              
            </div>
            <input className="border w-full h-5 bg-slate-200 p-2 mt-2 rounded-lg" />
          </div>
          <button className="bg-slate-200 flex justify-center md:hidden items-center rounded-lg px-8 text-white py-3">
            <div className="h-5 w-5 bg-slate-200"></div>
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default SettingsSkeleton;
