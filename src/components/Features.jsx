import React, { useEffect } from "react";
import p1 from "../assets/icons/icons8-fournisseur-94.png";
import p2 from "../assets/icons/icons8-argent-94.png";
import p3 from "../assets/icons/icons8-support-en-ligne-94.png";
import p4 from "../assets/icons/icons8-best-seller-94.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
const Features = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full  pt-[100px]  px-3 md:px-9 grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
        className="flex items-center flex-col justify-center w-full gg p-5 rounded-lg"
      >
        <img
          src={p1}
          alt=""
          className="mb-[5px] block w-[70px] h-[70px] object-cover"
        />
        <p className=" text-[25px] font-extrabold mb-[10px] text-center">
          {trr === "fr"
            ? "Livraison"
            : trr === "eng"
            ? "Delivery"
            : trr === "ar" && "التوصيل"}
        </p>
        <p className=" text-slate-500 font-semibold text-[18px] text-center">
          {trr === "fr"
            ? "Livraison 58 wilaya"
            : trr === "eng"
            ? "Delivery 58 wilaya"
            : trr === "ar" && "توصيل 58 ولاية"}
        </p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
        className="flex items-center flex-col justify-center w-full gg p-5 rounded-lg"
      >
        <img
          src={p2}
          alt=""
          className="mb-[5px] block w-[70px] h-[70px] object-cover"
        />
        <p className=" text-[25px] font-extrabold mb-[10px] text-center ">
          {trr === "fr"
            ? "Meilleurs prix"
            : trr === "eng"
            ? "Best prices"
            : trr === "ar" && "أفضل الأسعار"}
        </p>
        <p className=" text-slate-500 font-semibold text-[18px] text-center">
          {trr === "fr"
            ? "Toujours les meilleurs prix"
            : trr === "eng"
            ? "Always the best prices"
            : trr === "ar" && "دائما أفضل الأسعار"}
        </p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
        className="flex items-center flex-col justify-center w-full gg p-5 rounded-lg"
      >
        <img
          src={p3}
          alt=""
          className="mb-[5px] block w-[70px] h-[70px] object-cover"
        />
        <p className=" text-[25px] font-extrabold mb-[10px] text-center">
          {trr === "fr"
            ? "Service client"
            : trr === "eng"
            ? "Customer service"
            : trr === "ar" && "خدمة العملاء"}
        </p>
        <p className=" text-slate-500 font-semibold text-[18px] text-center">
          {trr === "fr"
            ? "Assistance Disponible 24/7"
            : trr === "eng"
            ? "Assistance Available 24/7"
            : trr === "ar" && "المساعدة المتاحة 24/7"}
        </p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
        className="flex items-center flex-col justify-center w-full gg p-5 rounded-lg"
      >
        <img
          src={p4}
          alt=""
          className="mb-[5px] block w-[70px] h-[70px] object-cover"
        />
        <p className=" text-[25px] font-extrabold mb-[10px] text-center">
          {trr === "fr"
            ? "Meilleure qualité"
            : trr === "eng"
            ? "Best quality"
            : trr === "ar" && "أفضل جودة"}
        </p>
        <p className=" text-slate-500 font-semibold text-[18px] text-center">
          {trr === "fr"
            ? "La meilleure qualité sur le marché"
            : trr === "eng"
            ? "Best quality on the market"
            : trr === "ar" && "أفضل جودة في السوق"}
        </p>
      </div>
    </div>
  );
};

export default Features;
