import React, { useEffect, useRef, useState } from "react";

import { FaAngleDoubleDown } from "react-icons/fa";
import p1 from "../../assets/228945.jpg";
import { Element, Link } from "react-scroll";
import { HashLoader } from "react-spinners";
import { useDraggable } from "react-use-draggable-scroll";
import { useByFamilyMutation } from "../../components/products/productApi";
import { AnimatePresence, motion } from "framer-motion";
import ProductCart from "../../components/products/ProductCart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const arrV = [
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
const arrS = [
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
const arrA = [
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
function Men({ setLog }) {
  const [cat, setCat] = useState("Tous");
  const [gender, setGander] = useState("All");
  const ref = useRef();
  const [ar, setAr] = useState(null);
  const { events } = useDraggable(ref);
  const [byFamily, { isSuccess2, isLoading }] = useByFamilyMutation();
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [open, setOpen] = useState(false);
  const [fil, setFil] = useState("");

  const get = async (gender, cat, sub) => {
    try {
      const product = await byFamily({
        ProdFamily: "Men",
      });
      setData1(product.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    get();
  }, [cat, gender]);
  useEffect(() => {
    setCat("");
  }, [gender]);

  useEffect(() => {
    setData(data1);

    if (data1) {
      if (gender === "All") {
        setData(data1);
        setCat("");
      } else if (cat === "") {
        setData(data1.filter((ele) => ele.category === gender));
      } else {
        setData(
          data1
            .filter((ele) => ele.category === gender)
            .filter((el) => el.type === cat)
        );
      }
    }
  }, [cat, data1, gender]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setCat("");
    setAr(null);
    setGander("All");
    if (data) {
      if (fil === "Default") {
        setData(data1);
      } else if (fil === "A_Z") {
        setData(
          [...data1].sort((a, b) => (a.productTitle > b.productTitle ? 1 : -1))
        );
      } else if (fil === "Z_A") {
        setData(
          [...data1].sort((a, b) => (a.productTitle < b.productTitle ? 1 : -1))
        );
      } else if (fil === "On sale") {
        setData(data1.filter((ele) => ele.onSale === true));
      } else if (fil === "The most recent first") {
        setData([...data1].reverse());
      } else if (fil === "most liked first") {
        // setData(data1.map((ele) => Object.keys(ele.likes).length));
        let a = [...data1].sort((a, b) =>
          Object.keys(a.likes).length < Object.keys(b.likes).length ? 1 : -1
        );
        setData(a);
      }
    }
  }, [fil]);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <>
      <div
        className={`w-full h-[calc(100vh-115px)] mt-[115px] relative  flex items-center justify-start px-3 md:px-9  `}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000077] z-0"></div>
        <img
          src={p1}
          className=" absolute right-0 left-0 object-cover object-left w-full h-full z-[-1]"
          alt=""
        />
        <div className=" flex flex-col justify-center relative text-white  items-center w-full  sm:gap-0 gap-5 ">
          {data1 && data1.length > 0 ? (
            <>
              <h1 className="    text-center text-[50px] sm:text-[80px] font-bold leading-[1.2] mb-7">
                {trr === "fr"
                  ? "Section Hommes"
                  : trr === "eng"
                  ? "Men's Section"
                  : trr === "ar" && "قسم الرجال"}
              </h1>
              <p className="text-[19px] max-w-[600px]  text-center mb-7 mx-auto font-semibold">
                {trr === "fr"
                  ? "Chez DaniLA, nous comprenons que la mode masculine ne consiste pas seulement à bien paraître, mais aussi à se sentir confiant et à exprimer son individualité. C'est pourquoi nous avons créé une collection complète de vêtements, chaussures et accessoires élégants et de haute qualité qui répondent aux divers besoins et goûts de l'homme moderne."
                  : trr === "eng"
                  ? "At DaniLA, we understand that men's fashion is not just about looking good, but also about feeling confident and expressing one's individuality. That's why we've created a comprehensive collection of stylish and high-quality clothing, shoes, and accessories that cater to the modern man's diverse needs and tastes."
                  : trr === "ar" &&
                    "في DaniLA ، نفهم أن أزياء الرجال لا تتعلق فقط بالمظهر الجيد ، ولكن أيضا بالشعور بالثقة والتعبير عن الفردية. لهذا السبب أنشأنا مجموعة شاملة من الملابس والأحذية والإكسسوارات الأنيقة وعالية الجودة التي تلبي احتياجات وأذواق الرجل العصري المتنوعة."}
              </p>
              <Link
                to="target"
                spy={true}
                smooth={true}
                offset={-180}
                duration={500}
                className="w-[35px] h-[35px] text-[20px] flex items-center justify-center text-fcolor rounded-full bg-white animate-bounce cursor-pointer transition-all duration-300 ease-in-out hover:text-white hover:bg-fcolor"
              >
                <FaAngleDoubleDown />
              </Link>
            </>
          ) : isLoading ? (
            <HashLoader color="#36d7b7" />
          ) : (
            <h1 className="    text-center text-[50px] sm:text-[80px] font-bold leading-[1.2] mb-7">
              {trr === "fr"
                ? "Coming Soon"
                : trr === "eng"
                ? "Coming Soon"
                : trr === "ar" && "قريبا"}
            </h1>
          )}
        </div>
      </div>
      <div
        className={`w-full  items-center justify-center gap-5 md:gap-10 mt-[70px] px-3 md:px-9 ${
          data1 && data1.length > 0 ? "flex" : "hidden"
        }`}
      >
        <div
          onClick={() => setGander("All")}
          className={` hover:text-fcolor py-1 relative before:absolute before:w-0 before:h-1  before:bottom-0 before:left-0 before:bg-fcolor before:w-0${
            gender === "All" ? "  before:w-full  text-fcolor" : ""
          } cursor-pointer flex justify-center items-center   text-[18px]  md:text-[30px] font-extrabold transition-all duration-300 ease-in-out`}
        >
          {trr === "fr"
            ? "Tous"
            : trr === "eng"
            ? "All"
            : trr === "ar" && "الكل"}
        </div>
        <div
          onClick={() => {
            setGander("Clothing");
            setAr(arrV);
          }}
          className={` hover:text-fcolor py-1 relative before:absolute  before:h-1  before:bottom-0 before:left-0 before:bg-fcolor before:w-0${
            gender === "Clothing"
              ? "  before:w-full  text-fcolor"
              : "before:w-0"
          } cursor-pointer flex justify-center items-center   text-[18px]  md:text-[30px] font-extrabold transition-all duration-300 ease-in-out`}
        >
          {trr === "fr"
            ? "Vêtements"
            : trr === "eng"
            ? "Clothing"
            : trr === "ar" && "الملابس"}
        </div>
        <div
          onClick={() => {
            setGander("Accessories");
            setAr(arrA);
          }}
          className={` hover:text-fcolor py-1 relative before:absolute  before:h-1  before:bottom-0 before:left-0 before:bg-fcolor before:w-0${
            gender === "Accessories"
              ? "  before:w-full  text-fcolor"
              : "before:w-0"
          } cursor-pointer flex justify-center items-center   text-[18px]  md:text-[30px] font-extrabold transition-all duration-300 ease-in-out`}
        >
          {trr === "fr"
            ? "Accessoires"
            : trr === "eng"
            ? "Accessories"
            : trr === "ar" && "إكسسوارات"}
        </div>
        <div
          onClick={() => {
            setGander("Shoes");
            setAr(arrS);
          }}
          className={` hover:text-fcolor py-1 relative before:absolute  before:h-1  before:bottom-0 before:left-0 before:bg-fcolor before:w-0${
            gender === "Shoes" ? "  before:w-full  text-fcolor" : "before:w-0"
          } cursor-pointer flex justify-center items-center   text-[18px]  md:text-[30px] font-extrabold transition-all duration-300 ease-in-out`}
        >
          {trr === "fr"
            ? "Chaussures"
            : trr === "eng"
            ? "Shoes"
            : trr === "ar" && "أحذية"}
        </div>
      </div>
      <Element
        name="target"
        className={`mt-[30px] sm:mt-[70px] px-3 md:px-9 ${
          data1 && data1.length > 0 ? "block mb-[70px]" : "hidden mb-[0]"
        }`}
      >
        <div
          {...events}
          ref={ref}
          className="w-[100%] flex gap-3 items-center  overflow-x-scroll scrollbar-hide ss relative"
        >
          {ar &&
            ar.map((ele, i) => {
              return (
                <p
                  key={i}
                  className={`text-[16px] cursor-pointer select-none flex-none py-2 px-3 border rounded-lg transition-all duration-300 ease-in-out hover:bg-fcolor hover:text-white font-semibold text-black border-fcolor ${
                    cat === ele.eng && "bg-fcolor text-white"
                  }`}
                  onClick={() => setCat(ele.eng)}
                >
                  {ele[trr]}
                </p>
              );
            })}
        </div>
        <div
          className={`mt-[30px] sm:mt-[70px]  flex-col gap-5 ${
            data1 && data1.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className=" flex justify-center sm:justify-between items-center flex-wrap gap-3 ">
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
                onChange={(e) => setFil(e.target.value)}
                value={fil}
                className="block cursor-pointer py-1 px-2 w-[200px] text-[16px] text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-auto dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                placeholder="Product category..."
              >
                <option className="font-bold " value="Défaut">
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
                <option className="font-bold  mb-1" value="most liked first">
                  {trr === "fr"
                    ? "Les plus aimés en premier"
                    : trr === "eng"
                    ? " Most liked first"
                    : trr === "ar" && "الأكثر شعبية أولا"}
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
                className="grid grid-cols-2 lg:grid-cols-4  gap-2 mt-10 relative"
              >
                {data && data.length > 0 ? (
                  data.map((el) => {
                    return (
                      <ProductCart key={el._id} ele={el} setLog={setLog} />
                    );
                  })
                ) : (
                  <p className=" flex justify-center items-center font-extrabold text-[25px]   w-[100%] absolute ">
                    {trr === "fr"
                      ? "Coming Soon"
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
      </Element>
    </>
  );
}

export default Men;
