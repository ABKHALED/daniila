import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetOneProductMutation } from "../components/products/productApi";

import CartEl from "./CartEl";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [getOneProduct, { isSuccess }] = useGetOneProductMutation();
  const [prod, setProd] = useState([]);
  const [total, setTotle] = useState(0);
  const [cou, setCou] = useState(1);
  const [id, setId] = useState("");
  const get = async (id, count) => {
    try {
      let data = [];
      for (let i = 0; i < cartItems.length; i++) {
        const product = await getOneProduct({ id: cartItems[i].id });
        data = [
          ...data,
          {
            product: product.data,
            count: cartItems[i].count,
            color: cartItems[i].color,
            size: cartItems[i].size,
          },
        ];
      }
      setProd(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setTotle(0);
    if (cartItems) {
      get();
    }
  }, [cartItems]);
  useEffect(() => {
    setTotle(0);
    if (prod) {
      prod.map((ele) => {
        if (ele.onSale) {
          return setTotle((prev) => {
            return (
              prev +
              Number(ele.product.price) -
              Number((ele.product.price * Number(ele.product.sale)) / 100) *
                Number(ele.count)
            );
          });
        } else {
          return setTotle((prev) => {
            return prev + Number(ele.product.price) * Number(ele.count);
          });
        }
      });
    }
  }, [prod, cartItems]);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full pt-[50px]  mt-[115px] mb-[70px]  px-3 md:px-9">
      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h1 className="text-[40px] font-extrabold">
          {trr === "fr"
            ? "PANIER D'ACHAT"
            : trr === "eng"
            ? "SHOPPING CART"
            : trr === "ar" && "عربة التسوق"}
        </h1>
        <div
          onClick={() => navigate("/shop")}
          className="flex items-center w-[230px] justify-center hover:bg-fcolor hover:text-white font-bold  cursor-pointer gap-2 text-[18px] transition-all duration-300 ease-in-out p-2 border border-fcolor rounded-md "
        >
          {trr === "ar" ? (
            <>
              <p>
                {trr === "fr"
                  ? "Retour aux shop"
                  : trr === "eng"
                  ? "Back to shopping"
                  : trr === "ar" && "العودة إلى التسوق"}
              </p>
              <IoMdArrowRoundBack className="text-[24px]" />
            </>
          ) : (
            <>
              {" "}
              <IoMdArrowRoundBack className="text-[24px]" />
              <p>
                {trr === "fr"
                  ? "Retour aux shop"
                  : trr === "eng"
                  ? "Back to shopping"
                  : trr === "ar" && "العودة إلى التسوق"}
              </p>
            </>
          )}
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="flex justify-between flex-wrap mt-[30px] gap-10 lg:gap-0">
          <div className="flex flex-row flex-wrap md:flex-nowrap md:justify-start justify-center md:flex-col gap-10 w-[100%] lg:w-[70%]">
            {prod.length > 0 &&
              prod.map((ele, i) => {
                return <CartEl key={i} ele={ele} />;
              })}
          </div>
          <div className="w-[100%] lg:w-[28%] border border-black rounded-lg p-4 h-fit">
            <h1 className="text-center text-[25px] font-bold mb-4">
              {trr === "fr"
                ? "Résumé"
                : trr === "eng"
                ? "Summary"
                : trr === "ar" && "موجز"}
            </h1>
            <div className="flex justify-between w-full ">
              <p className=" text-gray-600 font-bold">
                {trr === "fr"
                  ? "Sous-Total"
                  : trr === "eng"
                  ? "Subtotal"
                  : trr === "ar" && "المجموع الفرعي"}
              </p>
              <p>{total}DZD</p>
            </div>
            <div className="flex justify-between w-full mt-4 pb-4 border-b border-black ">
              <p className=" text-gray-600 font-bold">
                {trr === "fr"
                  ? "Livraison"
                  : trr === "eng"
                  ? "Delivery"
                  : trr === "ar" && "التوصيل"}
              </p>
              <p className="">
                {trr === "fr"
                  ? "Cela dépend de votre ville"
                  : trr === "eng"
                  ? "It depends on your city"
                  : trr === "ar" && "ذلك يعتمد على مدينتك"}
              </p>
            </div>
            <div className="flex justify-between w-full text-[18px] font-bold mt-4">
              <p className="  ">{trr === "ar" ? "المجموع" : "Total"}</p>
              <p>{total}DZD</p>
            </div>
            <Link
              to="/CheckOut"
              className="w-full h-[50px] rounded-md flex justify-center items-center mt-[20px] border-fcolor text-fcolor border hover:bg-fcolor hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-extrabold text-[30px]"
            >
              {trr === "ar" ? "الدفع" : "Check Out"}
            </Link>
          </div>
        </div>
      ) : (
        <p className="mt-[30px] text-[20px] font-extrabold">
          {trr === "fr"
            ? "Votre panier est vide"
            : trr === "eng"
            ? " Your shopping cart is empty"
            : trr === "ar" && "سلة التسوق الخاصة بك فارغة"}
        </p>
      )}
    </div>
  );
};

export default Cart;
