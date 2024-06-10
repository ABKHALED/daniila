import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAcommentMutation,
  useDcommentMutation,
  useGetOneProductMutation,
  useGetProdcutsQuery,
  useLikedMutation,
} from "./productApi";
import { IoMdArrowRoundBack } from "react-icons/io";
import TopImage from "../TopImage";
import img from "../../assets/proprietaire-boutique-mode-mesure-sa-robe-dans-studio-noir-blanc-genere-par-ia.jpg";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import {
  FaComment,
  FaMagnifyingGlassPlus,
  FaRegHeart,
  FaRegUser,
  FaXmark,
} from "react-icons/fa6";
import { opOver } from "../../app/api/productOverlay";
// import Zoom from "react-img-zoom";
import { AiOutlineLike } from "react-icons/ai";
// ////////////////////////////////////////////
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";

// ///////////////////////////////////////////
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import useAuth from "../../hooks/useAuth";

import { IoAddCircleSharp } from "react-icons/io5";
import {
  useGetUserMutation,
  useLovedMutation,
  useUnlovedMutation,
} from "../info/infoApiSlice";
import ProductCart from "./ProductCart";
import { useRefreshMutation } from "../auth/authApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../app/api/cartSlice";
import { HashLoader } from "react-spinners";

////////////////////////////////////////
const ProductInfo = ({ setLog }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [fullImage, setFullImage] = useState(false);
  const [im, setIm] = useState("");
  const navigate = useNavigate();
  const [getOneProduct, { isSuccess }] = useGetOneProductMutation();
  const [liked, { isSuccessLiked }] = useLikedMutation();
  const [acomment, { isSuccessComment }] = useAcommentMutation();
  const fullscreenRef = useRef(null);
  const slideshowRef = React.useRef(null);
  const zoomRef = React.useRef(null);
  const thumbnailsRef = React.useRef(null);
  const { _id, isAdmin, favorite } = useAuth();
  const [isLiked, setIsliked] = useState(null);
  const [comment, setComment] = useState("");
  const [getUser, { isLoading }] = useGetUserMutation();
  const [isAllComment, setIsAllComment] = useState(false);
  const [dcomment, { isLoadingComment }] = useDcommentMutation();
  const [data, setData] = useState(null);
  const [usersImages, setUsersImages] = useState([]);
  const [rendom, setRandom] = useState([]);
  const [j, setj] = useState(0);
  const [loved, { isLoading3 }] = useLovedMutation();
  const [unloved, { isLoading2 }] = useUnlovedMutation();
  const [refresh, { isUninitialized, isLoading4, isSuccess2, isError, error }] =
    useRefreshMutation();

  const [sit, setSit] = useState(false);
  const [color, setColor] = useState("");
  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
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
    setUsersImages([]);
  }, []);

  useEffect(() => {
    get();
  }, [id]);
  useEffect(() => {
    setRandom([]);
    if (data) {
      let arr = [];
      for (let index = 0; index < 4; index++) {
        arr.push(Math.floor(Math.random() * data.length));
      }
      setRandom(arr);
    }
  }, [data]);
  useEffect(() => {
    if (prod) {
      setUsersImages([]);
      setIsliked(Boolean(prod.likes[_id]));
      prod.comments.map((ele) => {
        return getImages(ele.userId);
      });
    }
  }, [prod]);
  useEffect(() => {
    setIm([]);
    if (prod) {
      prod.images.map((ele) => {
        return setIm((prev) => [...prev, { src: ele }]);
      });
    }
  }, [fullImage]);
  const addLike = async () => {
    try {
      if (_id) {
        const product = await liked({ id: id, userId: _id });
        setProd(product.data);
      } else {
        setLog(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addComment = async () => {
    try {
      if (comment && comment !== "" && _id) {
        const product = await acomment({
          id: id,
          userId: _id,
          comment: comment,
        });
        setProd(product.data);
        setComment("");
      } else if (!_id) {
        setLog(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getImages = async (id) => {
    try {
      const users = await getUser({ userId: id }).unwrap();
      setUsersImages((prev) => [
        ...prev,
        {
          img: users.picturePath,
          name: `${users.firstName} ${users.lastName}`,
          userId: users._id,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const deletComment = async (prodId, userId, commentId) => {
    try {
      if (prodId && userId && commentId) {
        const product = await dcomment({
          id: prodId,
          userId: userId,
          commentId: commentId,
        });
        setProd(product.data);
        setUsersImages([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products) {
      setData([...products].reverse().slice(0, 6));
    }
  }, [products]);

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
  const trr = useSelector((state) => state.tran.tran);
  useEffect(() => {
    if (_id && prod) {
      if (!favorite.find((e) => e.product._id === prod._id)) {
        setSit(false);
      } else {
        setSit(true);
      }
    }
  }, [_id, [], favorite]);
  const out = () => {
    setLog(true);
  };
  const [size, setSize] = useState("size");
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const dispatch = useDispatch();
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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full h-full relative mt-[115px] mb-[70px]">
      <AnimatePresence>
        {isAllComment && (
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" fixed top-0 left-0 w-[100%] h-[100vh] z-[1000] flex justify-center items-center"
          >
            <div
              className=" absolute top-0 left-0 w-[100%] h-[100%] z-[100] bg-[#0000008a]"
              onClick={() => setIsAllComment(false)}
            ></div>
            <div
              className=" absolute top-2 text-[25px] right-2 cursor-pointer w-fit h-fit z-[1000] text-white hover:text-red-500 hover:rotate-180 transition-all duration-300 ease-in-out"
              onClick={() => setIsAllComment(false)}
            >
              <FaXmark />
            </div>
            <div className="w-[80%] h-[90%] bg-white relative z-[10000] p-5 kha overflow-y-auto ">
              <h1 className="text-center text-fcolor font-bold text-lg">
                {trr === "fr"
                  ? "Tous vos commentaires"
                  : trr === "eng"
                  ? "All your comments"
                  : trr === "ar" && "كل التعليقات"}
              </h1>
              <div className="w-full h-full mt-4 flex flex-col gap-2">
                {prod &&
                usersImages &&
                usersImages.length > 0 &&
                prod.comments.length <= usersImages.length ? (
                  prod.comments.map((ele, i) => {
                    return (
                      <div key={i}>
                        <div className="w-full p-2 flex items-center gap-4 rounded-md border-slate-400 sh relative">
                          {ele.userId === _id && (
                            <div
                              onClick={() =>
                                deletComment(prod._id, _id, ele.commentId)
                              }
                              className=" text-[18px] cursor-pointer absolute top-1 right-1 text-red-600"
                            >
                              <FaXmark />
                            </div>
                          )}
                          <div className=" rounded-full h-[40px] w-[40px] flex justify-center items-center">
                            <>
                              {!usersImages.find(
                                (el) => el.userId === ele.userId
                              ).img ||
                              usersImages.find((el) => el.userId === ele.userId)
                                .img === "" ? (
                                <div className="w-full h-full rounded-full flex justify-center items-center bg-slate-300 text-[25px]">
                                  <FaRegUser />
                                </div>
                              ) : (
                                <img
                                  src={
                                    usersImages.length > 0 &&
                                    usersImages.find(
                                      (el) => el.userId === ele.userId
                                    ).img
                                  }
                                  className="w-full h-full object-cover rounded-full "
                                  alt=""
                                />
                              )}
                            </>
                          </div>

                          <div className="flex flex-col gap-[2px]">
                            <p className="text-md font-bold">
                              {
                                usersImages.find(
                                  (el) => el.userId === ele.userId
                                ).name
                              }
                            </p>
                            <p className="text-sm text-slate-600">
                              {ele.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-md font-bold w-ful h-full flex justify-center items-center">
                    Comments...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Lightbox
        open={fullImage}
        close={() => setFullImage(false)}
        slides={im}
        plugins={[Fullscreen, Slideshow, Zoom, Captions, Thumbnails]}
        fullscreen={{ ref: fullscreenRef }}
        slideshow={{ ref: slideshowRef }}
        zoom={{ ref: zoomRef }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
          },
        }}
        on={{
          click: () => {
            (slideshowRef.current?.playing
              ? slideshowRef.current?.pause
              : slideshowRef.current?.play)?.();
            fullscreenRef.current?.enter();
            (thumbnailsRef.current?.visible
              ? thumbnailsRef.current?.hide
              : thumbnailsRef.current?.show)?.();
          },
        }}
      />
      <TopImage
        img={img}
        text={"Product Information"}
        cat={prod && prod.productTitle}
      />
      <div className="px-3 md:px-9 w-full h-full pt-10">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center w-[170px] justify-center hover:bg-bcolor hover:text-white font-bold  cursor-pointer gap-2 text-[20px] transition-all duration-300 ease-in-out p-2 border border-bcolor rounded-md "
        >
          {trr === "ar" ? (
            <>
              <p>العودة</p>
              <IoMdArrowRoundBack className="text-[24px]" />
            </>
          ) : (
            <>
              <IoMdArrowRoundBack className="text-[24px]" />
              <p> {trr === "fr" ? "Retour" : trr === "eng" && "Return"}</p>
            </>
          )}
        </div>
        {prod ? (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 h-full mt-8 mb-10">
            <div className="w-full h-fit order-2 lg:order-1  ">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {prod.images.map((ele, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="w-full h-full relative group ">
                        <div
                          onClick={() => {
                            setFullImage(true);
                            setIm(ele);
                          }}
                          className=" absolute top-5 right-5 w-fit h-fit text-2xl opacity-100 md:opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 cursor-pointer text-black "
                        >
                          <FaMagnifyingGlassPlus />
                        </div>
                        <img
                          src={ele}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div className="w-full h-full order-1 lg:order-2">
              <div className="w-full h-full flex flex-col gap-4 p-0 md:p-5 ">
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
                  <p className=" font-bold text-[18px]">{prod.family}</p>
                </div>
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
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[18px]">
                      {Object.keys(prod.likes).length}
                    </p>
                    <p className=" text-blue-500 font-semibold text-[18px]">
                      {trr === "fr"
                        ? "j'aime"
                        : trr === "eng"
                        ? "Likes"
                        : trr === "ar" && "اعجاب"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  {Number(prod.stock) > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-[18px] font-bold">
                        {trr === "fr"
                          ? "En stock :"
                          : trr === "eng"
                          ? "In stock :"
                          : trr === "ar" && "في المخزون :"}
                      </p>
                      <p className="text-[18px] font-semibold text-green-600">
                        {prod.stock}{" "}
                        <span className=" text-[18px] font-bold text-slate-600 ">
                          {trr === "fr"
                            ? "pièce"
                            : trr === "eng"
                            ? "pice"
                            : trr === "ar" && "قطعة"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className=" text-red-600 font-bold text-[18px]">
                      {trr === "fr"
                        ? "Rupture de stock"
                        : trr === "eng"
                        ? "Out of stock"
                        : trr === "ar" && "إنتهى من المخزن"}
                    </p>
                  )}
                  {prod.onSale && Number(prod.stock) > 0 && (
                    <div className="flex items-center gap-2">
                      <p className="text-[18px] font-bold">
                        {trr === "fr"
                          ? "EN SOLDE:"
                          : trr === "eng"
                          ? "ON SALE:"
                          : trr === "ar" && ":الخصم"}
                      </p>
                      <p className="text-[18px] font-semibold text-green-600">
                        {prod.sale}{" "}
                        <span className=" text-[18px] font-bold text-green-600 ">
                          %
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-[18px] leading-relaxed font-bold text-slate-500 ">
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
                    className=" px-3 py-1 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-[100px] font-bold rounded-md text-lg focus:ring-1 cursor-pointer"
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
                            opacity: j === i ? 1 : 0.4,
                            transitionDuration: 0.5,
                            transitionTimingFunction: "ease-in-out",
                          }}
                          className={`w-[30px] h-[30px] rounded-full border border-black cursor-pointer transition-all duration-300 ease-in-out`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center w-full rounded-md  h-[60px]">
                  {prod.stock > 0 ? (
                    <button
                      onClick={() => addtoCart()}
                      className="w-full rounded-md gap-2 transition-all duration-300 ease-in-out hover:bg-[#660066] flex h-full justify-center items-center text-xl text-bold bg-fcolor text-white"
                    >
                      <FaShoppingBag />
                      {trr === "fr"
                        ? "Ajouter au panier"
                        : trr === "eng"
                        ? "Add to cart"
                        : trr === "ar" && "أضف إلى السلة"}
                    </button>
                  ) : (
                    <div className="w-full gap-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#660066] flex h-full justify-center items-center text-xl text-bold bg-fcolor text-white">
                      {trr === "fr"
                        ? "Rupture de stock"
                        : trr === "eng"
                        ? "Out of stock"
                        : trr === "ar" && "إنتهى من المخزن"}
                    </div>
                  )}
                </div>
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center h-[10vh] items-center">
            <HashLoader color="#36d7b7" />
          </div>
        )}
        {prod && (
          <>
            <div className=" flex items-center justify-center">
              <h1 className="tsts font-bold mb-[50px] text-[40px] md:text-[70px]  ">
                {trr === "fr"
                  ? "Avis Sur les Produits"
                  : trr === "eng"
                  ? "Product Reviews"
                  : trr === "ar" && "مراجعات المنتج"}
              </h1>
            </div>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="  w-full h-full  p-2">
                <h1 className="text-center text-lg font-bold text-fcolor">
                  {trr === "fr"
                    ? "Vos commentaires"
                    : trr === "eng"
                    ? "Your comments"
                    : trr === "ar" && "تعليقاتكم"}
                </h1>
                <div className="flex border p-2 rounded-md  items-center justify-between w-full mt-4">
                  <div
                    onClick={() => setIsAllComment(true)}
                    className="flex items-center gap-2 text-xl hover:text-fcolor transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <FaComment />
                    <p>
                      {prod.comments.length}{" "}
                      {trr === "fr"
                        ? "Commentaires"
                        : trr === "eng"
                        ? "comments"
                        : trr === "ar" && "تعليق"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xl ">
                    <div onClick={() => (_id ? addLike() : setLog(true))}>
                      {isLiked ? (
                        <AiFillLike className="text-fcolor hover:text-fcolor transition-all duration-300 ease-in-out cursor-pointer" />
                      ) : (
                        <AiOutlineLike className=" hover:text-fcolor transition-all duration-300 ease-in-out cursor-pointer" />
                      )}
                    </div>
                    <p className="">{Object.keys(prod.likes).length}</p>
                    <p className="">
                      {trr === "fr"
                        ? "j'aime"
                        : trr === "eng"
                        ? "Likes"
                        : trr === "ar" && "اعجاب"}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[380px] mt-4 flex flex-col gap-2">
                  {usersImages &&
                  usersImages.length > 0 &&
                  prod &&
                  prod.comments.length <= usersImages.length &&
                  prod.comments.length > 0 ? (
                    prod.comments.map((ele, i) => {
                      return (
                        <div key={i}>
                          <div className="w-full p-2 flex items-center gap-4 rounded-md border-slate-400 sh relative">
                            {ele.userId === _id && (
                              <div
                                onClick={() =>
                                  deletComment(prod._id, _id, ele.commentId)
                                }
                                className=" text-[18px] cursor-pointer absolute top-1 right-1 text-red-600"
                              >
                                <FaXmark />
                              </div>
                            )}

                            <div className=" rounded-full h-[40px] w-[40px] flex justify-center items-center">
                              <>
                                {!usersImages.find(
                                  (el) => el.userId === ele.userId
                                ).img ||
                                usersImages.find(
                                  (el) => el.userId === ele.userId
                                ).img === "" ? (
                                  <div className="w-full h-full rounded-full flex justify-center items-center bg-slate-300 text-[20px]">
                                    <FaRegUser />
                                  </div>
                                ) : (
                                  <img
                                    src={
                                      usersImages.find(
                                        (el) => el.userId === ele.userId
                                      ).img
                                    }
                                    className="w-full h-full object-cover rounded-full "
                                    alt=""
                                  />
                                )}
                              </>
                            </div>

                            <div className="flex flex-col gap-[2px]">
                              <p className="text-md font-bold">
                                {
                                  usersImages.find(
                                    (el) => el.userId === ele.userId
                                  ).name
                                }
                              </p>
                              <p className="text-sm text-slate-600">
                                {ele.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-md font-bold w-ful h-full flex justify-center items-center">
                      Comments...
                    </div>
                  )}
                </div>

                <div className="w-full h-[100px] relative">
                  <textarea
                    name=""
                    id=""
                    placeholder="Your comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className=" p-2 text-lg resize-none w-full h-[100px] rounded-lg border outline-none focus:outline-fcolor "
                  ></textarea>
                  <IoAddCircleSharp
                    onClick={addComment}
                    className=" text-[25px] cursor-pointer transition-all duration-300 ease-in-out hover:text-fcolor absolute right-1 bottom-1 z-50"
                  />
                </div>
              </div>
              <div className="w-full h-full  overflow-hidden  justify-center items-center hidden md:flex">
                <img
                  src={prod.coverImage}
                  alt=""
                  className="w-full h-[500px] rounded-md object-cover"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-3 md:px-9 w-full h-full mt-10">
        <p className="text-xl text-center sm:text-start sm:text-2xl font-bold pt-5">
          {trr === "fr"
            ? "Vous aimerez peut-être aussi ceux-ci"
            : trr === "eng"
            ? "You might also like these"
            : trr === "ar" && "قد تعجب بهذه ايضا"}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-10">
          {data && prod && (
            <>
              {data && data.length >= 4
                ? data
                    .filter((ele) => ele.category === prod.category)
                    .slice(0, 4)
                    .map((ele) => {
                      return <ProductCart key={ele._id} ele={ele} />;
                    })
                : ""}

              {/* {data.length < 4
                ? data.slice(0, 4).map((ele) => {
                    return <ProductCart key={ele._id} ele={ele} />;
                  })
                : rendom.slice(0, 4).map((ele) => {
                    return <ProductCart key={data[ele]._id} ele={data[ele]} />;
                  })} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
