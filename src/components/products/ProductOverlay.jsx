import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaRegHeart, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { opOver } from "../../app/api/productOverlay";
// ////////////////////////////////////////////////
import { useState } from "react";
import { useGetOneProductMutation } from "./productApi";
import { FaHeart, FaInfoCircle, FaShoppingBag } from "react-icons/fa";
import { useLovedMutation, useUnlovedMutation } from "../info/infoApiSlice";
import useAuth from "../../hooks/useAuth";
import { useRefreshMutation } from "../auth/authApiSlice";
import { toast } from "react-toastify";
import { setCartItem } from "../../app/api/cartSlice";
import { Link, useLocation } from "react-router-dom";
// Import Swiper React components

const ProductOverlay = ({ id, setLog }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const trr = useSelector((state) => state.tran.tran);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const [prod, setProd] = useState(null);
  const [getOneProduct, { isSuccess }] = useGetOneProductMutation();
  const [index, setIndex] = useState(0);
  const [im, setIm] = useState("");
  const [j, setj] = useState(0);
  const [color, setColor] = useState("");
  const [loved, { isLoading }] = useLovedMutation();
  const [unloved, { isLoading2 }] = useUnlovedMutation();
  const { _id, isAdmin, favorite } = useAuth();
  const [refresh, { isUninitialized, isLoading3, isSuccess2, isError, error }] =
    useRefreshMutation();
  const [size, setSize] = useState("size");
  const [sit, setSit] = useState(false);

  const zoomPro = () => {
    dispatch(opOver(false));
  };
  const get = async () => {
    try {
      const product = await getOneProduct({ id: id });
      setProd(product.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get();
  }, []);
  const changeimg = (i, ele) => {
    setIndex(i);
    setIm(ele);
  };
  const setLove = async (userId, productId, itemId) => {
    try {
      if (_id && prod) {
        if (!favorite.find((e) => e.product._id === prod._id)) {
          const love = await loved({
            userId: userId,
            productId: productId,
          }).unwrap();
          toast.success(`Le produit a été ajouté à la liste de souhaits`, {
            position: "top-center",
            theme: "dark",
            autoClose: 2000,
          });
          await refresh();
        } else {
          const un = await unloved({
            userId: userId,
            itemId: itemId,
          }).unwrap();
          toast.success(`Le produit a été supprimé de la liste de souhaits`, {
            position: "top-center",
            theme: "dark",
            autoClose: 2000,
          });
          await refresh();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (_id && prod) {
      if (!favorite.find((e) => e.product._id === prod._id)) {
        setSit(false);
      } else {
        setSit(true);
      }
    }
  }, [_id, isLoading, isLoading2, [], favorite]);
  const out = () => {
    dispatch(opOver(false));
    setLog(true);
  };
  function addtoCart() {
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
        dispatch(opOver(false));
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
  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-[#0000008a] fixed flex justify-center items-center  top-0 left-0 z-[1000]"
    >
      <motion.div
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
        initial={{ marginTop: -350, opacity: 0 }}
        animate={{ marginTop: 0, opacity: 1 }}
        exit={{ marginTop: -350, opacity: 0 }}
        className="h-[98%] md:h-[97%] w-[98%] overflow-y-scroll kha md:w-[85%] relative bg-white p-3 md:p-5"
      >
        <div className=" fixed top-3 z-[100] right-3 text-[30px] text-black md:text-white  transition-all duration-300 ease-in-out hover:text-red-600 cursor-pointer hover:rotate-[180deg]">
          <FaXmark onClick={() => zoomPro()} />
        </div>
        {prod ? (
          <div className="grid grid-cols-1 w-full h-full lg:grid-cols-2 gap-5">
            <div className="w-full h-full flex flex-col justify-between ">
              <div className=" w-full h-[400px] md:h-[470px] overflow-hidden relative">
                <div className="w-[150px] flex flex-col gap-2 h-fit p-3 justify-center absolute top-0 left-0">
                  {prod.onSale && Number(prod.stock) < 0 && (
                    <div className=" bg-green-500 text-sm font-bold w-fit px-2 py-[2px] rounded-md text-white">
                      {trr === "fr"
                        ? "EN SOLDE:"
                        : trr === "eng"
                        ? "ON SALE:"
                        : trr === "ar" && ":الخصم"}
                      {prod.sale}%
                    </div>
                  )}
                  {Number(prod.stock) < 1 && (
                    <div className=" bg-red-500 text-md font-bold w-fit px-2 py-[2px] rounded-md text-white">
                      {trr === "fr"
                        ? "Rupture de stock"
                        : trr === "eng"
                        ? "Out of stock"
                        : trr === "ar" && "إنتهى من المخزن"}
                    </div>
                  )}
                </div>
                {im === "" ? (
                  <img
                    src={prod.coverImage}
                    alt=""
                    className="w-full h-full  object-cover"
                  />
                ) : (
                  <img
                    src={im}
                    alt=""
                    className="w-full h-full transition-all duration-300 ease-in-out  object-cover"
                  />
                )}
              </div>
              <div className=" w-[250px] sm:w-full h-[110px] kha gap-2 overflow-x-scroll sm:overflow-hidden  md:gap-3 flex items-center ">
                {prod.images.slice(0, 5).map((ele, i) => {
                  return (
                    <div
                      key={ele}
                      className={`w-[80px] bg-scolor mt-2 sm:mt-0 flex justify-center items-center cursor-pointer hover:opacity-100 aspect-square transition-all duration-500 ease-in-out ${
                        i === index ? "opacity-100" : "opacity-70"
                      }`}
                      onClick={() => changeimg(i, ele)}
                    >
                      <img
                        src={ele}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4 p-0 md:p-5">
              <h1 className="text-[35px] text-bcolor font-bold flex flex-wrap gap-3 items-center justify-between">
                {prod.productTitle}
                <p className="text-[18px]">/ {prod.family}</p>
              </h1>
              <div className="flex justify-between items-center  gap-2 flex-wrap">
                {prod.onSale ? (
                  <div className="flex items-center gap-2">
                    <p className="text-[25px] font-semibold ">
                      {Number(prod.price) -
                        Number((prod.price * Number(prod.sale)) / 100)}
                      DZD
                    </p>
                    <p className="text-[18px] line-through text-slate-500 mt-auto">
                      {prod.price}DZD
                    </p>
                  </div>
                ) : (
                  <p className="text-[25px] font-semibold">{prod.price}DZD</p>
                )}
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-[20px]">
                    {Object.keys(prod.likes).length}
                  </p>
                  <p className="  font-semibold text-[20px]">
                    {trr === "fr"
                      ? "j'aime"
                      : trr === "eng"
                      ? "Likes"
                      : trr === "ar" && "اعجاب"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-2">
                  <p className="text-[18px] font-bold">
                    {trr === "fr"
                      ? "Catégorie"
                      : trr === "eng"
                      ? "Category"
                      : trr === "ar" && "فئة"}
                    :
                  </p>
                  <p className="text-[18px] flex font-semibold text-slate-500">
                    {prod.category}
                  </p>
                </div>
                <p className=" font-extrabold text-[18px]">{prod.type}</p>
              </div>
              <p className="text-[16px] leading-relaxed font-bold text-slate-500 ">
                {trr === "fr"
                  ? prod.descriptionFr
                  : trr === "eng"
                  ? prod.descriptionEn
                  : trr === "ar" && prod.descriptionAr}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[18px] font-bold">
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
                  className=" px-3 py-1 w-[100px] bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  font-bold rounded-md text-lg focus:ring-1 cursor-pointer"
                  placeholder="Product category..."
                >
                  <option value="size">
                    {trr === "fr"
                      ? "Taille"
                      : trr === "eng"
                      ? "Size"
                      : trr === "ar" && "المقاس"}
                  </option>
                  {prod.size
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
              <div className="flex items-center gap-3">
                <p className="text-[18px] font-bold">
                  {trr === "fr"
                    ? "Couleur:"
                    : trr === "eng"
                    ? "Color:"
                    : trr === "ar" && "اللون:"}
                </p>
                <div className=" flex items-center gap-3">
                  {prod.colors.map((ele, i) => {
                    return (
                      <div
                        onClick={() => {
                          setj(i);
                          setColor(ele);
                        }}
                        key={i}
                        style={{
                          backgroundColor: ele,
                          opacity: j === i ? 1 : 0.3,
                          transitionDuration: 0.5,
                          transitionTimingFunction: "ease-in-out",
                        }}
                        className={`w-[30px] h-[30px] rounded-full  cursor-pointer transition-all duration-300 border border-black ease-in-out`}
                      ></div>
                    );
                  })}
                </div>
              </div>
              {prod.stock > 0 ? (
                <button
                  onClick={() => addtoCart()}
                  className="w-[100%] rounded-md gap-2 transition-all duration-300 ease-in-out hover:bg-[#660066] flex h-[60px] justify-center items-center text-xl text-bold bg-fcolor text-white"
                >
                  <FaShoppingBag />
                  {trr === "fr"
                    ? "Ajouter au panier"
                    : trr === "eng"
                    ? "Add to cart"
                    : trr === "ar" && "أضف إلى السلة"}
                </button>
              ) : (
                <div className="w-[100%] gap-2 h-[60px] transition-all duration-300 ease-in-out hover:bg-[#660066] flex  justify-center items-center text-xl text-bold bg-fcolor text-white">
                  {trr === "fr"
                    ? "Rupture de stock"
                    : trr === "eng"
                    ? "Out of stock"
                    : trr === "ar" && "إنتهى من المخزن"}
                </div>
              )}

              {/* <div className="flex items-center w-full border border-3 border-bcolor h-[60px]"></div> */}
              <div className="w-full flex items-center justify-between gap-2 md:mb-0 mb-3 flex-wrap">
                {!sit ? (
                  <div
                    onClick={() => (_id ? setLove(_id, prod._id) : out())}
                    className="flex items-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer"
                  >
                    <FaRegHeart />
                    <p>
                      {trr === "fr"
                        ? "Ajouter à la liste de souhaits"
                        : trr === "eng"
                        ? "Add to wishlist"
                        : trr === "ar" && "أضف إلى قائمة الرغبات"}
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      _id
                        ? setLove(
                            _id,
                            prod._id,
                            favorite.find((e) => e.product._id === prod._id)
                              .itemId
                          )
                        : out()
                    }
                    className="flex items-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer"
                  >
                    <FaHeart className=" text-red-500" />

                    <p>
                      {trr === "fr"
                        ? "Retirer de la liste de souhaits"
                        : trr === "eng"
                        ? "Remove from wishlist"
                        : trr === "ar" && "إزالة من قائمة الرغبات"}
                    </p>
                  </div>
                )}

                <Link
                  onClick={() => dispatch(opOver(false))}
                  to={`/productInformation/${prod._id}`}
                  className="flex items-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer"
                >
                  <FaInfoCircle />
                  <p>
                    {trr === "fr"
                      ? "Plus d'informations"
                      : trr === "eng"
                      ? "More information"
                      : trr === "ar" && "معلومات اكثر"}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex h-full justify-center items-center">
            <h1 className="text-fcolor text-center text-[35px] font-bold">
              {trr === "fr"
                ? "Plus d'informations"
                : trr === "eng"
                ? "Quelque chose s'est mal passé, veuillez réessayer plus tard"
                : trr === "ar" && "هناك خطأ ما، يرجى المحاولة لاحقًا"}
            </h1>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductOverlay;
