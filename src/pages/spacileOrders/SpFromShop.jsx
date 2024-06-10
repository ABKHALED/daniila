import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProdcutsQuery } from "../../components/products/productApi";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { useSpacailMutation } from "../../components/info/infoApiSlice";
import { toast } from "react-toastify";
import { setIn } from "formik";
const wilaya = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Bejaia",
  "Biskra",
  "Bechar",
  "Bilda",
  "Bouira",
  "Tamanrasset",
  "Tebassa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Setif",
  "Siada",
  "Skikda",
  "Sidi Bel Abbes",
  "Annaba",
  "Guelma",
  "Constantine",
  "Medea",
  "Mostaganem",
  "Msila",
  "Mscara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdes",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Ouad",
  "Khenchla",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Ain Defla",
  "Naama",
  "Ain Temouchent",
  "Ghardaia",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Beni Abbes",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "Mghair",
  "Meniaa",
];
const SpFromShop = () => {
  const trr = useSelector((state) => state.tran.tran);
  const [choose, setChoose] = useState(false);
  const [data, setData] = useState(null);
  const [filterd, setFilterd] = useState(null);
  const [pro, setPro] = useState(null);
  const [inp, setInp] = useState("");
  const [fl, setFl] = useState(false);
  const { data: products } = useGetProdcutsQuery("productList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [spacail, { isLoading }] = useSpacailMutation();
  useEffect(() => {
    if (data) {
      if (inp !== "") {
        setFilterd(
          data.filter((ele) =>
            ele.productTitle.toLowerCase().startsWith(inp.toLowerCase())
          )
        );
      } else if (inp === "") {
        setFilterd(null);
      }
    }
  }, [inp]);
  useEffect(() => {
    setData(products);
  }, [products]);
  useEffect(() => {}, [pro]);
  useEffect(() => {
    if (filterd && filterd.length > 0) {
      setFl(true);
    } else {
      setFl(false);
    }
  }, [filterd]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [addr, setAddr] = useState("");
  const [msg, setMsg] = useState("");
  const sendInfo = async (ele) => {
    try {
      if (first && last && num && city && addr && msg && ele) {
        await spacail({
          productInfo: { ...ele },
          userInfo: {
            first: first,
            last: last,
            num: num,
            email: email,
            city: city,
            addr: addr,
          },
          changes: msg,
          Images: [],
          cus: "our",
        });
        toast.success(`your Order was placed`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
        setFilterd(null);
        setFirst("");
        setLast("");
        setEmail("");
        setNum("");
        setCity("");
        setAddr("");
        setMsg("");
        setPro(null);
        setInp("");
      } else {
        toast.error(`Please fill all the fields`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col p-4 gap-10 w-[100%] md:w-[70%] mx-auto border border-fcolor rounded-lg">
      <div className=" flex-col flex gap-3 relative">
        <p className="text-[20px] font-bold">
          {trr === "fr"
            ? "Entrez le nom du produit pour le sélectionner :"
            : trr === "eng"
            ? "Enter product name to select it :"
            : trr === "ar" && ": أدخل اسم المنتج لتحديده"}
        </p>
        <input
          onChange={(e) => setInp(e.target.value)}
          value={inp}
          type="text"
          name="Product"
          required
          className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
          placeholder="Enter product name..."
        />
        <AnimatePresence>
          {fl && (
            <motion.div
              transition={{ duration: 0.5, ease: "easeInOut" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" bg-white relative  border w-full h-[300px] p-3 rounded-md "
            >
              <div
                onClick={() => {
                  setFl(false);
                  setInp("");
                }}
                className=" absolute top-5 right-3 cursor-pointer text-[30px] transition-all duration-300 ease-in-out hover:text-red-600 "
              >
                <FaXmark />
              </div>
              <p className=" text-center text-fcolor font-extrabold text-[20px]">
                {trr === "fr"
                  ? "Sélectionnez le produit que vous souhaitez"
                  : trr === "eng"
                  ? "Select the product you want"
                  : trr === "ar" && "حدد المنتج الذي تريده"}
              </p>

              <div className="mt-[20px] flex justify-center items-center gap-2 overflow-y-auto">
                {filterd &&
                  filterd.length > 0 &&
                  filterd.map((ele, i) => {
                    return (
                      <div
                        onClick={() => {
                          setPro(ele);
                          setInp("");
                          setFl(false);
                        }}
                        key={i}
                        className="w-[85px] cursor-pointer h-[85px] rounded-sm opacity-70 hover:opacity-100 transition-all duration-300"
                      >
                        <img
                          src={ele.coverImage}
                          className="w-full h-full rounded-sm object-cover"
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-[30px] text-center mt-5 text-fcolor font-extrabold">
          {trr === "fr"
            ? "Informations sur le produit:"
            : trr === "eng"
            ? "Product information:"
            : trr === "ar" && ":معلومات المنتج"}
        </p>
        <div className="flex justify-between items-center gap-3 flex-wrap border-b pb-3">
          <p className="text-[18px] font-bold flex items-center gap-4 mt-5">
            {trr === "fr"
              ? "Nom du produit:"
              : trr === "eng"
              ? "Product name:"
              : trr === "ar" && ": اسم المنتج"}{" "}
            <span className=" text-[17px] font-extrabold text-fcolor">
              {pro && pro.productTitle}
            </span>
          </p>
          <p className="text-[18px] font-bold flex items-center gap-4 mt-5 flex-wrap">
            {trr === "fr"
              ? "Catégorie de produit:"
              : trr === "eng"
              ? "Product category:"
              : trr === "ar" && ":فئة المنتج"}{" "}
            <span className=" text-[17px] font-extrabold text-fcolor">
              {pro && pro.family} / {pro && pro.category} / {pro && pro.type}
            </span>
          </p>
        </div>
        <p className="text-[30px] text-center mt-5 text-fcolor font-extrabold">
          {trr === "fr"
            ? "images de produits:"
            : trr === "eng"
            ? "Product images :"
            : trr === "ar" && ":صور المنتج "}
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap border-b pb-3">
          {pro &&
            pro.images.map((ele, i) => {
              return (
                <img
                  key={i}
                  src={ele}
                  className="w-[80px] h-[80px] rounded-md"
                  alt=""
                />
              );
            })}
        </div>
        <p className="text-[30px] text-center mt-5 text-fcolor font-extrabold">
          {trr === "fr"
            ? "Vos informations :"
            : trr === "eng"
            ? "Your information :"
            : trr === "ar" && ": المعلومات الخاصة بك"}
        </p>
        <div className="flex items-center gap-4 justify-between flex-wrap ">
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Nom :"
                : trr === "eng"
                ? "Last Name :"
                : trr === "ar" && ":اللقب"}
            </p>
            <input
              onChange={(e) => setFirst(e.target.value)}
              value={first}
              type="text"
              required
              className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder="..."
            />
          </div>
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Prénom :"
                : trr === "eng"
                ? "First Name :"
                : trr === "ar" && ":الاسم"}
            </p>
            <input
              onChange={(e) => setLast(e.target.value)}
              value={last}
              type="text"
              required
              className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder="..."
            />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between flex-wrap">
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Numéro de téléphone :"
                : trr === "eng"
                ? "Phone number :"
                : trr === "ar" && ":رقم الهاتف"}
            </p>
            <input
              onChange={(e) => setNum(e.target.value)}
              value={num}
              type="tel"
              required
              maxLength={10}
              minLength={10}
              className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder="..."
            />
          </div>
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Email :"
                : trr === "eng"
                ? "Email :"
                : trr === "ar" && ":البريد الإلكتروني"}
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder="..."
            />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between flex-wrap">
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Votre ville :"
                : trr === "eng"
                ? "Your city :"
                : trr === "ar" && ":مدينتك"}
            </p>
            <select
              name=""
              id="city"
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="peer  mt-1 px-3 py-1 cursor-pointer bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
            >
              <option value="">
                {trr === "fr"
                  ? "Sélectionnez votre ville"
                  : trr === "eng"
                  ? "Select your city"
                  : trr === "ar" && "اختر مدينتك"}
              </option>
              {wilaya.map((ele, i) => {
                return (
                  <option value={ele} key={i}>
                    {ele}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[100%] md:w-[48%] flex flex-col gap-2">
            <p className=" font-extrabold">
              {trr === "fr"
                ? "Votre adresse :"
                : trr === "eng"
                ? "Your address :"
                : trr === "ar" && ": عنوانك"}
            </p>
            <input
              onChange={(e) => setAddr(e.target.value)}
              value={addr}
              type="text"
              className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder="..."
            />
          </div>
        </div>
        <div className="mt-5  border-b pb-3">
          <p className=" font-extrabold">
            {trr === "fr"
              ? "Dites-nous tous les changements que vous souhaitez comme la taille, la couleur, la quantité et les changements dans la conception et nous vous contacterons pour plus de détails :"
              : trr === "eng"
              ? "Tell us all the changes you want like size, color,quantity and changes in the design and we will contact you for more details :"
              : trr === "ar" &&
                ": أخبرنا بجميع التغييرات التي تريدها مثل الحجم واللون والكمية والتغييرات في التصميم وسوف نتصل بك لمزيد من التفاصيل"}
          </p>
          <textarea
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            name=""
            id=""
            className="bg-white resize-none border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full  sm:text-lg focus:ring-1 h-[150px] rounded-md p-3 mt-2"
            placeholder="message"
          ></textarea>
        </div>
        <div
          onClick={() => sendInfo(pro)}
          className="w-full h-[50px] flex justify-center items-center bg-fcolor text-white mt-5 text-[25px] font-extrabold border cursor-pointer rounded-md border-fcolor hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          {trr === "fr"
            ? "Envoyer"
            : trr === "eng"
            ? "Send"
            : trr === "ar" && "إرسال"}
        </div>
      </div>
    </div>
  );
};

export default SpFromShop;
