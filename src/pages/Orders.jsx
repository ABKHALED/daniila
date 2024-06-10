import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useGetOneOrderMutation } from "../components/info/infoApiSlice";

import { useGetOneProductMutation } from "../components/products/productApi";

import { setOrderItem } from "../app/api/orSlise";

function Orders() {
  const { _id, orders, firstName } = useAuth();

  const [getOneProduct, { isSuccess2 }] = useGetOneProductMutation();
  const orderitems = useSelector((state) => state.order.orderItems);
  const [nnOrder, setNnorder] = useState(null);
  const [data, setData] = useState(null);
  const [getOneOrder, { isSuccess }] = useGetOneOrderMutation();
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  useEffect(() => {
    if (_id && orders && firstName) {
      setNnorder(orders);
    } else {
      getOr();
    }
  }, [orderitems, _id]);
  useEffect(() => {
    if (_id && orders && firstName) {
      setNnorder(orders);
      // dispatch(setOrderItem([]));

      // localStorage.removeItem("order");
    } else {
      getOr();
    }
  }, []);

  const getOr = async () => {
    try {
      let d = [];
      for (let i = 0; i < orderitems.length; i++) {
        const product = await getOneOrder({ orderId: orderitems[i].orderId });
        if (product.data) {
          d = [...d, product.data];
        }
      }
      setNnorder(d);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (nnOrder) {
      getProd();
    }
  }, [nnOrder]);
  const [to, setTo] = useState(0);
  const getProd = async () => {
    try {
      let d = [];
      let g = [];
      for (let i = 0; i < nnOrder.length; i++) {
        d = [];
        for (let j = 0; j < nnOrder[i].products.length; j++) {
          const product = await getOneProduct({
            id: nnOrder[i].products[j].id,
          });

          d = [
            ...d,
            {
              productInfo: product.data,
              count: nnOrder[i].products[j].count,
              color: nnOrder[i].products[j].color,
              size: nnOrder[i].products[j].size,
              state: nnOrder[i].state,
              createdAt: nnOrder[i].createdAt,
              updatedAt: nnOrder[i].updatedAt,
              orderId: nnOrder[i].orderId,
              info: nnOrder[i].info,
            },
          ];
        }
        // d = [
        //   ...d,
        //   {  },
        //   {  },
        //   { },
        //   { },
        // ];
        g = [...g, d];
      }
      setData(g);
    } catch (err) {
      console.log(err);
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full pt-[50px]  mt-[115px] mb-[70px]  px-3 md:px-9">
      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h1 className="text-[40px] font-extrabold">
          {trr === "fr"
            ? "VOS COMMANDES"
            : trr === "eng"
            ? "YOUR ORDERS"
            : trr === "ar" && "طلباتك"}
        </h1>
        {trr === "ar" ? (
          <Link
            to="/"
            className="flex items-center w-[230px] justify-center hover:bg-fcolor hover:text-white font-bold  cursor-pointer gap-2 text-[18px] transition-all duration-300 ease-in-out p-2 border border-fcolor rounded-md "
          >
            <p>العودة إلى التسوق</p>
            <IoMdArrowRoundBack className="text-[24px]" />
          </Link>
        ) : (
          <Link
            to="/"
            className="flex items-center w-[230px] justify-center hover:bg-fcolor hover:text-white font-bold  cursor-pointer gap-2 text-[18px] transition-all duration-300 ease-in-out p-2 border border-fcolor rounded-md "
          >
            <IoMdArrowRoundBack className="text-[24px]" />

            <p>
              {trr === "fr"
                ? "Retour aux shop"
                : trr === "eng" && "Back to shopping"}
            </p>
          </Link>
        )}
      </div>
      <div className=" w-full">
        {data && data.length > 0 ? (
          <div className="flex flex-col gap-10 w-full mt-[70px]">
            {data.map((ele, i) => (
              <div key={i} className=" border rounded-md p-5 ">
                <div
                  key={i}
                  className=" flex flex-col lg:flex-row items-center justify-between  gap-5"
                >
                  <div className="flex flex-col items-center gap-3 ">
                    <h1 className="">Order ID: "{ele[0].orderId}"</h1>
                    <p>
                      {trr === "fr"
                        ? "Ville"
                        : trr === "eng"
                        ? "City"
                        : trr === "ar" && "المدينة"}
                      : {ele[0].info.city}
                    </p>
                    <p>
                      {trr === "fr"
                        ? "Lieu"
                        : trr === "eng"
                        ? "Place"
                        : trr === "ar" && "مكان"}
                      : {ele[0].info.dev}
                    </p>
                    <p>
                      {trr === "fr"
                        ? "Livraison"
                        : trr === "eng"
                        ? "Delivery"
                        : trr === "ar" && "التوصيل"}
                      : {ele[0].info.delevery}DZD
                    </p>
                    <p>
                      {trr === "fr"
                        ? "Date"
                        : trr === "eng"
                        ? "Date"
                        : trr === "ar" && "تاريخ"}
                      : {ele[0].createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <div className=" flex flex-col lg:flex-row items-center  gap-10 w-[100%]  kha lg:w-[600px] md:overflow-x-scroll">
                    {ele.map((el, j) => {
                      return (
                        <div
                          key={j}
                          className=" flex-col flex w-[200px] items-center  gap-2"
                        >
                          <img
                            src={el.productInfo.coverImage}
                            className="w-[100px] h-[100px] rounded-md object-cover border border-black"
                            alt=""
                          />
                          <p className=" text-center">
                            {trr === "fr"
                              ? "Taille:"
                              : trr === "eng"
                              ? "Size:"
                              : trr === "ar" && ":المقاس"}
                            {el.size}
                          </p>
                          <p className="flex items-center justify-center gap-1">
                            {trr === "fr"
                              ? "Couleur:"
                              : trr === "eng"
                              ? "Color:"
                              : trr === "ar" && "اللون:"}
                            <span
                              className="w-[17px] h-[17px] rounded-full border border-black"
                              style={{ backgroundColor: el.color }}
                            ></span>
                          </p>
                          <p className=" text-center">
                            {trr === "fr"
                              ? "Quantité:"
                              : trr === "eng"
                              ? "Quantity:"
                              : trr === "ar" && "الكمية:"}{" "}
                            {el.count}
                          </p>
                          <p className=" text-center text-[14px]">
                            {trr === "fr"
                              ? "Prix:"
                              : trr === "eng"
                              ? "Price:"
                              : trr === "ar" && "السعر:"}{" "}
                            {el.productInfo.onSale
                              ? (Number(el.productInfo.price) -
                                  Number(
                                    (el.productInfo.price *
                                      Number(el.productInfo.sale)) /
                                      100
                                  )) *
                                Number(el.count)
                              : Number(el.productInfo.price) * Number(el.count)}
                            DZD
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className=" flex justify-center flex-col items-center gap-4">
                    {ele[0].state ? (
                      <div className="w-[150px] h-[50px] flex justify-center items-center rounded-md text-[20px] text-white font-extrabold bg-green-600">
                        {trr === "fr"
                          ? "Livré"
                          : trr === "eng"
                          ? "Delivered"
                          : trr === "ar" && "تم التوصيل"}
                      </div>
                    ) : (
                      <div className="w-[150px] h-[50px] flex justify-center items-center rounded-md text-[20px] text-white font-extrabold bg-red-600">
                        {trr === "fr"
                          ? "Traitement"
                          : trr === "eng"
                          ? "Processing"
                          : trr === "ar" && "يعالج"}
                      </div>
                    )}
                    {ele[0].state && (
                      <p className=" text-extrabold text-green-600">
                        {trr === "fr"
                          ? "Livré"
                          : trr === "eng"
                          ? "Delivered"
                          : trr === "ar" && "تم التوصيل"}{" "}
                        : {ele[0].updatedAt.slice(0, 10)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {!_id && (
              <div
                onClick={() => {
                  dispatch(setOrderItem([]));
                  localStorage.removeItem("order");
                }}
                className="ms-auto cursor-pointer w-[150px] h-[50px] bg-red-600 rounded-lg flex justify-center items-center text-[20px] font-extrabold text-white"
              >
                {trr === "fr"
                  ? "Tout Supprimer"
                  : trr === "eng"
                  ? "Remove All"
                  : trr === "ar" && "حذف الكل"}
              </div>
            )}
          </div>
        ) : (
          <div className="text-[20px] font-extrabold mt-[30px]">
            {trr === "fr"
              ? "vous n'avez pas des commandés"
              : trr === "eng"
              ? "You don't have orders"
              : trr === "ar" && "ليس لديك طلبيات"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
