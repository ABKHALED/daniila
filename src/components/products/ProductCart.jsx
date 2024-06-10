import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";

// import { MdAddShoppingCart, MdOutlineZoomOutMap } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { opOver, setProId } from "../../app/api/productOverlay";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLovedMutation, useUnlovedMutation } from "../info/infoApiSlice";
import { toast } from "react-toastify";
import { useRefreshMutation } from "../auth/authApiSlice";
import { selectCurrentToken } from "../auth/authSlice";
import usePersist from "../../hooks/usePersist";
import { setCartItem } from "../../app/api/cartSlice";
const ProductCart = ({ ele, bo, setLog }) => {
  const dispatch = useDispatch();
  const { _id, isAdmin, favorite } = useAuth();
  const [sit, setSit] = useState(false);
  const zoomPro = (id, e) => {
    e.stopPropagation();
    dispatch(opOver(true));
    dispatch(setProId(id));
  };

  const [loved, { isLoading }] = useLovedMutation();
  const [unloved, { isLoading2 }] = useUnlovedMutation();
  const trr = useSelector((state) => state.tran.tran);

  // /////////////////////////////////////////////////////////
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const token = useSelector(selectCurrentToken);
  const [persist, setPersist] = usePersist();
  const [refresh, { isUninitialized, isLoading3, isSuccess, isError, error }] =
    useRefreshMutation();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // //////////////////////////////////////////////////
  const setLove = async (userId, productId, itemId) => {
    try {
      if (_id && ele) {
        if (!favorite.find((e) => e.product._id === ele._id)) {
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
    if (_id && ele) {
      if (!favorite.find((e) => e.product._id === ele._id)) {
        setSit(false);
      } else {
        setSit(true);
      }
    }
  }, [_id, isLoading, isLoading2, [], favorite]);
  function addtoCart() {
    if (ele) {
      const there = cartItems.find((el) => el.id === ele._id);
      if (!there) {
        dispatch(
          setCartItem([
            ...cartItems,
            { id: ele._id, count: 1, color: "", size: "" },
          ])
        );
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartItems, { id: ele._id, count: 1 }])
        );
      } else {
        toast.warning(`This Item is already in your cart`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    }
  }

  return (
    <div className=" group border  w-full mb-4 sm:mb-0 h-[450px] md:h-[480px] relative flex flex-col cursor-pointer   hover:border-gray-200 rounded-lg overflow-hidden hover:shadow-xl   transition-all duration-300 ease-in-out">
      <Link
        to={`/productInformation/${ele._id}`}
        className="w-full h-[70%] overflow-hidden"
      >
        <img
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out"
          src={ele.coverImage}
          alt="product"
        />
      </Link>
      <Link
        to={`/productInformation/${ele._id}`}
        className={`h-[30%] flex flex-col items-center justify-evenly relative overflow-hidden  px-5 py-2 text-center ${
          bo && "bg-white"
        }`}
      >
        <p className=" text-[16px] sm:text-[18px] font-extrabold">
          {ele.productTitle}
        </p>
        {ele.onSale ? (
          <div className="flex justify-evenly flex-wrap items-center w-full">
            <span className=" text-[17px]  text-gray-400 line-through">
              {ele.price} DZD
            </span>
            <span className="text-[17px]  text-gray-500">
              {Number(ele.price) - Number((ele.price * Number(ele.sale)) / 100)}
              DZD
            </span>
          </div>
        ) : (
          <span className=" text-[17px] text-gray-500">{ele.price}DZD</span>
        )}
        {/* <div className="flex justify-center items-center h-[10px] w-full absolute left-0 sm:bottom-[-15px] bottom-[10px] sm:group-hover:bottom-[10px]  gap-1 transition-all duration-300 ease-in-out">
          <FaThumbsUp />
          <p className=" text-[17px]">{Object.keys(ele.likes).length}</p>
        </div> */}
      </Link>
      <div className=" absolute bottom-[34%] right-3 flex flex-col gap-2 md:-z-10 md:opacity-0  group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-300">
        {/* {+ele.stock > 0 && (
          <div
            onClick={() => addtoCart()}
            className=" w-[30px] h-[30px] rounded-full drop-shadow-2xl  flex justify-center items-center bg-fcolor text-white"
          >
            <FaShoppingBag size={17} />
          </div>
        )} */}
        <div
          onClick={(e) => zoomPro(ele._id, e)}
          className="w-[30px] h-[30px] rounded-full drop-shadow-2xl  flex justify-center items-center bg-fcolor text-white"
        >
          <MdOutlineZoomOutMap size={17} />
        </div>
        {!sit ? (
          <div
            onClick={() => (_id ? setLove(_id, ele._id) : setLog(true))}
            className="w-[30px] h-[30px] rounded-full drop-shadow-2xl  flex justify-center items-center bg-fcolor text-white"
          >
            <FaRegHeart size={17} />
          </div>
        ) : (
          <div
            onClick={() =>
              _id
                ? setLove(
                    _id,
                    ele._id,
                    favorite.find((e) => e.product._id === ele._id).itemId
                  )
                : setLog(true)
            }
            className="w-[30px] h-[30px] text-red-600 rounded-full drop-shadow-2xl  flex justify-center items-center bg-black "
          >
            <FaHeart size={17} />
          </div>
        )}
      </div>
      {Number(ele.stock) === 0 ? (
        <div className=" absolute top-3 left-3 text-[14px] bg-red-600 text-white font-bold drop-shadow-xl px-3 py-1 rounded-full">
          {trr === "fr"
            ? "Rupture de stock"
            : trr === "eng"
            ? "Out of stock"
            : trr === "ar" && "إنتهى من المخزن"}
        </div>
      ) : (
        ele.onSale &&
        Number(ele.stock) > 0 && (
          <div className=" absolute top-3 left-3 text-[14px] bg-green-600 text-white font-bold drop-shadow-xl px-3 py-1 rounded-full">
            {trr === "fr"
              ? "EN SOLDE:"
              : trr === "eng"
              ? "ON SALE:"
              : trr === "ar" && "خصم"}
            {ele.sale}%
          </div>
        )
      )}
    </div>
  );
};

export default ProductCart;

// _id && favorite && !favorite.find((el) => el.productId === ele._id)

// import React from "react";

// import { FaRegHeart, FaShoppingBag, FaThumbsUp } from "react-icons/fa";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { opOver, setProId } from "../../app/api/productOverlay";
// import { Link } from "react-router-dom";
// const ProductCart = ({ ele, bo }) => {
//   const dispatch = useDispatch();
//   const zoomPro = (id, e) => {
//     // e.stopPropagation();
//     dispatch(opOver(true));
//     dispatch(setProId(id));
//   };
//   return (
//     <div
//       className={`h-[350px] w-full flex flex-col group cursor-pointer  ${
//         bo && "bg-white"
//       }`}
//     >
//       <div className="w-full h-[80%] relative overflow-hidden">
//         <img
//           src={ele.coverImage}
//           alt=""
//           className="w-full h-full object-cover rounded-t-md"
//         />
//         <div className=" text-[18px] absolute h-fit px-4 py-5 flex justify-between ele-center bg-white w-full bottom-[-56px] opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all  duration-500 ease-in-out ">
//           <div>
//             <FaShoppingBag className="hover:text-fcolor transition-all duration-300 ease-in-out" />
//           </div>
//           <div className=" flex justify-end ele-center gap-4">
//             <FaRegHeart className="hover:text-fcolor transition-all duration-300 ease-in-out" />
//             <MdOutlineZoomOutMap
//               onClick={(e) => zoomPro(ele._id, e)}
//               className="hover:text-fcolor transition-all duration-300 ease-in-out"
//             />
//           </div>
//         </div>
//       </div>
//       <Link
//         to={`/productInformation/${ele._id}`}
//         className={`flex flex-col gap-1  pt-2 h-[20%] relative overflow-hidden ${
//           bo && "bg-white px-2"
//         }`}
//       >
//         <h2 className="text-[17px] font-bold">{ele.productTitle}</h2>
//         <p className="text-[17px] text-slate-500">{ele.price}DZD</p>
//         <div className=" absolute right-2 text-[18px]  bottom-[-20px] opacity-0 h-fit flex ele-center gap-1 group-hover:opacity-100 group-hover:bottom-3 transition-all duration-500 ease-in-out">
//           <FaThumbsUp className=" text-[18px] text-fcolor" />
//           <p className="text-sm">100</p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCart;
