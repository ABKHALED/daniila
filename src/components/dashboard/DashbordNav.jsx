import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import menu from "../../assets/icons/icons8-menu-64.png";
import close from "../../assets/icons/icons8-fermer-la-fenêtre-64.png";
import see from "../../assets/icons/icons8-visible-64.png";
import add from "../../assets/icons/icons8-ajouter-64.png";
import edit from "../../assets/icons/icons8-crayon-64.png";
import remove from "../../assets/icons/icons8-supprimer-pour-toujours-64.png";
import order from "../../assets/icons/icons8-paquet-64.png";
import email from "../../assets/icons/icons8-email-64.png";
import h from "../../assets/icons/icons8-photo-gallery-94.png";
import { opShape } from "../../app/api/dashNav";

import { AnimatePresence, motion } from "framer-motion";

const DashbordNav = () => {
  const showfull = useSelector((state) => state.shape.shape);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 120) {
      setTest(true);
    } else {
      setTest(false);
    }
  });

  return (
    <>
      {showfull ? (
        <AnimatePresence mode="wait" key={1}>
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ left: "-200px", opacity: 0 }}
            animate={{ left: "0", opacity: 1 }}
            exit={{ left: "-200px", opacity: 0 }}
            className="fixed left-0 p-4 w-[200px] rounded-e-lg top-[103px] h-[calc(100%-103px)] z-[1000] bg-white flex-col md:flex items-center justify-between"
          >
            <div className="w-full h-[10%] hidden md:flex justify-end ">
              <img
                onClick={() => dispatch(opShape(false))}
                src={close}
                className="w-[35px] h-[35px]  cursor-pointer"
                alt=""
              />
            </div>
            <ul className="flex flex-col justify-center h-[90%] gap-5">
              <li>
                <NavLink
                  className=" flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  to="/dashbored"
                >
                  <img
                    src={see}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  See All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/addProduct"
                >
                  <img
                    src={add}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Add product
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/editProduct"
                >
                  <img
                    src={edit}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Edit product
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/deletProduct"
                >
                  <img
                    src={remove}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Delet product
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/orderProducts"
                >
                  <img
                    src={order}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/News"
                >
                  <img
                    src={email}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Email
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "text-fcolor flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor "
                      : "  flex items-center gap-3 font-bold transition-all duration-300 ease-in-out hover:text-fcolor"
                  }
                  to="/dashbored/Hero"
                >
                  <img
                    src={email}
                    className="w-[25px] h-[25px]  cursor-pointer"
                    alt=""
                  />
                  Hero
                </NavLink>
              </li>
            </ul>
          </motion.div>
        </AnimatePresence>
      ) : (
        // top-[50%] translate-y-[-50%] h-[calc(100%-103px)]
        <AnimatePresence mode="wait" key={0}>
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ left: "-50px", opacity: 0 }}
            animate={{ left: "0", opacity: 1 }}
            exit={{ left: "-50px", opacity: 0 }}
            className={`fixed flex-col left-0 w-[35px] md:w-[50px] rounded-e-lg transition-all duration-300 ease-in-out ${
              test
                ? "top-[50%] translate-y-[-50%] h-[calc(100%-103px)]"
                : "top-[103px] h-[calc(100%-103px)]"
            } z-[1000] bg-white  flex items-center justify-center`}
          >
            <div className="w-full hidden  md:flex justify-center items-center">
              <img
                src={menu}
                onClick={() => dispatch(opShape(true))}
                className="md:w-[35px] md:h-[35px] w-[25px] h-[25px]  cursor-pointer"
                alt=""
              />
            </div>
            <ul className="flex flex-col justify-center h-[90%] gap-5">
              <li>
                <NavLink to="/dashbored">
                  <img
                    src={see}
                    className="flex justify-center items-center   md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                  to="/dashbored/addProduct"
                >
                  <img
                    src={add}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                  to="/dashbored/editProduct"
                >
                  <img
                    src={edit}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashbored/deletProduct"
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                >
                  <img
                    src={remove}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                  to="/dashbored/orderProducts"
                >
                  <img
                    src={order}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                  to="/dashbored/News"
                >
                  <img
                    src={email}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "  flex justify-center items-center  bg-[#a875cfb8] md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                      : "    flex justify-center items-center  md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full"
                  }
                  to="/dashbored/Hero"
                >
                  <img
                    src={h}
                    className="md:w-[35px] md:h-[35px] w-[25px] h-[25px] rounded-full object-cover  cursor-pointer"
                    alt=""
                  />
                </NavLink>
              </li>
            </ul>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default DashbordNav;
