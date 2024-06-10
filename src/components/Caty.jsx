import React, { useEffect } from "react";
import f from "../assets/11682.jpg";
import h from "../assets/889.jpg";
import e from "../assets/17313.jpg";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
const Caty = () => {
  const trr = useSelector((state) => state.tran.tran);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="w-full h-full pt-[100px] px-3 md:px-9 overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          to="/Women"
          className="w-full h-[350px] rounded-md overflow-hidden block relative "
        >
          <img src={f} alt="" className="w-full h-full object-cover " />
          <p className="text-[50px] md:text-[60px] font-extrabold absolute top-0 left-0 w-full h-full bg-[#0000003b] flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#ffffff4a] text-white hover:text-black">
            {trr === "fr"
              ? "Femmes"
              : trr === "eng"
              ? "Women"
              : trr === "ar" && "النساء"}
          </p>
        </Link>
        <Link
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          to="/Men"
          className="w-full h-[350px] rounded-md overflow-hidden relative "
        >
          <img src={h} alt="" className="w-full h-full object-cover " />
          <p className="text-[50px] md:text-[60px] font-extrabold absolute top-0 left-0 w-full h-full bg-[#0000003b] flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#ffffff4a] text-white hover:text-black">
            {trr === "fr"
              ? "Homme"
              : trr === "eng"
              ? "Man"
              : trr === "ar" && "الرجال"}
          </p>
        </Link>
        <Link
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          to="/kids"
          className="w-full h-[350px] rounded-md overflow-hidden relative "
        >
          <img src={e} alt="" className="w-full h-full object-cover " />
          <p className="text-[50px] md:text-[60px] font-extrabold absolute top-0 left-0 w-full h-full bg-[#0000003b] flex justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#ffffff4a] text-white hover:text-black">
            {trr === "fr"
              ? "Enfants"
              : trr === "eng"
              ? "Children"
              : trr === "ar" && "الأطفال"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Caty;
