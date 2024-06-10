import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetOneProductMutation,
  useUpdateProductMutation,
} from "../components/products/productApi";
import { FaXmark } from "react-icons/fa6";
import { setCartItem } from "../app/api/cartSlice";
import useAuth from "../hooks/useAuth";
import { useOrderMutation } from "../components/info/infoApiSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { setOrderItem } from "../app/api/orSlise";
import { useRefreshMutation } from "../components/auth/authApiSlice";
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

const cityArr = {
  Adrar: {
    Home: "1450",
    StopeDesk: "1000",
    cancel: "200",
  },
  Chlef: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Laghouat: {
    Home: "950",
    StopeDesk: "600",
    cancel: "200",
  },
  OumElBouaghi: {
    Home: "800",
    StopeDesk: "500",
    cancel: "200",
  },
  Batna: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Bejaia: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Biskra: {
    Home: "950",
    StopeDesk: "600",
    cancel: "200",
  },
  Bechar: {
    Home: "1200",
    StopeDesk: "700",
    cancel: "200",
  },
  Bilda: {
    Home: "700",
    StopeDesk: "450",
    cancel: "200",
  },
  Bouira: {
    Home: "750",
    StopeDesk: "500",
    cancel: "200",
  },
  Tamanrasset: {
    Home: "1650",
    StopeDesk: "1200",
    cancel: "250",
  },
  Tebassa: {
    Home: "950",
    StopeDesk: "500",
    cancel: "200",
  },
  Tlemcen: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Tiaret: {
    Home: "850",
    StopeDesk: "450",
    cancel: "200",
  },
  TiziOuzou: {
    Home: "750",
    StopeDesk: "500",
    cancel: "200",
  },
  Alger: {
    Home: "600",
    StopeDesk: "450",
    cancel: "200",
  },
  Djelfa: {
    Home: "950",
    StopeDesk: "600",
    cancel: "200",
  },
  Jijel: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Setif: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Siada: {
    Home: "900",
    StopeDesk: "550",
    cancel: "200",
  },
  Skikda: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  SidiBelAbbes: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Annaba: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Guelma: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Constantine: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Medea: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Mostaganem: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Msila: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Mscara: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Ouargla: {
    Home: "1000",
    StopeDesk: "600",
    cancel: "200",
  },
  Oran: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  ElBayadh: {
    Home: "1100",
    StopeDesk: "600",
    cancel: "200",
  },
  Illizi: {
    Home: "0",
    StopeDesk: "0",
    cancel: "0",
  },
  BordjBouArreridj: {
    Home: "850",
    StopeDesk: "500",
    cancel: "200",
  },
  Boumerdes: {
    Home: "500",
    StopeDesk: "350",
    cancel: "200",
  },
  ElTarf: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Tindouf: {
    Home: "1200",
    StopeDesk: "900",
    cancel: "200",
  },
  Tissemsilt: {
    Home: "900",
    StopeDesk: "0",
    cancel: "200",
  },
  ElOuad: {
    Home: "1000",
    StopeDesk: "600",
    cancel: "200",
  },
  Khenchla: {
    Home: "900",
    StopeDesk: "800",
    cancel: "200",
  },
  SoukAhras: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Tipaza: {
    Home: "800",
    StopeDesk: "500",
    cancel: "200",
  },
  Mila: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  AinDefla: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Naama: {
    Home: "1200",
    StopeDesk: "600",
    cancel: "200",
  },
  AinTemouchent: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Ghardaia: {
    Home: "950",
    StopeDesk: "600",
    cancel: "200",
  },
  Relizane: {
    Home: "900",
    StopeDesk: "500",
    cancel: "200",
  },
  Timimoun: {
    Home: "1450",
    StopeDesk: "0",
    cancel: "250",
  },
  BordjBadjiMokhtar: {
    Home: "0",
    StopeDesk: "0",
    cancel: "0",
  },
  OuledDjellal: {
    Home: "950",
    StopeDesk: "600",
    cancel: "200",
  },
  BeniAbbes: {
    Home: "1100",
    StopeDesk: "0",
    cancel: "250",
  },
  InSalah: {
    Home: "1650",
    StopeDesk: "1200",
    cancel: "250",
  },
  InGuezzam: {
    Home: "1650",
    StopeDesk: "0",
    cancel: "250",
  },
  Touggourt: {
    Home: "950",
    StopeDesk: "600",
    cancel: "250",
  },
  Djanet: {
    Home: "0",
    StopeDesk: "0",
    cancel: "0",
  },

  Mghair: {
    Home: "950",
    StopeDesk: "0",
    cancel: "200",
  },
  Meniaa: {
    Home: "1100",
    StopeDesk: "0",
    cancel: "200",
  },
};

