import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useGetOneProductMutation } from "../products/productApi";

import { motion } from "framer-motion";

import {
  useGetOneOrderMutation,
  useOrderUpdateMutation,
  useRemoveOrderMutation,
} from "../info/infoApiSlice";
import { useRefreshMutation } from "../auth/authApiSlice";
// top-[103px]
const OrderOver = ({ orId, all, setAll, setT }) => {
  const [getOneOrder, { isSuccess }] = useGetOneOrderMutation();
  const [getOneProduct, { isSuccess2 }] = useGetOneProductMutation();
  const [orderUpdate, { isSuccess3 }] = useOrderUpdateMutation();
  const [removeOrder, { isSuccess4 }] = useRemoveOrderMutation();
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [refresh, { isUninitialized, isLoading3, isSuccess5, isError, error }] =
    useRefreshMutation();
  const getOne = async () => {
    try {
      const product = await getOneOrder({ orderId: orId });
      setData(product.data);
    } catch (err) {}
  };
  useEffect(() => {
    if (orId) {
      getOne();
    }
  }, [orId, all]);

  useEffect(() => {
    if (orId) {
      getOne();
    }
  }, []);
  useEffect(() => {
    if (data) {
      getP();
    }
  }, [data]);
  const getP = async () => {
    try {
      let g = [];
      for (let i = 0; i < data.products.length; i++) {
        const product = await getOneProduct({ id: data.products[i].id });
        g = [
          ...g,
          {
            productInfo: product.data,
            count: data.products[i].count,
            color: data.products[i].color,
            size: data.products[i].size,
          },
        ];
      }
      setProducts(g);
    } catch (err) {}
  };
  const [tot, setTot] = useState(0);

  useEffect(() => {
    setTot(0);
    if (products) {
      products.map((ele) =>
        ele.productInfo.onSale
          ? setTot(
              (prev) =>
                prev +
                (Number(ele.productInfo.price) -
                  (Number(ele.productInfo.price) *
                    Number(ele.productInfo.sale)) /
                    100) *
                  Number(ele.count)
            )
          : setTot(
              (prev) => prev + Number(ele.productInfo.price) * Number(ele.count)
            )
      );
    }
  }, [products]);

  const update = async () => {
    try {
      if (data) {
        await orderUpdate({ orderId: data._id, userId: data.userId });
      }
      setAll(false);
      setT((prev) => !prev);
      await refresh();
    } catch (err) {}
  };
  const removerOrder = async () => {
    try {
      if (data) {
        await removeOrder({ orderId: data._id, userId: data.userId });
        setT((prev) => !prev);
      }
      setAll(false);
      await refresh();
    } catch (err) {}
  };

  return (
    <>
      <div className="w-full h-full  z-[100000000] fixed top-0 flex justify-center items-center bg-[#00000085] left-0    px-3 md:px-9  ">
        <motion.div
          transition={{ duration: 0.5, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className=" relative w-[95%] p-5  overflow-y-scroll kha rounded-lg h-[95%] bg-white"
        >
          <div
            className=" absolute top-5  right-5 text-[30px]  transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer hover:rotate-[180deg]"
            onClick={() => setAll(false)}
          >
            <FaXmark />
          </div>
          <h1 className=" text-fcolor text-center text-[24px] font-bold mb-5 ">
            Order: {orId}
          </h1>
          {data && (
            <div className="w-full ">
              <h1 className=" text-center font-extrabold text-[24px] border-fcolor border-t pt-5">
                personal information
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 mt-5">
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Full Name :</p>
                  <p className=" text-[17px]">
                    {data.info.firstName} {data.info.lastName}
                  </p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Email:</p>
                  <p className=" text-[17px]">{data.info.email}</p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Phone Number :</p>
                  <p className=" text-[17px]">{data.info.phoneNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3 mt-5">
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Full Adderess :</p>
                  <p className=" text-[17px]">{data.info.fullAdders}</p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-City:</p>
                  <p className=" text-[17px]">{data.info.city}</p>
                </div>
                <div className="flex gap-5 items-center justify-center">
                  <p className=" font-bold text-[17px]">-Delevery :</p>
                  <p className=" text-[17px]">
                    {data.info.dev} ({data.info.delevery}DZD)
                  </p>
                </div>
              </div>
              <h1 className=" text-center font-extrabold text-[24px] mt-[30px] border-fcolor border-t pt-5">
                Order information
              </h1>
              <div className="w-full flex items-center gap-4 justify-center flex-wrap mt-5">
                {products &&
                  products.length > 0 &&
                  products.map((el, j) => {
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
                        <p className=" text-center">Size: {el.size}</p>
                        <p className="flex items-center justify-center gap-1">
                          Color:
                          <span
                            className="w-[17px] h-[17px] rounded-full border border-black"
                            style={{ backgroundColor: el.color }}
                          ></span>
                        </p>
                        <p className=" text-center">Quantity: {el.count}</p>
                        <p className=" text-center text-[14px]">
                          Price:{" "}
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
              {tot && data && (
                <div className="w-[100%]  border border-black rounded-lg p-4 h-fit mt-5">
                  <h1 className="text-center text-[25px] font-bold mb-4">
                    Summary
                  </h1>
                  <div className="flex justify-between w-full ">
                    <p className=" text-gray-600 font-bold">Subtotal</p>
                    <p>{tot} DZD</p>
                  </div>
                  <div className="flex justify-between w-full mt-4 pb-4 border-b border-black ">
                    <p className=" text-gray-600 font-bold">Delivery</p>
                    <p className="">{data.info.delevery} DZD</p>
                  </div>
                  <div className="flex justify-between w-full text-[18px] font-bold mt-4">
                    <p className="  ">Total</p>
                    <p>{tot + Number(data.info.delevery)} DZD</p>
                  </div>
                </div>
              )}
              {data && !data.state && (
                <>
                  <h1 className=" text-center font-extrabold text-[24px] mt-[30px] border-fcolor border-t pt-5">
                    Update Order State
                  </h1>
                  <div
                    onClick={() => update()}
                    className=" w-[150px]  h-[50px] rounded-md flex justify-center items-center mt-[20px] border-fcolor text-fcolor border hover:bg-fcolor hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-extrabold text-[18px] mx-auto "
                  >
                    Send Order
                  </div>
                </>
              )}
              {data && data.state && (
                <>
                  <h1 className=" text-center font-extrabold text-[24px] mt-[30px] border-fcolor border-t pt-5">
                    Remove Order
                  </h1>
                  <div
                    onClick={() => removerOrder()}
                    className=" w-[150px]  h-[50px] rounded-md flex justify-center items-center mt-[20px] border-fcolor text-fcolor border hover:bg-fcolor hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-extrabold text-[18px] mx-auto "
                  >
                    Remove Order
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default OrderOver;
