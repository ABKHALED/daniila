import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ImgOverlay from "./ImgOverlay";
import DashbordNav from "./DashbordNav";
import { useSelector } from "react-redux";
import mag from "../../assets/icons/icons8-chercher-48.png";
import { useGallMutation } from "../info/infoApiSlice";
import { useGetOneProductMutation } from "../products/productApi";
import OrderOver from "./OrderOver";
import { useLocation } from "react-router-dom";
function OrderDash() {
  const [input, setInput] = useState("");
  const showfull = useSelector((state) => state.shape.shape);
  const [gall, { isLoading2 }] = useGallMutation();
  const [all, setAll] = useState(false);
  const [data, setData] = useState(null);
  const [finel, setFinel] = useState(null);
  const [orId, setOrId] = useState("");
  const [t, setT] = useState(false);
  const [filterd, setFilterd] = useState("");
  const [d2, setD2] = useState(null);
  const [getOneProduct, { isSuccess2 }] = useGetOneProductMutation();
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    getAll();
  }, [t]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getAll = async () => {
    try {
      const p = await gall();

      setData(p.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      getProd();
    }
  }, [data]);
  useEffect(() => {
    if (d2) {
      getProd();
    }
  }, [d2]);
  const [to, setTo] = useState(0);
  const getProd = async () => {
    try {
      let d = [];
      let g = [];
      if (d2 && d2.length > 0 && filterd !== "All") {
        for (let i = 0; i < d2.length; i++) {
          d = [];
          for (let j = 0; j < d2[i].products.length; j++) {
            const product = await getOneProduct({
              id: d2[i].products[j].id,
            });

            d = [
              ...d,
              {
                productInfo: product.data,
                count: d2[i].products[j].count,
                color: d2[i].products[j].color,
                size: d2[i].products[j].size,
                state: d2[i].state,
                createdAt: d2[i].createdAt,
                updatedAt: d2[i].updatedAt,
                orderId: d2[i].orderId,
                info: d2[i].info,
              },
            ];
          }

          g = [...g, d];
        }
        setFinel(g);
      } else {
        for (let i = 0; i < data.length; i++) {
          d = [];
          for (let j = 0; j < data[i].products.length; j++) {
            const product = await getOneProduct({
              id: data[i].products[j].id,
            });

            d = [
              ...d,
              {
                productInfo: product.data,
                count: data[i].products[j].count,
                color: data[i].products[j].color,
                size: data[i].products[j].size,
                state: data[i].state,
                createdAt: data[i].createdAt,
                updatedAt: data[i].updatedAt,
                orderId: data[i].orderId,
                info: data[i].info,
              },
            ];
          }

          g = [...g, d];
        }
        setFinel(g);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (filterd === "All") {
      setD2(null);
      getProd();
    } else if (filterd === "Processing") {
      if (data) {
        setD2(data.filter((ele) => ele.state === false));
      }
    } else if (filterd === "Delivered") {
      if (data) {
        setD2(data.filter((ele) => ele.state === true));
      }
    }
  }, [filterd]);
  useEffect(() => {
    if (data) {
      setFilterd("");
      setD2(
        data.filter((ele) =>
          ele.orderId.toLowerCase().startsWith(input.toLowerCase())
        )
      );
    }
  }, [input]);

  return (
    <div
      className={`px-3  relative z-[100] ${
        showfull ? "ps-[200px]" : "md:ps-[50px] ps-[35px]"
      } h-full pt-[103px] transition-all duration-300 ease-in-out`}
    >
      {all && orId && finel && (
        <OrderOver orId={orId} all={all} setAll={setAll} setT={setT} />
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
          Orders Management
        </h1>
        <div className=" mx-auto flex relative items-center mt-5 flex-wrap w-full md:w-[500px]  gap-2 sm:gap-0">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={`mt-1 pl-10 py-2    bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md text-sm sm:text-md focus:ring-1`}
            placeholder="Search by Product title..."
          />
          <img
            src={mag}
            className=" absolute top-[50%] left-[5px] translate-y-[-50%] w-[30px] h-[30px]  border-r border-fcolor p-1"
            alt=""
          />
        </div>
        <div className="flex items-center gap-5 ps-5 mt-10">
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
              Processing
            </option>
            <option className="font-bold" value="Delivered">
              Delivered
            </option>
          </select>
        </div>
        <div className="mt-[30px] px-2">
          {finel && finel.length > 0 ? (
            <div className="flex flex-col gap-10 w-full ">
              {finel.map((ele, i) => (
                <div key={i} className=" border rounded-md p-5 bg-white ">
                  <div
                    key={i}
                    className=" flex flex-col lg:flex-row items-center justify-between  gap-5"
                  >
                    <div className="flex flex-col items-center gap-3 ">
                      <h1 className="">Order ID: "{ele[0].orderId}"</h1>
                      <p>City: {ele[0].info.city}</p>
                      <p>Place: {ele[0].info.dev}</p>
                      <p>Delevery: {ele[0].info.delevery}DZD</p>
                      <p>Date: {ele[0].createdAt.slice(0, 10)}</p>
                    </div>
                    <div className=" flex flex-wrap gap-5 items-center  justify-center  w-[100%]   lg:w-[600px]">
                      {ele.map((el, j) => {
                        return (
                          <div
                            key={j}
                            className=" flex-col flex w-[150px] items-center  gap-2"
                          >
                            <img
                              src={el.productInfo.coverImage}
                              className="w-[100px] h-[100px] rounded-md object-cover border border-black"
                              alt=""
                            />
                            <p className=" text-center">Size: {el.size}</p>
                            <p className="flex items-center justify-center gap-1">
                              Color:
                              <span
                                className="w-[17px] h-[17px] rounded-full border border-black"
                                style={{ backgroundColor: el.color }}
                              ></span>
                            </p>
                            <p className=" text-center">Quantity: {el.count}</p>
                            <p className=" text-center text-[14px]">
                              Price:{" "}
                              {el.productInfo.onSale
                                ? (Number(el.productInfo.price) -
                                    Number(
                                      (el.productInfo.price *
                                        Number(el.productInfo.sale)) /
                                        100
                                    )) *
                                  Number(el.count)
                                : Number(el.productInfo.price) *
                                  Number(el.count)}
                              DZD
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className=" flex justify-center flex-col items-center gap-5">
                      <p
                        onClick={() => {
                          setAll(true);
                          setOrId(ele[0].orderId);
                        }}
                        className="text-blue-600 font-extrabold text-[18px] cursor-pointer"
                      >
                        All informationa!
                      </p>
                      {ele[0].state ? (
                        <div className="w-[150px] h-[50px] flex justify-center items-center rounded-md text-[20px] text-white font-extrabold bg-green-600">
                          Delivered
                        </div>
                      ) : (
                        <div className="w-[150px] h-[50px] flex justify-center items-center rounded-md text-[20px] text-white font-extrabold bg-red-600">
                          Processing
                        </div>
                      )}
                      {ele[0].state && (
                        <p className=" text-extrabold text-green-600">
                          Delivered on : {ele[0].updatedAt.slice(0, 10)}
                        </p>
                      )}
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

export default OrderDash;
