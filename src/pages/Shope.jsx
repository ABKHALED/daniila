import React, { useEffect, useState } from "react";

import { HashLoader } from "react-spinners";

import { useGetfilterdMutation } from "../components/products/productApi";
import ProductCart from "../components/products/ProductCart";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
// const arrBV = [
//   "Pants",
//   "Jackets and Coats",
//   "Sweatshirts",
//   "Sweaters",
//   "Shirts",
//   "Jeans",
//   "T-shirt",
//   "Sports Outfits",
//   "Underwear",
//   "Pyjamas",
//   "Classic Costumes",
// ];
// const arrBS = [
//   "Sneakers",
//   "City Shoes",
//   "Sports Shoes",
//   "Moccasins",
//   "Mules and Flip-flops",
//   "Sandals",
// ];
// const arrBA = [
//   "Watches",
//   "Glasses",
//   "Jewelry",
//   "Wallets",
//   "Hats, Beanies & Caps",
// ];
// const arrGV = [
//   "Pants",
//   "Jackets and Coats",
//   "Sweatshirts",
//   "Sweaters",
//   "Shirts and Blouses and Blazers",
//   "Abaya",
//   "Jeans",
//   "T-shirts and Tops",
//   "Clothing Set",
//   "Skirts",
//   "Shorts",
//   "Trenches Coats",
//   "Robes Hijab",
//   "Underwear",
//   "Pyjamas",
//   "Luxury",
// ];
// const arrGS = [
//   "Sneakers",
//   "Pumps Heels",
//   "Sports Shoes",
//   "Moccasins",
//   "Mules and Clogs",
//   "Sandals",
// ];
// const arrGA = [
//   "Watches",
//   "Glasses",
//   "Jewelry",
//   "Bags",
//   "Scarves",
//   "Hats, Beanies & Caps",
// ];
// const homArr = [
//   "Dicoration",
//   "Curtains",
//   "Carpets and Rugs",
//   "Bedding",
//   "Lighting Fixtures",
// ];
const arrBV = [
  { eng: "Pants", fr: "Pantalons", ar: "بنطلون" },
  { eng: "Jackets and Coats", fr: "Vestes et Manteaux", ar: "سترات ومعاطف" },
  { eng: "Sweatshirts", fr: "SweatShirts", ar: "بلوزات" },
  {
    eng: "Sweaters",
    fr: "Pulls",
    ar: "الكنزات",
  },
  {
    eng: "Shirts",
    fr: "Chemises",
    ar: "قمصان",
  },
  {
    eng: "Jeans",
    fr: "Jeans",
    ar: "بنطلون جينز",
  },
  {
    eng: "T-shirt",
    fr: "T-shirt",
    ar: "تي شيرت",
  },

  {
    eng: "Sports Outfits",
    fr: "Tenues de sport",
    ar: "البسة رياضية",
  },
  {
    eng: "Underwear",
    fr: "Sous vetements",
    ar: "ملابس داخلية",
  },
  {
    eng: "Pyjamas",
    fr: "Pyjamas",
    ar: "البسة نوم",
  },
  {
    eng: "Classic Costumes",
    fr: "Costumes classique",
    ar: "اطق كلاسيكية",
  },
];
// const arrBS = [
//   "Sneakers",
//   "City Shoes",
//   "Sports Shoes",
//   "Moccasins",
//   "Mules and Flip-flops",
//   "Sandals",
// ];
const arrBS = [
  {
    eng: "Sneakers",
    fr: "Baskets",
    ar: "أحذية",
  },
  {
    eng: "City Shoes",
    fr: "Chaussures de Ville",
    ar: "أحذية يومية",
  },
  {
    eng: "Sports Shoes",
    fr: "Chaussures de Sport",
    ar: "أحذية رياضية",
  },
  {
    eng: "Moccasins",
    fr: "Mocassins",
    ar: "احذية بدون رباط",
  },
  {
    eng: "Mules and Flip-flops",
    fr: "Mules et tongs",
    ar: "احذية و احذية بدون كعب",
  },
  {
    eng: "Sandals",
    fr: "sandales",
    ar: "صنادل",
  },
];
// const arrBA = [
//   "Watches",
//   "Glasses",
//   "Jewelry",
//   "Wallets",
//   "Hats, Beanies & Caps",
// ];
const arrBA = [
  {
    eng: "Watches",
    fr: "Montres",
    ar: "ساعات",
  },
  {
    eng: "Glasses",
    fr: "Lunettes",
    ar: "نظارات",
  },
  {
    eng: "Jewelry",
    fr: "Bijoux",
    ar: "مجوهرات",
  },
  {
    eng: "Wallets",
    fr: "Portefeuilles",
    ar: "محافظ",
  },
  {
    eng: "Hats, Beanies & Caps",
    fr: "Chapeaux, bonnets et casquettes",
    ar: "القبعات، بيني ",
  },
];
const arrGV = [
  {
    eng: "Pants",
    fr: "Pantalon",
    ar: "بنطلون",
  },
  {
    eng: "Jackets and Coats",
    fr: "Vestes et Manteaux",
    ar: "السترات والمعاطف",
  },
  {
    eng: "Sweatshirts",
    fr: "Sweat-shirts",
    ar: "بلوزات",
  },
  {
    eng: "Sweaters",
    fr: "chandails",
    ar: "الكنزات",
  },
  {
    eng: "Shirts and Blouses and Blazers",
    fr: "Chemises, chemisiers et blazers",
    ar: "قمصان و بلوزات و سترات",
  },
  {
    eng: "Abayaس",
    fr: "Abayaس",
    ar: "عبايات",
  },
  {
    eng: "Jeans",
    fr: "Jeans",
    ar: "جينز",
  },
  {
    eng: "T-shirts and Tops",
    fr: "T-shirts et Tops",
    ar: " بلوزات و كنزات",
  },
  {
    eng: "Clothing Set",
    fr: "Ensemble",
    ar: "طقم",
  },
  {
    eng: "Skirts",
    fr: "Jupes",
    ar: "تنانير",
  },
  {
    eng: "Shorts",
    fr: "Shorts",
    ar: "شورت",
  },
  {
    eng: "Trenches Coats",
    fr: "Tranchées",
    ar: "ترينش كوت",
  },
  {
    eng: "Robes Hijab",
    fr: "Robes Hijab",
    ar: "فساتين محجبات",
  },
  {
    eng: "Underwear",
    fr: "Sous-Vêtements",
    ar: "ملابس داخلية",
  },
  {
    eng: "Pyjamas",
    fr: "Pyjama",
    ar: "البسة نوم",
  },
  {
    eng: "Luxury",
    fr: "Luxe",
    ar: "البسة فخمة",
  },
];
const arrGS = [
  {
    eng: "Sneakers",
    fr: "Baskets",
    ar: "أحذية",
  },
  {
    eng: "Pumps Heels",
    fr: "Escarpins Talons",
    ar: "أحذية بكعب ",
  },
  {
    eng: "Sports Shoes",
    fr: "Chaussures de Sport",
    ar: "أحذية رياضية",
  },
  {
    eng: "Moccasins",
    fr: "Mocassins",
    ar: "احذية بدون رباط",
  },
  {
    eng: "Mules and Clogs",
    fr: "Mules et Sabots",
    ar: "احدية بدون كعب",
  },
  {
    eng: "Sandals",
    fr: "sandales",
    ar: "صنادل",
  },
];
const arrGA = [
  {
    eng: "Watches",
    fr: "Montres",
    ar: "ساعات",
  },
  {
    eng: "Glasses",
    fr: "Lunettes",
    ar: "نظارات",
  },
  {
    eng: "Jewelry",
    fr: "Bijoux",
    ar: "مجوهرات",
  },
  {
    eng: "Bags",
    fr: "Sacs",
    ar: "حقائب اليد",
  },
  {
    eng: "Scarves",
    fr: "Écharpes",
    ar: "الأوشحة",
  },
  {
    eng: "Hats, Beanies & Caps",
    fr: "Chapeaux, bonnets et casquettes",
    ar: "القبعات، بيني ",
  },
];
const homArr = [
  {
    eng: "Decoration",
    fr: "Décoration",
    ar: "ديكور",
  },
  {
    eng: "Curtains",
    fr: "Rideaux",
    ar: "ستائر",
  },
  {
    eng: "Carpets and Rugs",
    fr: "Tapis et Moquettes",
    ar: "سجاد و بسط",
  },
  {
    eng: "Bedding",
    fr: "Literie",
    ar: "افرشة",
  },
  {
    eng: "Lighting Fixtures",
    fr: "Luminaires",
    ar: "اضاءة و ثريات",
  },
];
const Shope = ({ setLog }) => {
  const [gender, setGender] = useState("All");
  const [range, setRange] = useState(1000);
  const [cat, setCat] = useState("Default");
  const [sub, setSub] = useState("Do not select anything");
  const [brand, setBrand] = useState("");
  const [choos, setChoss] = useState("Default");
  const [data, setData] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [data1, setData1] = useState(null);
  const [getfilterd, { isSuccess2, isLoading }] = useGetfilterdMutation();
  const get = async (gender, cat, sub) => {
    try {
      const product = await getfilterd({
        ProdFamily: gender,
        ProductCat: cat,
        ProductSub: sub,
      });
      setData1(product.data);
    } catch (err) {
      console.log(err);
    }
  };
  const trr = useSelector((state) => state.tran.tran);
  useEffect(() => {
    get(gender, cat, sub);
    setChoss("Default");
  }, [cat, gender, sub]);
  useEffect(() => {
    setSub("Do not select anything");
  }, [cat]);
  useEffect(() => {
    setCat("Default");
  }, [gender]);
  useEffect(() => {
    if (data1) {
      if (choos === "Default") {
        setData(null);
      } else if (choos === "The most recent first") {
        setData([...data1].reverse());
      } else if (choos === "On sale") {
        setData(data1.filter((ele) => ele.onSale === true));
      } else if (choos === "A_Z") {
        setData(
          [...data1].sort((a, b) => (a.productTitle > b.productTitle ? 1 : -1))
        );
      } else if (choos === "Z_A") {
        setData(
          [...data1].sort((a, b) => (a.productTitle < b.productTitle ? 1 : -1))
        );
      }
    }
  }, [choos]);

  let content;

  if (cat === "Clothing" && (gender === "Men" || gender === "boy")) {
    content = (
      <div className="flex flex-col gap-2">
        {arrBV.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Shoes" && (gender === "Men" || gender === "boy")) {
    content = (
      <div className="flex flex-col gap-2">
        {arrBS.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Accessories" && (gender === "Men" || gender === "boy")) {
    content = (
      <div className="flex flex-col gap-2">
        {arrBA.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Clothing" && (gender === "Women" || gender === "girl")) {
    content = (
      <div className="flex flex-col gap-2">
        {arrGV.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Shoes" && (gender === "Women" || gender === "girl")) {
    content = (
      <div className="flex flex-col gap-2">
        {arrGS.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (
    cat === "Accessories" &&
    (gender === "Women" || gender === "girl")
  ) {
    content = (
      <div className="flex flex-col gap-2">
        {arrGA.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Home" && gender === "Home") {
    content = (
      <div className="flex flex-col gap-2">
        {homArr.map((ele) => {
          return (
            <fieldset>
              <input
                id={ele.eng}
                className="peer/draft mr-2 cursor-pointer"
                type="radio"
                name="sub"
                checked={sub === ele.eng}
                value={ele.eng}
                onChange={(e) => setSub(e.target.value)}
              />
              <label
                htmlFor={ele.eng}
                className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
              >
                {ele[trr]}
              </label>
            </fieldset>
          );
        })}
      </div>
    );
  } else if (cat === "Default") {
    content = (
      <p className="text-[14px] text-start">
        {trr === "fr"
          ? "Veuillez sélectionner la Section et la Catégorie"
          : trr === "eng"
          ? "Please select the Section and Category"
          : trr === "ar" && "الرجاء اختيار القسم والفئة"}
      </p>
    );
  } else if (gender === "All" && cat === "Clothing") {
    content = (
      <div className="flex flex-col gap-2">
        {[...arrBV, ...arrGV]
          .filter(
            (obj1, i, arr) =>
              arr.findIndex((obj2) => obj2.eng === obj1.eng) === i
          )
          .map((ele) => {
            return (
              <fieldset>
                <input
                  id={ele.eng}
                  className="peer/draft mr-2 cursor-pointer"
                  type="radio"
                  name="sub"
                  checked={sub === ele.eng}
                  value={ele.eng}
                  onChange={(e) => setSub(e.target.value)}
                />
                <label
                  htmlFor={ele.eng}
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  {ele[trr]}
                </label>
              </fieldset>
            );
          })}
      </div>
    );
  } else if (gender === "All" && cat === "Shoes") {
    content = (
      <div className="flex flex-col gap-2">
        {[...arrBS, ...arrGS]
          .filter(
            (obj1, i, arr) =>
              arr.findIndex((obj2) => obj2.eng === obj1.eng) === i
          )
          .map((ele) => {
            return (
              <fieldset>
                <input
                  id={ele.eng}
                  className="peer/draft mr-2 cursor-pointer"
                  type="radio"
                  name="sub"
                  checked={sub === ele.eng}
                  value={ele.eng}
                  onChange={(e) => setSub(e.target.value)}
                />
                <label
                  htmlFor={ele.eng}
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  {ele[trr]}
                </label>
              </fieldset>
            );
          })}
      </div>
    );
  } else if (gender === "All" && cat === "Accessories") {
    content = (
      <div className="flex flex-col gap-2">
        {[...arrBA, ...arrGA]
          .filter(
            (obj1, i, arr) =>
              arr.findIndex((obj2) => obj2.eng === obj1.eng) === i
          )
          .map((ele) => {
            return (
              <fieldset>
                <input
                  id={ele.eng}
                  className="peer/draft mr-2 cursor-pointer"
                  type="radio"
                  name="sub"
                  checked={sub === ele.eng}
                  value={ele.eng}
                  onChange={(e) => setSub(e.target.value)}
                />
                <label
                  htmlFor={ele.eng}
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  {ele[trr]}
                </label>
              </fieldset>
            );
          })}
      </div>
    );
  }

  const [swap, setSwap] = useState(false);

  useEffect(() => {
    if (gender === "Home") {
      setSwap(true);
    } else {
      setSwap(false);
    }
  }, [gender]);
  return (
    <div className=" pt-[200px] mb-[70px]  px-3 md:px-9">
      <div className=" flex flex-col mb-10">
        {trr === "fr" ? (
          ""
        ) : trr === "eng" ? (
          <h1 className=" text-[30px] font-extrabold">
            {gender}/{cat === "Default" ? "All products" : `${cat}`}/
            {gender === "All" || cat === "Default"
              ? ""
              : sub === "Do not select anything"
              ? ""
              : sub}
          </h1>
        ) : (
          trr === "ar" && ""
        )}
        <p className="text-[15px] text-gray-500 font-bold mt-1">
          {trr === "fr"
            ? "prenez votre temps pour choisir, vous trouverez tout ce que vous cherchez"
            : trr === "eng"
            ? "take your time to choose, you will find everything you are looking for"
            : trr === "ar" && "خذ وقتك في الاختيار ، وسوف تجد كل ما تبحث عنه"}
        </p>
      </div>
      <div className="flex gap-10 md:gap-0 md:justify-between flex-wrap">
        <div className="md:w-[20%] w-[100%] flex flex-col gap-4">
          <div className="flex flex-col gap-2 py-3 ps-4 shadow-md border rounded-md">
            <h2 className=" text-[25px] font-extrabold">
              {trr === "fr"
                ? "Section"
                : trr === "eng"
                ? "Section"
                : trr === "ar" && "القسم"}
            </h2>
            <ul className="flex flex-col gap-2">
              <li
                onClick={() => setGender("All")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "All" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {trr === "fr"
                    ? "Tous"
                    : trr === "eng"
                    ? " All"
                    : trr === "ar" && "الكل"}
                </p>
              </li>
              <li
                onClick={() => setGender("Women")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "Women" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {" "}
                  {trr === "fr"
                    ? "Femmes"
                    : trr === "eng"
                    ? "Women"
                    : trr === "ar" && "النساء"}
                </p>
              </li>
              <li
                onClick={() => setGender("Men")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "Men" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {trr === "fr"
                    ? "Homme"
                    : trr === "eng"
                    ? "Man"
                    : trr === "ar" && "الرجال"}
                </p>
              </li>
              <li
                onClick={() => setGender("girl")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "girl" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {trr === "fr"
                    ? "Fille"
                    : trr === "eng"
                    ? "Girl"
                    : trr === "ar" && "بنت"}
                </p>
              </li>
              <li
                onClick={() => setGender("boy")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "boy" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {trr === "fr"
                    ? "Garçon"
                    : trr === "eng"
                    ? "Boy"
                    : trr === "ar" && "ولد"}
                </p>
              </li>
              <li
                onClick={() => setGender("Home")}
                className={`flex items-center gap-1 w-fit cursor-pointer transition-all duration-300 ease-in-out ${
                  gender === "Home" && "text-red-500 ps-3"
                }`}
              >
                <p className="text-[18px] font-semibold">
                  {trr === "fr"
                    ? "Maison"
                    : trr === "eng"
                    ? "Home"
                    : trr === "ar" && "البيت"}
                </p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 py-3 ps-4 shadow-md border rounded-md">
            <h2 className=" text-[25px] font-extrabold">
              {trr === "fr"
                ? "Catégorie:"
                : trr === "eng"
                ? "Category:"
                : trr === "ar" && "الفئة:"}
            </h2>
            <div className="flex flex-col gap-2">
              <fieldset>
                <input
                  id="Default"
                  className="peer/draft mr-2 cursor-pointer"
                  type="radio"
                  name="status"
                  checked={cat === "Default"}
                  value="Default"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label
                  htmlFor="Default"
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  {trr === "fr"
                    ? "Par Défaut"
                    : trr === "eng"
                    ? "Default"
                    : trr === "ar" && "الافتراضي"}
                </label>
              </fieldset>

              {swap ? (
                <>
                  <fieldset>
                    <input
                      id="Home"
                      className="peer/draft  mr-2 cursor-pointer"
                      type="radio"
                      name="status"
                      checked={cat === "Home"}
                      value="Home"
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label
                      htmlFor="Home"
                      className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                    >
                      {trr === "fr"
                        ? "Maison"
                        : trr === "eng"
                        ? "Home"
                        : trr === "ar" && "البيت"}
                    </label>
                  </fieldset>
                </>
              ) : (
                <>
                  <fieldset>
                    <input
                      id="Clothing"
                      className="peer/draft  mr-2 cursor-pointer"
                      type="radio"
                      name="status"
                      checked={cat === "Clothing"}
                      value="Clothing"
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label
                      htmlFor="Clothing"
                      className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                    >
                      {trr === "fr"
                        ? "Vêtements"
                        : trr === "eng"
                        ? "Clothing"
                        : trr === "ar" && "الملابس"}
                    </label>
                  </fieldset>
                  <fieldset>
                    <input
                      id="Shoes"
                      className="peer/draft  mr-2 cursor-pointer"
                      type="radio"
                      name="status"
                      value="Shoes"
                      checked={cat === "Shoes"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label
                      htmlFor="Shoes"
                      className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                    >
                      {trr === "fr"
                        ? "Chaussures"
                        : trr === "eng"
                        ? "Shoes"
                        : trr === "ar" && "أحذية"}
                    </label>
                  </fieldset>
                  <fieldset>
                    <input
                      id="Accessories"
                      className="peer/draft  mr-2 cursor-pointer"
                      type="radio"
                      name="status"
                      checked={cat === "Accessories"}
                      value="Accessories"
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label
                      htmlFor="Accessories"
                      className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                    >
                      {trr === "fr"
                        ? "Accessoires"
                        : trr === "eng"
                        ? "Accessories"
                        : trr === "ar" && "إكسسوارات"}
                    </label>
                  </fieldset>
                </>
              )}
            </div>
          </div>
          {/* ////////////////// */}
          <div className="flex flex-col gap-2 py-3 ps-4 shadow-md border rounded-md">
            <h2 className=" text-[25px] font-extrabold">
              {trr === "fr"
                ? "Sous-Catégorie:"
                : trr === "eng"
                ? " Subcategory:"
                : trr === "ar" && "الفئة الفرعية:"}
            </h2>
            {content}
          </div>
          {/* <div className="flex flex-col gap-2 py-3 ps-4 shadow-md border rounded-md">
            <h2 className=" text-[25px] font-extrabold">Marques:</h2>
            <div className="flex flex-col gap-2">
              <fieldset>
                <input
                  id="Marque1"
                  className="peer/draft mr-2 cursor-pointer"
                  type="radio"
                  name="Marques"
                />
                <label
                  htmlFor="Marque1"
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  Marque 1
                </label>
              </fieldset>
              <fieldset>
                <input
                  id="Marque2"
                  className="peer/draft  mr-2 cursor-pointer"
                  type="radio"
                  name="Marques"
                />
                <label
                  htmlFor="Marque2"
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  Marque 2
                </label>
              </fieldset>
              <fieldset>
                <input
                  id="Marque3"
                  className="peer/draft  mr-2 cursor-pointer"
                  type="radio"
                  name="Marques"
                />
                <label
                  htmlFor="Marque 3"
                  className="peer-checked/draft:text-red-600 text-[16px] font-bold cursor-pointer"
                >
                  Marque 3
                </label>
              </fieldset>
            </div>
          </div> */}
          {/* <div className="flex flex-col gap-2 py-3 ps-4 shadow-md border rounded-md">
            <h2 className=" text-[25px] font-extrabold">Prix:</h2>
            <input
              type="range"
              min={1000}
              max={50000}
              step={10}
              onChange={(e) => setRange(e.target.value)}
              className="w-[95%]"
            />
            <p className=" text-[16px] font-bold">{range} DZD</p>
          </div> */}
        </div>
        <div className="md:w-[78%] w-[100%] ">
          <div className="flex justify-between items-center mt-0 flex-wrap gap-4">
            <p className=" text-[17px] font-bold">
              {trr === "fr"
                ? "Nombre de produits:"
                : trr === "eng"
                ? "Number of products:"
                : trr === "ar" && "عدد المنتجات:"}{" "}
              <span className=" font-extrabold text-[18px] text-red-600">
                {data1 && data1.length}
              </span>
            </p>
            <div className="flex items-center gap-4 ">
              <p className="text-[18px] font-bold text-gray-500">
                {trr === "fr"
                  ? "Trier par:"
                  : trr === "eng"
                  ? "Sort by:"
                  : trr === "ar" && "ترتيب حسب:"}
              </p>
              <select
                name="category"
                id="category"
                onChange={(e) => setChoss(e.target.value)}
                value={choos}
                className="block cursor-pointer py-1 px-2 w-[200px] text-[16px] text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-auto dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder="Product category..."
              >
                <option className="font-bold " value="Default">
                  {trr === "fr"
                    ? "Par Défaut:"
                    : trr === "eng"
                    ? "Default"
                    : trr === "ar" && "الافتراضي"}
                </option>
                <option className="font-bold " value="A_Z">
                  A_Z
                </option>

                <option className="font-bold " value="Z_A">
                  Z_A
                </option>
                <option className="font-bold  mb-1" value="On sale">
                  {trr === "fr"
                    ? "EN SOLDE:"
                    : trr === "eng"
                    ? "ON SALE:"
                    : trr === "ar" && "الخصم"}
                </option>

                <option
                  className="font-bold mb-1  "
                  value="The most recent first"
                >
                  {trr === "fr"
                    ? "Le plus récent en premier"
                    : trr === "eng"
                    ? "The most recent first"
                    : trr === "ar" && "الأحدث أولا"}
                </option>
              </select>
            </div>
          </div>
          {!isLoading ? (
            <AnimatePresence>
              <motion.div
                transition={{ duration: 1, ease: "easeInOut" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 mt-10 relative"
              >
                {data && data.length > 0 ? (
                  data.map((el) => {
                    return (
                      <ProductCart key={el._id} ele={el} setLog={setLog} />
                    );
                  })
                ) : data1 && data1.length > 0 ? (
                  data1.map((e) => {
                    return <ProductCart key={e._id} ele={e} setLog={setLog} />;
                  })
                ) : (
                  <p className=" flex justify-center items-center font-extrabold text-[25px]   w-[100%] absolute ">
                    {trr === "fr"
                      ? "Bientôt Disponible"
                      : trr === "eng"
                      ? "Coming Soon"
                      : trr === "ar" && "قريبا"}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <HashLoader color="#36d7b7" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shope;
//  useEffect(() => {
//     if (products) {
//       if (gender === "Tous") {
//         setData(products);
//       } else if (gender === "Femmel") {
//         setData(products.filter((ele) => ele.family === "Femme"));
//       } else if (gender === "Homme") {
//         setData(products.filter((ele) => ele.family === "Homme"));
//       } else if (gender === "Fille") {
//         setData(products.filter((ele) => ele.gender === "Fille"));
//       } else if (gender === "Garçon") {
//         setData(products.filter((ele) => ele.gender === "Garçon"));
//       }
//     }
//   }, [gender]);
//   useEffect(() => {
//     if (products) {
//       if (gender === "Tous") {
//         if (cat === "Par Défaut") {
//           setData(products);
//         } else {
//           setData(products.filter((ele) => ele.category === cat));
//         }
//       } else {
//         if (cat === "Par Défaut") {
//           setData(products.filter((ele) => ele.family === gender));
//         } else if (cat === "Vêtements") {
//           setData(
//             products
//               .filter((ele) => ele.family === gender)
//               .filter((ele) => ele.category === "Vêtements")
//           );
//         } else if (cat === "Chaussures") {
//           setData(
//             products
//               .filter((ele) => ele.family === gender)
//               .filter((ele) => ele.category === "Chaussures")
//           );
//         } else if (cat === "Accessoires") {
//           setData(
//             products
//               .filter((ele) => ele.family === gender)
//               .filter((ele) => ele.category === "Accessoires")
//           );
//         }
//       }
//     }
//   }, [cat]);
//  {
//    data &&
//      data.length > 0 &&
//      data.map((ele) => {
//        return <ProductCart key={ele._id} ele={ele} />;
//      });
//  }
