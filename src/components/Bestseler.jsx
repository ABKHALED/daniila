import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProdcutsQuery } from "./products/productApi";
import ProductCart from "./products/ProductCart";

import Aos from "aos";
import "aos/dist/aos.css";
const Bestseler = () => {
  const [data, setData] = useState(null);

  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (products) {
      // setData([...products].reverse().slice(0, 6));
      let a = [...products]
        .sort((a, b) => (Number(a.bought) < Number(b.bought) ? 1 : -1))
        .slice(0, 8);
      setData(a);
    }
  }, [products]);
  useEffect(() => {
    Aos.init();
  }, []);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full h-full  pt-[100px] px-3 md:px-9">
      <div className="flex justify-center ">
        <h1
          data-aos="zoom-out"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
          className="tsts font-extrabold mb-[70px] text-[40px] md:text-[50px]   "
        >
          {trr === "fr" ? "Meilleure Vente" : trr === "eng" && "Best Selling"}
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4  gap-5">
        {data &&
          data.map((ele) => {
            return <ProductCart key={ele._id} ele={ele} />;
          })}
      </div>
    </div>
  );
};

export default Bestseler;
