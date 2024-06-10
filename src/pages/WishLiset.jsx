import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaXmark } from "react-icons/fa6";
import { useRefreshMutation } from "../components/auth/authApiSlice";
import { useUnlovedMutation } from "../components/info/infoApiSlice";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useGetOneProductMutation } from "../components/products/productApi";
import { setCartItem } from "../app/api/cartSlice";

const WishLiset = () => {
  const { _id, isAdmin, favorite } = useAuth();
  const [j, setj] = useState(0);
  const [color, setColor] = useState("");
  const [refresh, { isUninitialized, isLoading3, isSuccess, isError, error }] =
    useRefreshMutation();
  const [unloved, { isLoading2 }] = useUnlovedMutation();
  const navigate = useNavigate();
  const remov = async (itemId) => {
    try {
      if (favorite && favorite.length > 0 && _id) {
        const un = await unloved({
          userId: _id,
          itemId: itemId,
        }).unwrap();
        toast.success(`Le produit a été supprimé de la liste de souhaits`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
        await refresh();
      }
    } catch (err) {}
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [prod, setProd] = useState(null);
  const [getOneProduct, { isSuccess2 }] = useGetOneProductMutation();
  const [index, setIndex] = useState(0);
  const [im, setIm] = useState("");
  const [size, setSize] = useState("size");
  const [sit, setSit] = useState(false);
  function addtoCart(prod, id) {
    if (id && prod && size !== "size" && color !== "") {
      const there = cartItems.find((el) => el.id === id);
      if (!there) {
        dispatch(
          setCartItem([
            ...cartItems,
            { id: id, count: 1, color: color, size: size },
          ])
        );
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cartItems,
            { id: id, count: 1, color: color, size: size },
          ])
        );
        toast.success(`The product has been added to cart`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else {
        toast.warning(`This Item is already in your cart`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } else {
      if (size === "size" && color !== "") {
        toast.warning(`Please select a size`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else if (size !== "size" && color === "") {
        toast.warning(`Please select a color`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else if (size === "size" && color === "") {
        toast.warning(`Please select a color and a size`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    }
  }
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full pt-[30px] mb-[70px]  mt-[115px]  px-3 md:px-9">
      <h1 className="text-[40px] font-extrabold text-center">
        {trr === "fr"
          ? "LISTE DE SOUHAITS"
          : trr === "eng"
          ? "WISHLIST"
          : trr === "ar" && "قائمة الرغبات"}
      </h1>
      {favorite && favorite.length > 0 ? (
        <p className="text-[18px] font-bold text-gray-500 mt-[30px]">
          {trr === "fr"
            ? "Vous Avez"
            : trr === "eng"
            ? "You Have"
            : trr === "ar" && "لديك"}
          <span className=" text-red-600 font-extrabold">
            {favorite && favorite.length}
          </span>
          {trr === "fr"
            ? "articles dans votre liste de souhaits"
            : trr === "eng"
            ? "items in your wish list."
            : trr === "ar" && "عناصر في قائمة الرغبات الخاصة بك."}
        </p>
      ) : (
        <div className=" flex gap-10 flex-col  mt-[30px]">
          <p className="text-[18px] font-bold text-gray-500">
            {trr === "fr"
              ? "articles dans votre liste de souhaits"
              : trr === "eng"
              ? "Ajoutez vos articles préférés à votre liste de souhaits et ils apparaîtront ici."
              : trr === "ar" &&
                "أضف العناصر المفضلة لديك إلى قائمة أمنياتك وسوف تظهر هنا"}
          </p>
          {trr === "ar" ? (
            <div
              onClick={() => navigate(-1)}
              className="flex items-center w-[170px] justify-center hover:bg-bcolor hover:text-white font-bold  cursor-pointer gap-2 text-[20px] transition-all duration-300 ease-in-out p-2 border border-bcolor rounded-md "
            >
              <p>
                {trr === "fr"
                  ? "Retour"
                  : trr === "eng"
                  ? "Return"
                  : trr === "ar" && "العودة"}
              </p>
              <IoMdArrowRoundBack className="text-[24px]" />
            </div>
          ) : (
            <div
              onClick={() => navigate(-1)}
              className="flex items-center w-[170px] justify-center hover:bg-bcolor hover:text-white font-bold  cursor-pointer gap-2 text-[20px] transition-all duration-300 ease-in-out p-2 border border-bcolor rounded-md "
            >
              <IoMdArrowRoundBack className="text-[24px]" />
              <p>
                {trr === "fr"
                  ? "Retour"
                  : trr === "eng"
                  ? "Return"
                  : trr === "ar" && "العودة"}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 mt-10 relative">
        {favorite &&
          favorite.length > 0 &&
          favorite.map((ele) => {
            return (
              <div
                key={ele.itemId}
                className=" group border  w-full mb-4 sm:mb-0 h-[460px] md:h-[460px] relative flex flex-col cursor-pointer   hover:border-gray-200 rounded-lg overflow-hidden hover:shadow-xl   transition-all duration-300 ease-in-out"
              >
                <Link
                  to={`/productInformation/${ele.product._id}`}
                  className="w-full h-[55%] overflow-hidden"
                >
                  <img
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out"
                    src={ele.product.coverImage}
                    alt="product"
                  />
                </Link>
                <div
                  className={`h-[45%] flex flex-col items-center justify-evenly relative overflow-hidden  px-3 py-2 text-center 
                  `}
                >
                  <p className=" text-[16px] sm:text-[16px] font-bold">
                    {ele.product.productTitle}
                  </p>
                  {ele.product.onSale ? (
                    <div className="flex  justify-between flex-wrap items-center w-full">
                      <span className=" text-[15px]  text-gray-400 line-through">
                        {ele.product.price} DZD
                      </span>
                      <span className="text-[15px]  text-gray-500">
                        {Number(ele.product.price) -
                          Number(
                            (ele.product.price * Number(ele.product.sale)) / 100
                          )}
                        DZD
                      </span>
                    </div>
                  ) : (
                    <span className=" text-[15px] text-gray-500">
                      {ele.product.price}DZD
                    </span>
                  )}
                  <div className="flex items-center w-full justify-between">
                    <p className="text-[16px] font-bold">
                      {trr === "fr"
                        ? "Taille:"
                        : trr === "eng"
                        ? "Size:"
                        : trr === "ar" && ":المقاس"}
                    </p>
                    <select
                      name="category"
                      id="category"
                      required
                      onChange={(e) => setSize(e.target.value)}
                      value={size}
                      className=" px-1 py-1 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-[100px] font-bold rounded-md text-[16px] focus:ring-1 cursor-pointer"
                      placeholder="Product category..."
                    >
                      <option value="">
                        {trr === "fr"
                          ? "Taille:"
                          : trr === "eng"
                          ? "Size:"
                          : trr === "ar" && ":المقاس"}
                      </option>
                      {ele.product.size
                        .split("/")
                        .filter((ele) => ele !== "/")
                        .map((el, i) => {
                          return (
                            <option key={i} value={el}>
                              {el}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <p className="text-[16px] font-bold">
                      {trr === "fr"
                        ? "Couleur:"
                        : trr === "eng"
                        ? "Color:"
                        : trr === "ar" && "اللون:"}
                    </p>
                    <div className=" flex items-center gap-3">
                      {ele.product.colors.map((ele, i) => {
                        return (
                          <div
                            onClick={() => {
                              setj(i);
                              setColor(ele);
                            }}
                            key={i}
                            style={{
                              backgroundColor: ele,
                              opacity: j === i ? 1 : 0.4,
                              transitionDuration: 0.5,
                              transitionTimingFunction: "ease-in-out",
                            }}
                            className={`w-[20px] h-[20px] border border-black rounded-full cursor-pointer transition-all duration-300 ease-in-out`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  {Number(ele.product.stock) > 0 ? (
                    <div
                      onClick={() => addtoCart(ele.product, ele.product._id)}
                      className="w-full h-[40px] flex justify-center items-center border border-fcolor font-semibold rounded-md transition-all duration-300 ease-in-out hover:bg-fcolor hover:text-white"
                    >
                      {trr === "fr"
                        ? "Ajouter au panier"
                        : trr === "eng"
                        ? "Add to cart"
                        : trr === "ar" && "أضف إلى السلة"}
                    </div>
                  ) : (
                    <div className="w-full h-[40px] flex justify-center items-center border border-fcolor font-semibold rounded-md transition-all duration-300 ease-in-out bg-fcolor text-white">
                      {trr === "fr"
                        ? "Rupture de stock"
                        : trr === "eng"
                        ? "Out of stock"
                        : trr === "ar" && "إنتهى من المخزن"}
                    </div>
                  )}
                </div>
                <div className=" absolute top-[10px] right-3 flex flex-col gap-2 md:-z-10 md:opacity-0  group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-300">
                  <div
                    onClick={() => remov(ele.itemId)}
                    className=" w-[30px] h-[30px] rounded-full drop-shadow-2xl  flex justify-center items-center bg-black text-white hover:bg-red-500"
                  >
                    <FaXmark size={17} />
                  </div>
                </div>
                {+ele.product.stock <= 0 ? (
                  <div className=" absolute top-3 left-3 text-[14px] bg-red-600 text-white font-bold drop-shadow-xl px-3 py-1 rounded-full">
                    {trr === "fr"
                      ? "Rupture de stock"
                      : trr === "eng"
                      ? "Out of stock"
                      : trr === "ar" && "إنتهى من المخزن"}
                  </div>
                ) : (
                  ele.product.onSale && (
                    <div className=" absolute top-3 left-3 text-[14px] bg-green-600 text-white font-bold drop-shadow-xl px-3 py-1 rounded-full">
                      {trr === "fr"
                        ? "EN SOLDE:"
                        : trr === "eng"
                        ? "ON SALE:"
                        : trr === "ar" && "الخصم"}
                      : {ele.product.sale}%
                    </div>
                  )
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WishLiset;
