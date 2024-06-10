import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteProductMutation } from "../products/productApi";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

const DashProd = ({ ele, fun, setEdit, setEle }) => {
  const [deleteProduct, { isLoding, isSuccess }] = useDeleteProductMutation();
  const [stat, setStat] = useState(false);
  const send = () => {
    setEle(ele);
    setEdit(true);
  };

  const delet = async (id) => {
    try {
      await deleteProduct({ id: id }).unwrap();
      setStat(true);
      toast.success(`Product was deleted`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-white h-[320px] w-full relative flex flex-col group cursor-pointer  rounded-md overflow-hidden ">
      <div className="  absolute h-full   flex justify-center items-center  w-full bottom-0 opacity-0 group-hover:opacity-100 left-0 bg-[#00000085] transition-all  duration-500 ease-in-out ">
        {fun === "edit" ? (
          <div
            onClick={send}
            className="flex items-center justify-center w-full h-full text-white text-[25px] font-bold gap-2"
          >
            EDIT
            <FaEdit className="" />
          </div>
        ) : (
          <div
            onClick={() => delet(ele._id)}
            className="flex items-center justify-center w-full h-full text-white text-[25px] font-bold gap-2"
          >
            DELET
            <MdDeleteForever />
          </div>
        )}
      </div>
      {stat ? (
        <div className="  absolute h-full   flex justify-center items-center  w-full left-0 bg-[#00000085] transition-all  duration-500 ease-in-out ">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full h-[80%]  overflow-hidden">
        <img
          src={ele.coverImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`flex  justify-center items-center gap-1  pt-2 h-[20%]  overflow-hidden 
          bg-white px-2`}
      >
        <h2 className="text-[17px] font-bold">{ele.productTitle}</h2>
      </div>
    </div>
  );
};

export default DashProd;
