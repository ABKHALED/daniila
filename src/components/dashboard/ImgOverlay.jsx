import React from "react";
import img from "../../assets/tablette-numerique-pour-apprentissage-ligne.jpg";
const ImgOverlay = () => {
  return (
    <div className="w-full h-full fixed  top-0 left-0 z-[-100000] ">
      <div className="w-full absolute h-full bg-[#000000ba] top-0 left-0"></div>
      <img src={img} className=" w-full h-full object-cover" alt="" />
    </div>
  );
};

export default ImgOverlay;
