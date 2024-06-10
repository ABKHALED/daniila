import React, { useEffect, useState } from "react";
import {
  FaRegUser,
  FaAngleDown,
  FaRegHeart,
  FaShoppingBag,
  FaAngleUp,
  FaGlobe,
} from "react-icons/fa";

import { GiBoxUnpacking } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useGetUserMutation } from "./info/infoApiSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useSendLogoutMutation } from "./auth/authApiSlice";
import usePersist from "../hooks/usePersist";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { setTrean } from "../app/api/tran";
const NavBar = ({ setLog, setSearch }) => {
  const dispatch = useDispatch();
  const { _id, isAdmin, favorite } = useAuth();
  const navigat = useNavigate();
  const [getUser, { isLoading }] = useGetUserMutation();
  const [persist, setPersist] = usePersist();
  const [use, setUse] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [tr, setTr] = useState(false);
  const trr = useSelector((state) => state.tran.tran);

  const us = async (values, onSubmitProps) => {
    try {
      const user = await getUser({ userId: _id }).unwrap();
      setUse(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  const [sendLogout, { isLoadingLogout, isSuccess, isError, error }] =
    useSendLogoutMutation();
  useEffect(() => {
    if (_id) {
      us();
    }
  }, [_id]);

  const bey = () => {
    toast.success(`See you next time ${use.firstName.toUpperCase()}`, {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,
    });
    setUse(null);
    localStorage.removeItem("persist");
    sendLogout();
    setPersist(false);
  };
  const location = useLocation().pathname;
  return (
    <div className=" absolute  top-0 left-0 w-full text-black  px-3 md:px-9 z-[1000] bg-white  flex flex-col gap-4">
      <div className="flex justify-between items-center h-[75px]">
        <div className=" flex  items-center gap-4 w-[200px]">
          <div className="text-[22px]">
            <FaMagnifyingGlass
              onClick={() => setSearch(true)}
              className=" transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer"
            />
          </div>
          <div className="text-[22px] relative">
            <FaGlobe
              onClick={() => setTr(!tr)}
              className=" transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer"
            />
            {/* ////////////////////////// */}
            <AnimatePresence>
              {tr && (
                <motion.div
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  initial={{ height: 0, padding: 0 }}
                  animate={{ height: "fit-content", padding: 12 }}
                  exit={{ height: 0, padding: 0 }}
                  className=" absolute top-[120%] left-0 overflow-hidden rounded-lg bg-scolor   text-black right-0 w-[150px] shadow-black shadow-2xl"
                >
                  <ul className="w-full h-full flex flex-col gap-2 text-[17px]">
                    <li
                      onClick={() => {
                        setTr(false);
                        dispatch(setTrean("fr"));
                        localStorage.setItem("tran", JSON.stringify("fr"));
                        window.location.reload();
                      }}
                      className={`cursor-pointer font-bold transition-all flex items-center gap-5 duration-300 hover:ps-4  rounded-md p-1 hover:bg-gray-200 ${
                        trr === "fr" && "text-fcolor"
                      }`}
                    >
                      Français
                    </li>
                    <li
                      onClick={() => {
                        setTr(false);
                        dispatch(setTrean("eng"));
                        localStorage.setItem("tran", JSON.stringify("eng"));
                        window.location.reload();
                      }}
                      className={`cursor-pointer font-bold transition-all flex items-center gap-5 duration-300 hover:ps-4  rounded-md p-1 hover:bg-gray-200 ${
                        trr === "eng" && "text-fcolor"
                      }`}
                    >
                      English
                    </li>
                    <li
                      onClick={() => {
                        setTr(false);
                        dispatch(setTrean("ar"));
                        localStorage.setItem("tran", JSON.stringify("ar"));
                        window.location.reload();
                      }}
                      className={`cursor-pointer font-bold transition-all flex items-center gap-5 duration-300 hover:ps-4  rounded-md p-1 hover:bg-gray-200 ${
                        trr === "ar" && "text-fcolor"
                      }`}
                    >
                      Arabic
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            {/* ///////////////////////////////// */}
          </div>
        </div>
        <div className=" text-[50px] font-extrabold hidden   md:flex items-center justify-center w-[calc(100%-400px)]">
          <Link
            to="/"
            className="hover:text-fcolor transition-all duration-300 ease-in-out log"
          >
            DaniLA
          </Link>
        </div>
        <div className="flex items-center justify-end gap-1 w-[200px]">
          <div className=" items-center gap-1 flex">
            {_id && favorite ? (
              <Link to="WishLiset" className=" relative p-2 cursor-pointer">
                <span className="w-[18px] h-[18px] text-white text-sm  bg-fcolor rounded-full flex justify-center items-center absolute top-0 right-0">
                  {favorite.length}
                </span>
                <FaRegHeart className="text-[22px] transition-all duration-300 ease-in-out  hover:text-fcolor" />
              </Link>
            ) : (
              <div onClick={() => setLog(true)} className=" relative p-2 ">
                <span className="w-[18px] h-[18px] text-white text-sm  bg-fcolor rounded-full flex justify-center items-center absolute top-0 right-0">
                  0
                </span>
                <FaRegHeart className="text-[22px] transition-all duration-300 ease-in-out  hover:text-fcolor" />
              </div>
            )}
            <Link to="Cart" className=" cursor-pointer relative p-2 ">
              <span className="w-[18px]  text-white h-[18px] text-sm bg-fcolor rounded-full flex justify-center items-center absolute top-0 right-0">
                {cartItems.length}
              </span>
              <FaShoppingBag className="text-[22px] transition-all duration-300 ease-in-out  hover:text-fcolor" />
            </Link>
          </div>
          <NavLink
            className="text-black text-[22px] p-2 cursor-pointer transition-all duration-300 ease-in-out  hover:text-fcolor"
            to="/Order"
          >
            <GiBoxUnpacking />
            {/* <LuPackageOpen /> */}
          </NavLink>
          {use ? (
            <div
              onClick={() => setDropDown(!dropDown)}
              className="flex relative items-center gap-2 transition-all duration-300 ease-in-out text-bcolor hover:text-fcolor cursor-pointer"
            >
              <div className="w-[23px] h-[23px] sm:w-[26px] sm:h-[26px] rounded-full bg-gray-100 text-xl flex justify-center items-center">
                {use.picturePath !== "" ? (
                  <img
                    src={use.picturePath}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <p className=" font-extrabold text-[16px] ">
                    {use.firstName.charAt(0)}
                  </p>
                )}
              </div>
              <p className=" font-extrabold text-[13px] sm:text-[15px] text-fcolor flex justify-center items-center gap-1">
                {use.firstName.toUpperCase()}
                {dropDown ? <FaAngleUp /> : <FaAngleDown />}
              </p>

              <AnimatePresence>
                {dropDown && (
                  <motion.div
                    transition={{ ease: "easeInOut", duration: 1 }}
                    initial={{ height: 0, padding: 0 }}
                    animate={{ height: "fit-content", padding: 12 }}
                    exit={{ height: 0, padding: 0 }}
                    className={`absolute top-[120%] overflow-hidden rounded-lg bg-scolor   text-black ${
                      trr === "ar" ? "left-[-10px]" : "right-0"
                    } w-[170%] shadow-black shadow-2xl`}
                  >
                    <ul className="w-full h-full flex flex-col gap-2 text-[17px]">
                      <li className="transition-all duration-300 hover:ps-4 block rounded-md p-1 hover:bg-gray-200 ">
                        <Link to="/Profile">
                          {trr === "fr"
                            ? "Profil"
                            : trr === "eng"
                            ? "Profile"
                            : trr === "ar" && "الملف الشخصي"}
                        </Link>
                      </li>
                      {isAdmin && (
                        <li className="transition-all duration-300 hover:ps-4 block rounded-md p-1 hover:bg-gray-200 ">
                          <Link to="/dashbored">Dashbored</Link>
                        </li>
                      )}
                      <li
                        onClick={bey}
                        className="flex items-center gap-2 transition-all duration-300 hover:ps-4  rounded-md p-1 hover:bg-gray-200 "
                      >
                        <MdOutlineLogout />
                        <p>logoUt</p>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div
              onClick={() => setLog(true)}
              className="flex items-center gap-2 transition-all duration-300 ease-in-out  hover:text-fcolor cursor-pointer p-[4px] rounded-md hover:bg-gray-100"
            >
              <div className="w-[35px] h-[35px] rounded-full bg-gray-100 text-xl text-bcolor   flex justify-center items-center">
                <FaRegUser />
              </div>
              <p className=" font-bold text-[16px] sm:block hidden">Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
