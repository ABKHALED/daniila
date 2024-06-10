import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import im from "../assets/IMG_20240119_152738_092-removebg-preview.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.jpg";
import { useSelector } from "react-redux";
import { useGetHeroMutation } from "./products/productApi";

// h-[100vh]
function Hero() {
  // const [data, setData] = useState(null);
  // const [getHero, { isSuccess2, isLoading }] = useGetHeroMutation();
  // useEffect(() => {
  //   get();
  // }, []);
  // const get = async () => {
  //   try {
  //     const he = await getHero();
  //     setData(he.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full h-[calc(100vh-115px)] mt-[115px] relative bg-white overflow-hidden   flex items-center justify-start px-3 md:px-9 ">
      {/* <div className="w-full h-full absolute top-0 left-0 bg-[#00000087] z-0"></div>
      <img
        src={p2}
        className=" absolute top-0 left-0 object-cover w-full h-full z-[-1]"
        alt=""
      /> */}
      <div className=" absolute w-[100px] h-[100px] rounded-full -top-1 -left-1 bg-[#dbacdc] pulsate-bck"></div>
      <div className=" absolute w-[30px] h-[30px] rounded-full top-[50px] left-[50%] translate-x-[-50%] bg-[#660066] pulsate-bck"></div>
      <div className=" absolute w-[80px] h-[80px] rounded-full bottom-4 left-3 bg-[#660066] pulsate-bck"></div>
      <div className=" absolute w-[200px] h-[200px] rounded-full top-[50%]  translate-y-[-50%] left-[200px] bg-[#dbacdc] pulsate-bck"></div>
      <div className=" absolute w-[80px] h-[80px] rounded-full -bottom-3 -right-3 bg-[#a34aac] pulsate-bck"></div>
      <div className=" absolute w-[150px] h-[150px] rounded-full -top-[75px] right-[250px] bg-[#a34aac] pulsate-bck"></div>
      <div className=" absolute w-[250px] h-[250px] rounded-full -bottom-[125px] left-[50%] translate-x-[-50%] bg-fcolor pulsate-bck"></div>
      <div className=" absolute w-[50px] h-[50px] rounded-full top-[50%]  translate-y-[-50%] right-[50%] translate-x-[-50%] bg-fcolor pulsate-bck"></div>
      <div className=" absolute top-0 left-0 w-full h-full overflow-hidden hidden sm:block">
        {trr === "ar" ? (
          <div className=" w-[400px] h-[400px] top-[50%] translate-y-[-50%] absolute left-[20px]">
            <img
              src={im}
              className="w-full h-full rounded-lg object-cover"
              alt=""
            />
          </div>
        ) : (
          <div className=" w-[400px] h-[400px] top-[50%] translate-y-[-50%] absolute right-[20px]">
            <img
              src={im}
              className="w-full h-full rounded-lg object-cover"
              alt=""
            />
          </div>
        )}
        {/* {trr === "ar" ? (
          <motion.div
            transition={{ duration: 1.5, ease: "easeInOut" }}
            initial={{
              rotate: 20,
              opacity: 0,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              left: "250px",
            }}
            animate={{
              rotate: -6,
              opacity: 1,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              left: "250px",
            }}
            className="w-[300px] h-[420px] rounded-[50px] overflow-hidden  "
          >
            <img src={t1} className="w-full h-full object-cover" alt="" />
          </motion.div>
        ) : (
          <motion.div
            transition={{ duration: 1.5, ease: "easeInOut" }}
            initial={{
              rotate: -20,
              opacity: 0,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              right: "250px",
            }}
            animate={{
              rotate: 6,
              opacity: 1,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              right: "250px",
            }}
            className="w-[300px] h-[420px] rounded-[50px] overflow-hidden  "
          >
            <img
              src={
                data && data.length > 0 ? [...data].reverse()[0].images[0] : t1
              }
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>
        )}
        {trr === "ar" ? (
          <motion.div
            transition={{ duration: 1.5, ease: "easeInOut" }}
            initial={{
              rotate: 0,
              opacity: 0,
              position: "absolute",
              top: "10px",
              left: "-20px",
            }}
            animate={{
              rotate: 30,
              opacity: 1,
              position: "absolute",
              top: "10px",
              left: "-20px",
            }}
            className="w-[300px] h-[420px] rounded-[50px] overflow-hidden absolute   "
          >
            <img
              src={
                data && data.length > 0 ? [...data].reverse()[0].images[1] : t2
              }
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>
        ) : (
          <motion.div
            transition={{ duration: 1.5, ease: "easeInOut" }}
            initial={{
              rotate: 0,
              opacity: 0,
              position: "absolute",
              top: "10px",
              right: "-20px",
            }}
            animate={{
              rotate: -30,
              opacity: 1,
              position: "absolute",
              top: "10px",
              right: "-20px",
            }}
            className="w-[300px] h-[420px] rounded-[50px] overflow-hidden absolute rotate-[-30deg] right-[-20px] top-[10px] "
          >
            <img
              src={
                data && data.length > 0 ? [...data].reverse()[0].images[1] : t2
              }
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>
        )} */}
      </div>
      <div className=" overflow-hidden flex flex-col relative text-black sm:items-start items-center justify-center sm:gap-0 gap-5 ">
        <motion.h1
          transition={{ duration: 1, ease: "easeInOut" }}
          initial={{ marginLeft: 300, opacity: 0 }}
          animate={{ marginLeft: 0, opacity: 1 }}
          className=" max-w-[600px] sm:text-start text-center text-[50px] sm:text-[50px] font-extrabold leading-[1.5] mb-5"
        >
          {trr === "fr"
            ? "L'ÉLÉGANCE EST DE BON GOÛT!"
            : trr === "eng"
            ? "ELEGANCE IS A GOOD TASTE!"
            : trr === "ar" && "الأناقة هي الذوق السليم!"}
        </motion.h1>
        <motion.p
          transition={{ duration: 1, ease: "easeInOut" }}
          initial={{ marginLeft: -300, opacity: 0 }}
          animate={{ marginLeft: 0, opacity: 1 }}
          className=" text-[23px] max-w-[550px] sm:text-start text-center mb-5 font-bold"
        >
          {trr === "fr"
            ? "Aidons à montrer une meilleure personnalité à travers le style que vous portez"
            : trr === "eng"
            ? "Let's help show a better personality through the cloth you wear"
            : trr === "ar" &&
              "دعنا نساعد في إظهار شخصية أفضل من خلال الملابس التي ترتديها"}
        </motion.p>
        <motion.div
          transition={{ duration: 1, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link
            to="/shop"
            className="flex justify-center items-center w-[180px] h-[50px] rounded-md bg-white text-fcolor transition-all duration-300 hover:text-white border-fcolor border hover:bg-fcolor font-extrabold text-[18px] ease-in-out"
          >
            {trr === "ar" ? "تسوق الآن" : " SHOP NOW"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
// <div className="w-full h-full absolute top-0 left-0 bg-[#00000087] z-0"></div>
//       <img
//         src={p2}
//         className=" absolute top-0 left-0 object-cover w-full h-full z-[-1]"
//         alt=""
//       />
//       <div className=" flex flex-col relative text-white sm:items-start items-center justify-center sm:gap-0 gap-5 ">
//         <h4 className=" font-semibold text-[18px] mt-14 mb-1">
//           NEW COLLECTION
//         </h4>
//         <h1 className=" max-w-[700px] sm:text-start text-center text-[50px] sm:text-[80px] font-bold leading-[1.2] mb-7">
//           THE NEW SENSATION
//         </h1>
//         <p className="text-lg max-w-[600px] sm:text-start text-center mb-7">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
//           tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//         </p>
//         <Link
//           to=""
//           className="flex justify-center items-center w-[120px] h-[60px] rounded-md bg-white text-fcolor transition-all duration-300 hover:text-white hover:bg-fcolor font-bold text-[18px] ease-in-out"
//         >
//           SHOP NOW
//         </Link>
//       </div>
