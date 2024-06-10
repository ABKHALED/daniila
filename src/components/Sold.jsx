import React, { useEffect } from "react";
import saleImg from "../assets/10016860_27331.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
const Sold = () => {
  const trr = useSelector((state) => state.tran.tran);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="w-full h-[70vh] relative mt-[100px] flex items-center md:px-9 overflow-hidden">
      <div className="w-full h-full absolute top-0 left-0">
        <img src={saleImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className=" absolute top-0 left-0 w-full h-full bg-[#0000006d] z-[10]"></div>
      <div className="w-[20%] aspect-square absolute top-[50%] translate-y-[-50%] right-10 z-[100]">
        {/* <img src={pic} alt="" className="w-full h-full object-cover" /> */}
      </div>
      <div className=" relative flex gap-12 flex-col z-[100]  px-3 md:items-start items-center ">
        <h1
          data-aos="fade-right"
          ata-aos-duration="600"
          data-aos-easing="ease-in-sine"
          className=" text-white text-[40px] font-extrabold md:text-start text-center"
        >
          {trr === "fr"
            ? "Grandes remises jusqu'à 50%"
            : trr === "eng"
            ? "Big discounts up to 50%"
            : trr === "ar" && "خصومات كبيرة تصل إلى 50%"}
        </h1>
        <p
          data-aos="fade-left"
          ata-aos-duration="600"
          data-aos-easing="ease-in-sine"
          className="text-white  md:max-w-[500px] text-[25px] font-semibold md:text-start text-center"
        >
          {trr === "fr"
            ? "Remises périodiques importantes sur tous les produits jusqu'à 50%. Préparez-vous à toute réduction en visitant le site Web ou via les réseaux sociaux"
            : trr === "eng"
            ? "Large periodic discounts on all products up to 50%. Be prepared for any discount by visiting the website or via social media"
            : trr === "ar" &&
              "خصومات دورية كبيرة على جميع المنتجات تصل إلى 50٪. كن مستعدا لأي خصم من خلال زيارة الموقع الإلكتروني أو عبر وسائل التواصل الاجتماعي"}
        </p>
      </div>
    </div>
  );
};

export default Sold;
