import React, { useEffect, useState } from "react";
import ProductCart from "./ProductCart";
import { useSelector } from "react-redux";
import { useGetProdcutsQuery } from "./productApi";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
function NewProducts({ setLog }) {
  const [data, setData] = useState(null);

  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (products) {
      setData([...products].reverse().slice(0, 8));
    }
  }, [products]);
  const trr = useSelector((state) => state.tran.tran);
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="w-full h-full  pt-[100px] px-3 md:px-9">
      <div className="flex justify-center ">
        <h1
          data-aos="zoom-out"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          className="tsts font-extrabold mb-[70px] text-[40px] md:text-[50px]   "
        >
          {trr === "fr"
            ? "Nouveaux Produits"
            : trr === "eng"
            ? "New Products"
            : trr === "ar" && "منتجات جديدة"}
        </h1>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-4  gap-5">
        {data &&
          data.map((ele) => {
            return <ProductCart key={ele._id} ele={ele} setLog={setLog} />;
          })}
      </div>
      <div className="w-full h-[60px] mt-[50px] flex justify-center items-center">
        <Link
          to="shop"
          className="flex justify-center items-center w-[180px] h-[50px] rounded-md bg-bcolor text-white transition-all duration-300 hover:text-white hover:bg-fcolor font-bold text-[18px] ease-in-out"
        >
          {trr === "fr"
            ? "PLUS DE PRODUITS"
            : trr === "eng"
            ? "MORE PRODUCTS"
            : trr === "ar" && "المزيد من المنتجات"}
        </Link>
      </div>
    </div>
  );
}

export default NewProducts;
