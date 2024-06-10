import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useGetAllSpMutation } from "../info/infoApiSlice";

function HeoOver({ orId, all, setAll, setT }) {
  const [getAllSp, { isLoading }] = useGetAllSpMutation();

  const [finel, setFinel] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    gett();
  }, []);

  const gett = async () => {
    try {
      const d = await getAllSp();
      setData(d.data.find((ele) => ele._id === orId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-full  z-[100000000] fixed top-0 flex justify-center items-center bg-[#00000085] left-0    px-3 md:px-9  ">
        <motion.div
          transition={{ duration: 0.5, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className=" relative w-[95%] p-5  overflow-y-scroll kha rounded-lg h-[95%] bg-white"
        >
          <div
            className=" absolute top-5  right-5 text-[30px]  transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer hover:rotate-[180deg]"
            onClick={() => setAll(false)}
          >
            <FaXmark />
          </div>
          <h1
            className={`${
              data && data.cus === "our" ? "text-fcolor" : "text-green-600"
            } text-center text-[24px] font-extrabold mb-5`}
          >
            {data && data.cus === "our"
              ? "Product from our shop"
              : "Product from the customer"}
          </h1>
          {data && (
            <div className="w-full ">
              <h1 className=" text-center font-extrabold text-[24px] border-fcolor border-t pt-5">
                personal information
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 mt-5">
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Full Name :</p>
                  <p className=" text-[17px]">
                    {data.UsInfo.first} {data.UsInfo.last}
                  </p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Email:</p>
                  <p className=" text-[17px]">{data.UsInfo.email}</p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Phone Number :</p>
                  <p className=" text-[17px]">{data.UsInfo.num}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 mt-5">
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Full Adderess :</p>
                  <p className=" text-[17px]">{data.UsInfo.addr}</p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-City:</p>
                  <p className=" text-[17px]">{data.UsInfo.city}</p>
                </div>
              </div>
              <h1 className=" text-center font-extrabold text-[24px] mt-[30px] border-fcolor border-t pt-5">
                Client want to change this product :
              </h1>
              {data.cus === "our" ? (
                <div className="w-full flex items-center gap-10 justify-center flex-wrap mt-5">
                  <div className=" ">
                    <img
                      src={data.pInfo.coverImage}
                      className="w-[100px] h-[100px]  rounded-md object-cover border border-black"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product Name:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.productTitle}
                      </span>
                    </p>
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product family:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.family}
                      </span>
                    </p>
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product category:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.category}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center sm:items-start">
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Subcategory:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.type}
                      </span>
                    </p>
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      In stock:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.stock}
                      </span>
                    </p>
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product price:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.onSale === false
                          ? data.pInfo.price
                          : Number(data.pInfo.price) -
                            (Number(data.pInfo.price) *
                              Number(data.pInfo.sale)) /
                              100}{" "}
                        DZD
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-5 items-center justify-center ">
                    {data.PImages.map((ele, i) => {
                      return (
                        <img
                          src={ele}
                          className="w-[100px] h-[100px] rounded-md object-cover"
                          key={i}
                          alt=""
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-center items-center gap-10 flex-wrap mt-8">
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product size:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.size}
                      </span>
                    </p>
                    <p className=" font-bold text-[17px] flex items-center gap-3">
                      Product quantity:
                      <span className="text-fcolor font-extrabold">
                        {data.pInfo.stock}
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <h1 className=" text-center font-extrabold text-[24px] mt-[30px] border-fcolor border-t pt-5">
                what the client want to change :
              </h1>
              <div className=" mt-5">
                <p className="text-[18px] font-bold max-w-[700px] mx-auto text-center">
                  {data.changes}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default HeoOver;
