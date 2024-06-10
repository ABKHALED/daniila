import React, { useEffect, useState } from "react";
import DashbordNav from "./DashbordNav";
import ImgOverlay from "./ImgOverlay";
import { useGetProdcutsQuery } from "../products/productApi";
import ProductCart from "../products/ProductCart";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function DashFirst() {
  const showfull = useSelector((state) => state.shape.shape);
  const [fil, setFill] = useState("Default");
  const [data, setData] = useState(null);
  const { data: products, isSuccess } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (isSuccess) {
      if (fil === "Default") {
        setData(products);
      } else if (fil === "Newest First") {
        setData([...products].reverse());
      } else if (fil === "On sale") {
        setData(products.filter((ele) => Number(ele.onSale) === true));
      } else if (fil === "Out of Stock") {
        setData(products.filter((ele) => Number(ele.stock) < 1));
      } else if (fil === "A_Z") {
        setData(
          [...products].sort((a, b) =>
            a.productTitle > b.productTitle ? 1 : -1
          )
        );
      } else if (fil === "Z_A") {
        setData(
          [...products].sort((a, b) =>
            a.productTitle < b.productTitle ? 1 : -1
          )
        );
      }
    }
  }, [fil]);

  useEffect(() => {
    setData(products);
  }, [products]);
  useEffect(() => {
    setFill("Default");
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {isSuccess && (
        <div
          className={`px-3  relative z-[100] ${
            showfull ? "ps-[200px]" : "md:ps-[50px] ps-[35px]"
          } w-full pt-[103px] transition-all duration-300 ease-in-out`}
        >
          <ImgOverlay />
          <DashbordNav />
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className=" relative w-full h-full "
          >
            <h1 className="text-white mt-5 relative text-[28px] sm:text-[35px] md:text-[50px] text-center font-bold">
              DashBoard
            </h1>
            <div className="px-3 w-fill flex flex-wrap justify-center gap-3 sm:gap-0 sm:justify-between items-center my-5  relative">
              <p className="text-white text-xl">
                Number of produtcs:{" "}
                <span className=" text-fcolor font-bold">
                  {data && data.length}
                </span>
              </p>
              <div className=" flex items-center flex-wrap w-[300px]  gap-2 sm:gap-0">
                <p className="sm:w-[40%] text-center sm:text-start w-full text-[17px] font-semibold text-white">
                  Filter Products:
                </p>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setFill(e.target.value)}
                  value={fil}
                  className="mt-1 px-3 py-2 w-full sm:w-[60%] bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block font-bold  text-[15px] rounded-md  focus:ring-1 cursor-pointer"
                  placeholder="Product category..."
                >
                  <option className="font-bold" value="Default">
                    Default
                  </option>
                  <option className="font-bold" value="A_Z">
                    A_Z
                  </option>
                  <option className="font-bold" value="Z_A">
                    Z_A
                  </option>

                  <option className="font-bold" value="Newest First">
                    Newest First
                  </option>
                  <option className="font-bold" value="On sale">
                    On sale
                  </option>
                  <option className="font-bold" value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
              </div>
            </div>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-3">
                {data &&
                  data.map((ele) => {
                    return <ProductCart key={ele._id} ele={ele} bo={true} />;
                  })}
              </div>
            ) : (
              <div className="flex h-[200px] w-full px-3 items-center relative justify-center">
                <p className="text-white text-2xl text-center font-bold">
                  There is No product {fil}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

export default DashFirst;
