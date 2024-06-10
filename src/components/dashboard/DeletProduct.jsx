import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ImgOverlay from "./ImgOverlay";
import DashbordNav from "./DashbordNav";
import { useSelector } from "react-redux";
import { useGetProdcutsQuery } from "../products/productApi";
import mag from "../../assets/icons/icons8-chercher-48.png";

import DashProd from "./DashProd";
import { useLocation } from "react-router-dom";

const DeletProduct = ({ setEdit }) => {
  const showfull = useSelector((state) => state.shape.shape);
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");

  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    setData(products);
  }, [products]);
  useEffect(() => {
    if (data) {
      setData(
        products.filter((ele) =>
          ele.productTitle.toLowerCase().startsWith(input.toLowerCase())
        )
      );
    }
  }, [input]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={`px-3  relative z-[100] ${
        showfull ? "ps-[200px]" : "md:ps-[50px] ps-[35px]"
      } h-full pt-[103px] transition-all duration-300 ease-in-out`}
    >
      <ImgOverlay />
      <DashbordNav />
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className=" relative w-full h-full "
      >
        <h1 className="text-white mt-5 text-[28px] sm:text-[35px] md:text-[50px] text-center font-bold">
          Delete product
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
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-3">
            {data &&
              data.map((ele) => {
                return (
                  <DashProd
                    key={ele._id}
                    ele={ele}
                    fun={"delet"}
                    setEdit={setEdit}
                  />
                );
              })}
          </div>
        ) : (
          <div className="flex h-[200px] w-full px-3 items-center relative justify-center">
            <p className="text-white text-2xl text-center font-bold">
              There is No product with the name {input}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeletProduct;
