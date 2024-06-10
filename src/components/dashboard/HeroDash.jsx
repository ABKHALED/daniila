import React, { useEffect, useState } from "react";
import ImgOverlay from "./ImgOverlay";
import DashbordNav from "./DashbordNav";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../fireBaseConfig";
import { HashLoader } from "react-spinners";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useAddHeroMutation } from "../products/productApi";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  useDeleteSporderMutation,
  useGetAllSpMutation,
} from "../info/infoApiSlice";
import HeoOver from "./HeoOver";
import { FaXmark } from "react-icons/fa6";

function HeroDash() {
  const [getAllSp, { isLoading }] = useGetAllSpMutation();
  const [deleteSporder, { isLoading2 }] = useDeleteSporderMutation();
  const showfull = useSelector((state) => state.shape.shape);
  const [finel, setFinel] = useState(null);
  const [data, setData] = useState(null);
  const [rem, setRem] = useState(false);
  const [inp, setInp] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    gett();
  }, []);

  const gett = async () => {
    try {
      const d = await getAllSp();
      setData(d.data);
      setFinel(d.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [orId, setOrId] = useState("");
  const [t, setT] = useState(false);
  const [all, setAll] = useState(false);
  const [filterd, setFilterd] = useState("");
  const [d2, setD2] = useState(null);
  useEffect(() => {
    if (filterd === "All") {
      // setFinel(null);
      gett();
    } else if (filterd === "Processing") {
      if (data) {
        setFinel(data.filter((ele) => ele.cus === "our"));
      }
    } else if (filterd === "Delivered") {
      if (data) {
        setFinel(data.filter((ele) => ele.cus === "your"));
      }
    } else if (filterd === "new") {
      if (data) {
        setFinel([...data].reverse());
      }
    }
  }, [filterd]);
  const del = async () => {
    try {
      if (id !== "") {
        await deleteSporder({ id: id });
      }
      setId("");
      gett();
      setRem(false);
      setInp("");
    } catch (err) {}
  };
  return (
    <div
      className={`px-3  relative z-[100] ${
        showfull ? "ps-[200px]" : "md:ps-[50px] ps-[35px]"
      } h-full pt-[103px] transition-all duration-300 ease-in-out`}
    >
      {all && orId && finel && (
        <HeoOver orId={orId} all={all} setAll={setAll} setT={setT} />
      )}
      {rem && (
        <div className="w-full z-[1000] h-full fixed top-0 left-0 flex justify-center items-center bg-[#00000085]">
          <div className="mx-w-[500px] h-[300px] rounded-lg p-5 bg-white relative flex flex-col gap-7">
            <div
              onClick={() => {
                setRem(false);
                setInp("");
              }}
              className=" absolute top-3 right-3 hover:text-red-600 transition-all duration-300 ease-in-out cursor-pointer text-[30px]"
            >
              <FaXmark />
            </div>
            <h1 className=" text-fcolor font-extrabold text-[22px] text-center">
              Delete this Order
            </h1>
            <p className="text-[18px]">
              To delete this special orders Type "Delete" to confirm.
            </p>
            <input
              onChange={(e) => setInp(e.target.value)}
              value={inp}
              className={`mt-1  p-2    bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md text-sm sm:text-md focus:ring-1`}
              placeholder="Type Delete..."
            />
            {inp === "Delete" ? (
              <div
                onClick={() => del()}
                className="w-[full] cursor-pointer h-[40px] rounded-lg bg-red-600 text-[20px] font-extrabold text-white flex justify-center items-center"
              >
                Delete
              </div>
            ) : (
              <div className="w-[full] h-[40px] rounded-lg bg-gray-400 text-[20px] font-extrabold text-white flex justify-center items-center">
                Delete
              </div>
            )}
          </div>
        </div>
      )}
      <ImgOverlay />
      <DashbordNav />
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className=" relative w-full h-full "
      >
        <h1 className="text-white mt-5 text-[28px] sm:text-[35px] md:text-[50px] text-center font-bold">
          Special orders
        </h1>
        <div className="flex items-center gap-5 ps-5 mt-[50px]">
          <p className=" text-white font-extrabold text-[20px]">
            Filter orders
          </p>
          <select
            name="category"
            id="category"
            onChange={(e) => setFilterd(e.target.value)}
            value={filterd}
            className="mt-1 px-3 py-2 w-[300px]  bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block font-bold  text-[15px] rounded-md  focus:ring-1 cursor-pointer"
            placeholder="Product category..."
          >
            <option className="font-bold" value="All">
              All
            </option>
            <option className="font-bold" value="Processing">
              Our Product
            </option>
            <option className="font-bold" value="Delivered">
              Customer product
            </option>
            <option className="font-bold" value="new">
              Most recent
            </option>
          </select>
        </div>
        <div className="mt-[50px] px-2">
          {finel && finel.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-5 ">
              {finel.map((ele, i) => (
                <div key={i} className=" border rounded-md p-5 bg-white ">
                  <div
                    key={i}
                    className=" flex flex-col items-center justify-between  gap-5"
                  >
                    <div className="flex h-full justify-center items-center">
                      <h1
                        className={`text-[20px] font-extrabold ${
                          ele.cus === "our" ? "text-fcolor" : "text-green-600"
                        }`}
                      >
                        {ele.cus === "our"
                          ? "Product from our shop"
                          : "Product from the customer"}
                      </h1>
                    </div>
                    <div className=" flex flex-col justify-center items-center gap-2">
                      {ele.cus === "our" ? (
                        <img
                          src={ele.pInfo.coverImage}
                          alt=""
                          className="w-[80px] h-[80px] rounded-md"
                        />
                      ) : (
                        <img
                          src={ele.PImages[0]}
                          alt=""
                          className="w-[80px] h-[80px] rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-3 ">
                      <h1 className="">
                        Full Name: {ele.UsInfo.first} {ele.UsInfo.last}
                      </h1>
                      <p>City: {ele.UsInfo.city}</p>
                      <p>Phone number: {ele.UsInfo.num}</p>
                    </div>

                    <div className=" flex justify-center flex-col items-center gap-5">
                      <p
                        onClick={() => {
                          setAll(true);
                          setOrId(ele._id);
                        }}
                        className="text-blue-600 font-extrabold text-[18px] cursor-pointer"
                      >
                        All informationa!
                      </p>

                      <div
                        onClick={() => {
                          setRem(true);
                          setId(ele._id);
                        }}
                        className="w-[150px] cursor-pointer h-[50px] flex justify-center items-center rounded-md text-[20px] text-white font-extrabold bg-red-600"
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default HeroDash;
