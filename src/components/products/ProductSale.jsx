import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProdcutsQuery } from "./productApi";
import ProductCart from "./ProductCart";
import Aos from "aos";
import "aos/dist/aos.css";
function ProductSale() {
  const trr = useSelector((state) => state.tran.tran);
  const [data, setData] = useState(null);

  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (products) {
      setData(
        [...products]
          .filter((ele) => ele.onSale === true)
          .filter((ele) => Number(ele.stock) > 0)
          .reverse()
          .slice(0, 8)
      );
    }
  }, [products]);
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
            ? "Produits En Solde"
            : trr === "eng"
            ? "Products On Sale"
            : trr === "ar" && "خصومات المنتجات"}
        </h1>
      </div>
      {data && data.length > 0 ? (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4  gap-5">
          {data.map((ele) => {
            return <ProductCart key={ele._id} ele={ele} />;
          })}
        </div>
      ) : (
        <div className=" w-full flex justify-center items-center">
          <h1 className=" text-[30px] font-extrabold text-center">
            {trr === "fr"
              ? "Restez branché pour nos remises"
              : trr === "eng"
              ? "Stay tuned for our discounts"
              : trr === "ar" && "ترقبوا الخصومات لدينا"}
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProductSale;
