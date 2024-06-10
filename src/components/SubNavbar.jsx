import React, { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

import { FaBars } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

import { useSelector } from "react-redux";

function SubNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;
  const trr = useSelector((state) => state.tran.tran);
  let conent;
  let hide;
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 30) {
      setOpen(false);
    }
  });
  conent = (
    <ul
      className={`${
        trr === "fr"
          ? "flex md:flex-row flex-col md:items-center gap-8 md:gap-3 lg:gap-5  text-black text-[17px] md:text-[16px] lg:text-[17px] md:ms-0 ms-5"
          : trr === "eng"
          ? "flex md:flex-row flex-col md:items-center gap-8 md:gap-5 text-black text-[17px] md:ms-0 ms-5"
          : trr === "ar" &&
            "flex md:flex-row flex-col md:items-center gap-8 md:gap-5 text-black text-[17px] md:ms-0 ms-5"
      }`}
    >
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="Women"
        >
          {trr === "fr"
            ? "Femmes"
            : trr === "eng"
            ? "Women"
            : trr === "ar" && "النساء"}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="Men"
        >
          {trr === "fr"
            ? "Homme"
            : trr === "eng"
            ? "Man"
            : trr === "ar" && "الرجال"}
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 hover:text-fcolor font-bold"
          }
          to="kids"
        >
          {trr === "fr"
            ? "Enfants"
            : trr === "eng"
            ? "Children"
            : trr === "ar" && "الأطفال"}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="Home"
        >
          {trr === "fr"
            ? "Maison"
            : trr === "eng"
            ? "House"
            : trr === "ar" && "البيت"}
          {/* {trr === "fr"
            ? "Maison"
            : trr === "eng"
            ? "Home"
            : trr === "ar" && "البيت"} */}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="shop"
        >
          {trr === "fr"
            ? "Boutique"
            : trr === "eng"
            ? "Shop"
            : trr === "ar" && "تسوق"}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="Vip"
        >
          {trr === "fr"
            ? "Personnalisé"
            : trr === "eng"
            ? "Customized"
            : trr === "ar" && "حسب الطلب"}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="AboutUs"
        >
          {trr === "fr"
            ? "À propos de nous"
            : trr === "eng"
            ? "About us"
            : trr === "ar" && "معلومات عنا"}
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpen(false)}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out font-bold ms-3 md:ms-0"
              : "text-black transition-all duration-300 ease-in-out ms-0 font-bold hover:text-fcolor"
          }
          to="ContactUs"
        >
          {trr === "fr"
            ? "Contactez-Nous"
            : trr === "eng"
            ? "Contact Us"
            : trr === "ar" && "اتصل بنا"}
        </NavLink>
      </li>
    </ul>
  );
  return (
    <>
      {!hide && (
        <>
          <div className=" absolute  md:flex  hidden top-[75px] left-0 w-full h-[40px] bg-white px-3 md:px-9 z-[500] drop-shadow-2xl  justify-center items-center ">
            <div>{conent}</div>
          </div>
          <div className=" absolute md:hidden flex items-center justify-between top-[75px] left-0 w-full h-[40px] bg-white px-3 md:px-9 z-[1000] drop-shadow-2xl">
            <Link to="/" className="text-[25px] font-extrabold log">
              DaniLA
            </Link>
            <div
              onClick={() => setOpen(true)}
              className="text-[30px] cursor-pointer sm:text-gray-500 hover:text-black transition-all hover:rotate-180 duration-300 ease-in-out"
            >
              <FaBars />
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                transition={{ duration: 0.5, ease: "easeInOut" }}
                initial={{ left: "-100%" }}
                animate={{ left: 0 }}
                exit={{ left: "-100%" }}
                className="w-full h-[calc(100vh-73px)] flex flex-col gap-10  absolute z-[1000] top-[74px] bg-white px-3 md:px-9"
              >
                <div className="flex justify-between items-center  h-[60px]">
                  <Link to="/" className="text-[25px] font-extrabold log">
                    DaniLA
                  </Link>
                  <div
                    onClick={() => setOpen(false)}
                    className="text-[30px] cursor-pointer hover:text-red-500 hover:rotate-180 transition-all duration-300 ease-in-out "
                  >
                    <FaXmark />
                  </div>
                </div>
                <div className="text-[20px]">{conent}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default SubNavbar;
