import React from "react";

const TopImage = ({ img, text, cat }) => {
  return (
    <div className="w-full h-[45vh]  relative flex pb-5 justify-center items-end">
      <div className=" absolute top-0 left-0 w-full h-full bg-[#00000087] z-[10]"></div>
      <div className=" absolute top-0 left-0 w-full h-full -z-10">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      {/* <div className="text-white relative z-[100] flex justify-between items-center flex-wrap w-full px-3 md:px-9">
        <h1 className="text-[27px] font-extrabold md:text-[40px]">{text}</h1>
        <p className=" font-bold text-[20px] sm:mx-0 mx-auto md:text-[40px]">
          Title: {cat}
        </p>
      </div> */}
      <div className="text-white relative z-[100] flex justify-center items-center flex-wrap w-full px-3 md:px-9">
        <h1 className="text-[30px] font-extrabold md:text-[60px]">{cat}</h1>
      </div>
    </div>
  );
};

export default TopImage;
