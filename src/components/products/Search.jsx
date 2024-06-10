import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useGetProdcutsQuery } from "./productApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Search({ search, setSearch }) {
  const [data, setData] = useState(null);
  const [filterd, setFilterd] = useState([]);
  const [inp, setInp] = useState("");
  const [nn, setNn] = useState(false);
  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      if (inp !== "") {
        setFilterd(
          data.filter((ele) =>
            ele.productTitle.toLowerCase().startsWith(inp.toLowerCase())
          )
        );
      } else if (inp === "") {
        setFilterd([]);
      } else if (filterd.length <= 0 && inp !== "") {
        setNn(true);
      }
    }
  }, [inp]);

  useEffect(() => {
    setData(products);
  }, [products]);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <>
      <AnimatePresence>
        {search && (
          <motion.div
            transition={{ duration: 0.7, ease: "easeInOut" }}
            initial={{ top: "-100%", opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            exit={{ left: "-100%", opacity: 0 }}
            className="w-full fixed py-4 top-0 bg-white drop-shadow-2xl transition-all duration-300 ease-in-out  h-fit z-[10000] px-3 md:px-9"
          >
            <div className=" absolute top-5 right-5">
              <FaXmark
                onClick={() => setSearch(false)}
                className=" text-[30px] cursor-pointer transition-all duration-300 ease-in-out hover:text-red-600 hover:rotate-180"
              />
            </div>
            <h1 className="text-center text-[30px] text-fcolor font-extrabold">
              {trr === "fr"
                ? "Rechercher Des Produits"
                : trr === "eng"
                ? " Search For Products"
                : trr === "ar" && "البحث عن المنتجات"}
            </h1>
            <div className=" flex justify-center items-center">
              <input
                type="text"
                onChange={(e) => setInp(e.target.value)}
                value={inp}
                className="mt-[10px] px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  w-[300px] sm:w-[500px] rounded-md text-[18px] focus:ring-1"
                placeholder="Enter product name..."
              />
            </div>
            <AnimatePresence>
              {filterd && filterd.length > 0 ? (
                <div
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=" max-w-[900px] border mx-auto h-[300px] mt-[30px] rounded-lg overscroll-y-auto flex flex-wrap gap-5 p-2"
                >
                  {filterd.map((ele, i) => {
                    return (
                      <div key={i}>
                        <Link
                          onClick={() => setSearch(false)}
                          to={`/productInformation/${ele._id}`}
                          className="w-[120px] h-[120px] rounded-sm border block"
                        >
                          <img
                            src={ele.coverImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : filterd.length === 0 && inp !== "" ? (
                <p className="mt-10 font-extrabold text-[22px] text-red-500 text-center">
                  {trr === "fr"
                    ? "Il n'y a pas de produit avec ce nom"
                    : trr === "eng"
                    ? "There is no product with this name"
                    : trr === "ar" && "لا يوجد منتج بهذا الاسم"}
                </p>
              ) : (
                ""
              )}
            </AnimatePresence>
            {/* {nn && } */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Search;
