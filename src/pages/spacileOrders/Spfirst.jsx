import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import SpFromShop from "./SpFromShop";
import SPfromYou from "./SPfromYou";

function Spfirst() {
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className="w-full pt-[50px]  mt-[115px] mb-[70px]  px-3 md:px-9">
      <h1 className="flex justify-center items-center text-fcolor font-extrabold text-[40px] md:text-[60px] ">
        Special Orders
      </h1>
      <p className=" max-w-[750px] mx-auto font-extrabold text-center mt-[10px] text-[16px] md:text-[18px]">
        {trr === "fr"
          ? "ici, vous pouvez personnaliser votre commande comme vous l'aimez. il y a deux façons de personnalisation, la première consiste à personnaliser notre propre produit. la deuxième façon est de nous envoyer votre design et de nous dire comment vous le souhaitez"
          : trr === "eng"
          ? "here you can customize your order the way you like it. there is two ways of customization the first is by customizing our own product. the second way is by sending us your design and teling us how do you want it"
          : trr === "ar" &&
            "هنا يمكنك تخصيص طلبك بالطريقة التي تريدها. هناك طريقتان للتخصيص، الأولى هي تخصيص منتجنا الخاص. الطريقة الثانية هي أن ترسل لنا تصميمك وتخبرنا كيف تريده"}
      </p>
      <div className=" flex justify-center items-center gap-6 md:gap-[60px] mt-[50px]  text-[22px] md:text-[30px] font-extrabold">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out  "
              : "text-black transition-all duration-300 ease-in-out ms-0  hover:text-fcolor"
          }
          to="OurProduct"
        >
          {trr === "fr"
            ? "Nos Produits"
            : trr === "eng"
            ? "Our Products"
            : trr === "ar" && "منتجاتنا"}
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "text-fcolor transition-all duration-300 ease-in-out  "
              : "text-black transition-all duration-300 ease-in-out ms-0  hover:text-fcolor"
          }
          to="YourDesign"
        >
          {trr === "fr"
            ? "Votre propre design"
            : trr === "eng"
            ? "Your own design"
            : trr === "ar" && "التصميم الخاص بك"}
        </NavLink>
      </div>

      <div className=" w-full mt-[70px] ">
        <Routes>
          <Route index element={<Navigate to="OurProduct" />} />
          <Route path="OurProduct" element={<SpFromShop />} />
          <Route path="YourDesign" element={<SPfromYou />} />
        </Routes>
      </div>
    </div>
  );
}

export default Spfirst;