function CheckOut() {
  const { _id, firstName, lastName, email, phoneNumber } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [getOneProduct, { isSuccess }] = useGetOneProductMutation();
  const [order, { isSuccess1 }] = useOrderMutation();
  const [prod, setProd] = useState([]);
  const [total, setTotle] = useState(0);
  const [dev, setDev] = useState("Home");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [emailI, setEmaili] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [fullAdders, setFullAdders] = useState("");
  const [ret, setRet] = useState("");
  const [delevery, setDelevery] = useState("");
  const [updateProduct, { isLoading, isSuccess3 }] = useUpdateProductMutation();
  const [refresh, { isUninitialized, isLoading3, isSuccess4, isError, error }] =
    useRefreshMutation();
  const orderitems = useSelector((state) => state.order.orderItems);
  useEffect(() => {
    if (firstName && lastName && email && phoneNumber) {
      setFirst(firstName);
      setLast(lastName);
      setEmaili(email);
      setPhone(phoneNumber);
    } else {
      setFirst("");
      setLast("");
      setEmaili("");
      setPhone("");
    }
  }, [_id]);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems]);
  useEffect(() => {
    if (city !== "") {
      setDelevery(
        cityArr[
          city
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", "")
        ][dev]
      );
      setRet(
        cityArr[
          city
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", "")
            .replace(" ", "")
        ].cancel
      );
    } else {
      setDelevery("0");
      setRet("0");
    }
  }, [dev, city]);
  const trr = useSelector((state) => state.tran.tran);
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
  const navigate = useNavigate();
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

  const setOrder = async () => {
    try {
      if (first && last && phone && city && fullAdders && cartItems) {
        const oid = uuidv4();
        const or = await order({
          userId: _id ? _id : "",
          info: {
            firstName: first,
            lastName: last,
            fullAdders: fullAdders,
            email: emailI,
            phoneNumber: phone,
            city: city,
            dev: dev,
            delevery: delevery,
          },
          orderId: oid.slice(0, 18),
          array: cartItems,
        });
        toast.success(`your Order was placed`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
        dispatch(
          setOrderItem([
            ...orderitems,
            {
              orderId: oid.slice(0, 18),
              // array: cartItems,
            },
          ])
        );
        localStorage.setItem(
          "order",
          JSON.stringify([
            ...orderitems,
            {
              orderId: oid.slice(0, 18),
              // array: cartItems,
            },
          ])
        );
        if (prod) {
          for (let i = 0; i < prod.length; i++) {
            mins(prod[i].product._id, prod[i].count, prod[i].product);
          }
        }
        dispatch(setCartItem([]));
        localStorage.removeItem("cart");
        if (_id) {
          await refresh();
        }
        navigate("/Order");
      } else {
        toast.warning(`Please fill all fields`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (err) {}
  };

  const mins = async (id, count, pro) => {
    let stock = `${Number(pro.stock) - Number(count)}`;
    let bought = `${Number(pro.bought) + Number(count)}`;
    // p.stock = Number(prod.stock) - Number(count);
    try {
      await updateProduct({ stock, bought, pp: id }).unwrap();
    } catch (err) {}
  };
  return (
    <div className="w-full pt-[50px]  mt-[115px] mb-[70px]  px-3 md:px-9">
      <div className="flex justify-center sm:justify-between items-center flex-wrap">
        <h1 className="text-[40px] font-extrabold">
          {trr === "fr"
            ? "Check Out"
            : trr === "eng"
            ? "Check Out"
            : trr === "ar" && "الدفع"}
        </h1>
        {trr === "ar" ? (
          <div
            onClick={() => navigate("/shop")}
            className="flex items-center w-[230px] justify-center hover:bg-fcolor hover:text-white font-bold  cursor-pointer gap-2 text-[18px] transition-all duration-300 ease-in-out p-2 border border-fcolor rounded-md "
          >
            <p>العودة إلى التسوق</p>
            <IoMdArrowRoundBack className="text-[24px]" />
          </div>
        ) : (
          <div
            onClick={() => navigate("/shop")}
            className="flex items-center w-[230px] justify-center hover:bg-fcolor hover:text-white font-bold  cursor-pointer gap-2 text-[18px] transition-all duration-300 ease-in-out p-2 border border-fcolor rounded-md "
          >
            <IoMdArrowRoundBack className="text-[24px]" />
            <p>
              {trr === "fr"
                ? "Retour aux achats"
                : trr === "eng" && "Back to shopping"}
            </p>
          </div>
        )}
      </div>
      <div className="mt-[30px] grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          className="bg-gray-100 rounded-lg p-4
        "
        >
          <h2 className=" text-fcolor font-extrabold text-[20px] text-center ">
            {trr === "fr"
              ? "Votre Commande"
              : trr === "eng"
              ? "Your Order"
              : trr === "ar" && "طلبك"}
          </h2>
          <div className=" mt-10">
            <div className="flex  md:justify-start justify-center flex-col mb-5 gap-10 w-[100%] ">
              {prod.length > 0 &&
                prod.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="flex border-b pb-3 border-black justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-full flex justify-center items-center">
                          <FaXmark
                            onClick={() => removeItem(ele.product._id)}
                            className=" text-[18px] sm:text-[25px] hover:text-red-500 cursor-pointer transition-all duration-300 ease-in-out"
                          />
                        </div>
                        <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-md overflow-hidden">
                          <img
                            src={ele.product.coverImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="">
                          <p className=" font-bold">
                            {ele.product.productTitle}
                          </p>
                          <div className=" flex gap-2 items-center  mt-3">
                            <p className=" font-bold">
                              {trr === "fr"
                                ? "Couleur:"
                                : trr === "eng"
                                ? "Color:"
                                : trr === "ar" && "اللون:"}
                            </p>
                            <p
                              style={{ backgroundColor: ele.color }}
                              className=" w-[25px] h-[25px] border border-black rounded-md"
                            ></p>
                          </div>
                          <div className=" flex gap-2 items-center  mt-3">
                            <p className=" font-bold">
                              {trr === "fr"
                                ? "Quantité:"
                                : trr === "eng"
                                ? "Quantity:"
                                : trr === "ar" && "الكمية:"}
                            </p>
                            <p className=" font-bold text-fcolor">
                              {ele.count}
                            </p>
                          </div>
                          <div className=" flex gap-2 items-center  mt-3">
                            <p className=" font-bold">
                              {" "}
                              {trr === "fr"
                                ? "Taille:"
                                : trr === "eng"
                                ? "Size:"
                                : trr === "ar" && ":المقاس"}
                            </p>
                            <p className=" font-bold text-fcolor">{ele.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className=" flex gap-5 flex-col items-center justify-center h-full ">
                        <p className="font-extrabold text-center">
                          {ele.product.Onsale
                            ? Number(ele.product.price) -
                              Number(
                                (ele.product.price * Number(ele.product.sale)) /
                                  100
                              )
                            : ele.product.price}{" "}
                          DZD
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-between items-center border-b border-black w-full text-[18px] font-bold pb-5">
              <p>
                {trr === "fr"
                  ? "Résumé"
                  : trr === "eng"
                  ? "Summary"
                  : trr === "ar" && "موجز"}{" "}
                :
              </p>
              <p>{total}DZD</p>
            </div>
            <div className="flex justify-between items-center border-b border-black w-full text-[18px] font-bold pb-5 mt-5">
              <p>
                {trr === "fr"
                  ? "Livraison"
                  : trr === "eng"
                  ? "Delivery"
                  : trr === "ar" && "التوصيل"}{" "}
                :
              </p>
              <div className=" flex justify-center items-center gap-5 ">
                <p
                  onClick={() => setDev("Home")}
                  className={`p-1 border border-black rounded-md text-[17px] cursor-pointer ${
                    dev === "Home" ? "bg-green-500 text-white border-none" : ""
                  }`}
                >
                  Home
                </p>
                <p
                  onClick={() => setDev("StopeDesk")}
                  className={`p-1 border border-black rounded-md text-[17px] cursor-pointer ${
                    dev === "StopeDesk"
                      ? "bg-green-500 text-white border-none"
                      : ""
                  }`}
                >
                  StopeDesk
                </p>
              </div>
              <p className="font-extrabold">{delevery}DZD</p>
            </div>
            <p className="border-black border-b w-full text-center text-[18px] font-bold pb-5 mt-5 text-red-500">
              {trr === "fr"
                ? "Vous paierez"
                : trr === "eng"
                ? "You will pay"
                : trr === "ar" && "سوف تدفع"}{" "}
              {ret} DZD{" "}
              {trr === "fr"
                ? "si vous souhaitez retourner le produit"
                : trr === "eng"
                ? "if you want to return the product"
                : trr === "ar" && "إذا كنت تريد إرجاع المنتج"}
            </p>
            <div className="flex justify-between items-center border-b border-black w-full text-[18px] font-bold pb-5 mt-5">
              <p>{trr === "ar" ? "المجموع" : "Total"} :</p>
              <p>{Number(total) + Number(delevery)}DZD</p>
            </div>
          </div>
        </div>
        <form className=" w-full h-full p-3">
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block mb-2" htmlFor="to_FirtsName">
              <span className=" text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
                {trr === "fr"
                  ? "Prénom"
                  : trr === "eng"
                  ? "First Name"
                  : trr === "ar" && "الاسم"}
              </span>
              <input
                onChange={(e) => setFirst(e.target.value)}
                value={first}
                type="text"
                name="FirtsName"
                required
                className="mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                placeholder=""
              />
            </label>
            <label className="block mb-2" htmlFor="Lastname">
              <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
                {trr === "fr"
                  ? "Nom"
                  : trr === "eng"
                  ? "Last Name"
                  : trr === "ar" && "القب"}
              </span>
              <input
                onChange={(e) => setLast(e.target.value)}
                value={last}
                type="text"
                name="Lastname"
                required
                className=" peer  mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                placeholder=""
              />
            </label>
          </div>
          <label className="block  mt-5 w-full" htmlFor="city">
            <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
              {trr === "fr"
                ? "Ville"
                : trr === "eng"
                ? "City"
                : trr === "ar" && "المدينة"}
            </span>
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
          </label>
          <label className="block mt-5" htmlFor="adress">
            <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
              {trr === "fr"
                ? "Adresse Complète"
                : trr === "eng"
                ? "Full Address"
                : trr === "ar" && "العنوان الكامل"}
            </span>
            <input
              onChange={(e) => setFullAdders(e.target.value)}
              value={fullAdders}
              type="text"
              required
              name="adress"
              className=" peer  mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder=""
            />
          </label>
          <label className="block mt-5" htmlFor="telephone">
            <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
              {trr === "fr"
                ? "Numéro de Téléphone"
                : trr === "eng"
                ? "Phone Number"
                : trr === "ar" && "رقم الهاتف"}
            </span>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="tel"
              name="telephone"
              maxLength={10}
              minLength={10}
              required
              className=" peer  mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder=""
            />
          </label>
          <label className="block mt-5" htmlFor="email">
            <span className="text-fcolor font-bold   block text-lg  ">
              {trr === "fr"
                ? "Email"
                : trr === "eng"
                ? "Email"
                : trr === "ar" && "البريد الإلكتروني"}
            </span>
            <input
              onChange={(e) => setEmaili(e.target.value)}
              value={emailI}
              type="tel"
              name="email"
              className=" peer  mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
              placeholder=""
            />
          </label>
          <div
            onClick={() => setOrder()}
            className="w-full h-[50px] flex justify-center items-center bg-fcolor text-white mt-5 text-[25px] font-extrabold border cursor-pointer rounded-md border-fcolor hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300 ease-in-out"
          >
            {trr === "fr"
              ? "Commande"
              : trr === "eng"
              ? "Order"
              : trr === "ar" && "طلب"}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;
