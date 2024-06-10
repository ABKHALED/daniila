import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCartItem } from "../app/api/cartSlice";
import { FaXmark } from "react-icons/fa6";
function CartEl({ ele }) {
  const dispatch = useDispatch();
  const trr = useSelector((state) => state.tran.tran);
  const [cou, setCou] = useState(ele.count);
  const [id, setId] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeItem = (id) => {
    dispatch(
      setCartItem(
        cartItems.filter((ele) => {
          return ele.id !== id;
        })
      )
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems.filter((ele) => {
          return ele.id !== id;
        })
      )
    );
  };
  useEffect(() => {
    if (ele) {
      let arr = cartItems.map((ele) =>
        ele.id !== id ? ele : { ...ele, count: Number(cou) }
      );
      dispatch(setCartItem(arr));
      localStorage.setItem("cart", JSON.stringify(arr));
    }
  }, [cou]);

  return (
    <div className="flex md:flex-row flex-col items-center md:justify-between w-[300px] md:w-full rounded-md p-2 md:px-1 md:pb-3 border-black gap-2 md:gap-3  border    md:border-b">
      <div className="md:w-[110px] w-[150px] h-[150px] md:h-[110px] border rounded-sm ">
        <img
          src={ele.product.coverImage}
          className="w-full h-full object-cover rounded-sm"
          alt=""
        />
      </div>
      <div className="flex flex-col h-full justify-between py-2 ">
        <p className=" text-[18px] font-semibold">{ele.product.productTitle}</p>
        <p className=" text-[15px] font-semibold md:block hidden">
          {ele.product.family} / {ele.product.category}
        </p>

        <p className=" text-[15px] font-semibold  md:block hidden">
          {ele.product.stock}{" "}
          {trr === "fr"
            ? "article en stock"
            : trr === "eng"
            ? "in stock"
            : trr === "ar" && "في المخزون"}
        </p>
      </div>
      <div className="flex flex-col h-full">
        {ele.product.onSale ? (
          <div className="flex flex-col  h-full justify-between py-2">
            <p className="text-[18px] md:block hidden">
              <span className=" font-semibold ">
                {trr === "fr"
                  ? "Ancien prix:"
                  : trr === "eng"
                  ? "Old price:"
                  : trr === "ar" && "سعر قديم:"}
              </span>
              {"  "}
              {ele.product.price}DZD
            </p>
            <p className="text-[18px] md:block hidden">
              <span className=" font-semibold">
                {trr === "fr"
                  ? "En solde:"
                  : trr === "eng"
                  ? "On sale:"
                  : trr === "ar" && "الخصم"}
              </span>
              {"  "}
              {ele.product.sale}%
            </p>
            <p className="text-[18px]">
              <span className=" font-semibold">
                {trr === "fr"
                  ? "Nouveau prix:"
                  : trr === "eng"
                  ? "New price:"
                  : trr === "ar" && "سعر جديد:"}
              </span>
              {"  "}
              {Number(ele.product.price) -
                Number((ele.product.price * Number(ele.product.sale)) / 100)}
            </p>
          </div>
        ) : (
          <div className=" flex  items-center justify-center h-full">
            <p className="text-[18px]">
              <span className=" font-semibold">
                {trr === "fr"
                  ? "Prix:"
                  : trr === "eng"
                  ? "Price:"
                  : trr === "ar" && "السعر:"}
              </span>
              {"  "}
              {ele.product.price}DZD
            </p>
          </div>
        )}
      </div>
      <div className="h-full flex flex-col justify-between py-2">
        <p className="text-[18px] md:block hidden">
          <span className=" font-semibold">
            {trr === "fr"
              ? "Taille:"
              : trr === "eng"
              ? "Size:"
              : trr === "ar" && ":المقاس"}
          </span>
          {"  "}
          {ele.size}
        </p>
        <p className="text-[18px]  items-center gap-2 md:flex hidden ">
          <span className=" font-semibold">
            {trr === "fr"
              ? "Couleur:"
              : trr === "eng"
              ? "Color:"
              : trr === "ar" && "اللون:"}
          </span>
          <span
            style={{
              backgroundColor: `${ele.color}`,
            }}
            className="block h-[25px] w-[25px] rounded-sm border border-black"
          ></span>
        </p>
        <div className=" flex items-center gap-2">
          <p className="text-[18px] font-semibold">
            {trr === "fr"
              ? "Quantité:"
              : trr === "eng"
              ? "Quantity:"
              : trr === "ar" && "الكمية:"}
          </p>
          {Number(ele.product.stock) === 2 ? (
            <select
              onChange={(e) => {
                setCou(e.target.value);
                setId(ele.product._id);
              }}
              value={cou}
              name=""
              id=""
              className="w-[50px] border border-black rounded-md cursor-pointer focus:outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          ) : Number(ele.product.stock) === 1 ? (
            <select
              onChange={(e) => {
                setCou(e.target.value);
                setId(ele.product._id);
              }}
              value={cou}
              name=""
              id=""
              className="w-[50px] border border-black rounded-md cursor-pointer focus:outline-none"
            >
              <option value="1">1</option>
            </select>
          ) : (
            <select
              onChange={(e) => {
                setCou(e.target.value);
                setId(ele.product._id);
              }}
              value={cou}
              name=""
              id=""
              className="w-[50px] border border-black rounded-md cursor-pointer focus:outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          )}
        </div>
      </div>
      <div
        onClick={() => removeItem(ele.product._id)}
        className="flex  h-full justify-center items-center"
      >
        <FaXmark className=" text-[24px] transition-all duration-300 ease-in-out hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default CartEl;
