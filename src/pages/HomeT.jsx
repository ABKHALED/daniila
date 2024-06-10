import React, { useEffect, useRef, useState } from "react";

import { FaAngleDoubleDown } from "react-icons/fa";
import p1 from "../assets/4131.jpg";
import { Element, Link } from "react-scroll";
import { HashLoader } from "react-spinners";
import { useDraggable } from "react-use-draggable-scroll";

import { AnimatePresence, motion } from "framer-motion";

import { useByFamilyMutation } from "../components/products/productApi";
import ProductCart from "../components/products/ProductCart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// const ar = [
//   "All",
//   "Dicoration",
//   "Curtains",
//   "Carpets and Rugs",
//   "Bedding",
//   "Lighting Fixtures",
// ];
const ar = [
  {
    eng: "All",
    fr: "Tous",
    ar: "الكل",
  },
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
const HomeT = ({ setLog }) => {
  const [cat, setCat] = useState("Tous");
  const trr = useSelector((state) => state.tran.tran);
  const [gender, setGander] = useState("All");
  const ref = useRef();
  const { events } = useDraggable(ref);
  const [byFamily, { isSuccess2, isLoading }] = useByFamilyMutation();
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [open, setOpen] = useState(false);
  const [fil, setFil] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const get = async (gender, cat, sub) => {
    try {
      const product = await byFamily({
        ProdFamily: "Home",
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
  }, [cat]);
  //   useEffect(() => {
  //     setCat("");
  //   }, [gender]);

  useEffect(() => {
    setData(data1);

    if (data1) {
      if (cat === "" || cat === "All") {
        setData(data1);
      } else {
        setData(data1.filter((el) => el.type === cat));
      }
    }
  }, [cat, data1]);

  useEffect(() => {
    setCat("");
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

  return (
    <>
      <div
        className={`w-full h-[calc(100vh-100px)] mt-[100px] relative  flex items-center justify-start px-3 md:px-9  `}
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
                  ? "Section de la maison"
                  : trr === "eng"
                  ? "Home's section"
                  : trr === "ar" && "قسم المنزل"}
              </h1>
              <p className="text-[19px] max-w-[600px]  text-center mb-7 mx-auto font-semibold">
                {trr === "fr"
                  ? "Chez DaniLA, nous comprenons l'importance de créer un espace qui reflète votre personnalité et votre style. C'est pourquoi nous nous engageons à vous offrir une sélection inégalée d'articles ménagers, d'articles de décoration et de meubles de haute qualité pour transformer votre maison en une maison chaleureuse et accueillante."
                  : trr === "eng"
                  ? "At DaniLA, we understand the importance of creating a space that reflects your personality and style. That's why we're dedicated to providing you with an unparalleled selection of high-quality home goods, decorative items, and furniture to transform your house into a warm and inviting home."
                  : trr === "ar" &&
                    "في DaniLA، نحن نتفهم أهمية خلق مساحة تعكس شخصيتك وأسلوبك. لهذا السبب نحن ملتزمون بتزويدك بمجموعة لا مثيل لها من السلع المنزلية عالية الجودة والعناصر الزخرفية والأثاث لتحويل منزلك إلى منزل دافئ وجذاب."}
              </p>
              <Link
                to="target"
                spy={true}
                smooth={true}
                offset={-70}
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
      {/* <div
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
          All
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
          Clothing
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
          Accessories
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
          Shoes
        </div>
      </div> */}
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
};

export default HomeT;
