import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { useSetSubMutation } from "./info/infoApiSlice";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
const Footer = ({ setLog }) => {
  const { _id, isAdmin, favorite } = useAuth();
  const location = useLocation().pathname;
  const [email, setEmail] = useState("");
  const [setSub, { isLoading2 }] = useSetSubMutation();
  const sub = async () => {
    try {
      if (email) {
        await setSub({ email: email });
        setEmail("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [s, setS] = useState(true);
  useEffect(() => {
    if (
      location === "/dashbored" ||
      location === "/dashbored/addProduct" ||
      location === "/dashbored/editProduct" ||
      location === "/dashbored/deletProduct" ||
      location === "/dashbored/orderProducts" ||
      location === "/dashbored/News"
    ) {
      setS(false);
    }
  }, []);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <>
      {s && (
        <>
          {" "}
          <div className="w-full h-full relative    px-3 py-9 md:px-9 bg-black text-white">
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              <div className="flex flex-col md:justify-center gap-4">
                <h1 className="text-[20px] sm:text-[25px] font-extrabold">
                  Newsletter
                </h1>
                <p className=" text-white text-[13px] font-bold ">
                  {trr === "fr"
                    ? "Abonnez-vous pour être averti lorsque nous publions de nouveaux produits ou lorsque nous réduisons les prix"
                    : trr === "eng"
                    ? "Subscribe to get notified when we release new products or when we reduce prices"
                    : trr === "ar" &&
                      "اشترك للحصول على إشعار عندما نصدر منتجات جديدة أو عندما نخفض الأسعار"}
                </p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  placeholder="Your email..."
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor text-black focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md  focus:ring-1"
                />
                <div
                  onClick={() => sub()}
                  className="w-full h-[50px] cursor-pointer rounded-lg bg-fcolor text-white flex justify-center items-center"
                >
                  {trr === "fr"
                    ? "S'abonner"
                    : trr === "eng"
                    ? "Subescribe"
                    : trr === "ar" && "الاشتراك"}
                </div>
              </div>

              <div className=" flex md:justify-center">
                <ul className=" flex flex-col gap-2">
                  <h1 className="text-[20px] sm:text-[25px] font-extrabold">
                    {trr === "fr"
                      ? "Pages"
                      : trr === "eng"
                      ? "Pages"
                      : trr === "ar" && "الصفحات"}
                  </h1>
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="Women"
                    >
                      {trr === "fr"
                        ? "Femmes"
                        : trr === "eng"
                        ? "Women"
                        : trr === "ar" && "النساء"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="Men"
                    >
                      {trr === "fr"
                        ? "Homme"
                        : trr === "eng"
                        ? "Man"
                        : trr === "ar" && "الرجال"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="Kids"
                    >
                      {trr === "fr"
                        ? "Enfants"
                        : trr === "eng"
                        ? "Children"
                        : trr === "ar" && "الأطفال"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="Home"
                    >
                      {trr === "fr"
                        ? "Maison"
                        : trr === "eng"
                        ? "Home"
                        : trr === "ar" && "البيت"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="shop"
                    >
                      {trr === "fr"
                        ? "Boutique"
                        : trr === "eng"
                        ? "Shop"
                        : trr === "ar" && "تسوق"}
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className=" flex md:justify-center">
                <ul className=" flex flex-col gap-2 font-semibold">
                  <h1 className="text-[20px] sm:text-[25px] font-extrabold">
                    {trr === "fr"
                      ? "Votre compte"
                      : trr === "eng"
                      ? "Your account"
                      : trr === "ar" && "حسابك"}
                  </h1>
                  {_id ? (
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                      to="Profile"
                    >
                      {trr === "fr"
                        ? "Profil"
                        : trr === "eng"
                        ? "Profile"
                        : trr === "ar" && "الملف الشخصي"}
                    </NavLink>
                  ) : (
                    <p
                      onClick={() => setLog(true)}
                      className="text-white transition-all duration-300 ease-in-out hover:text-red-500 cursor-pointer"
                    >
                      {trr === "ar" ? "تسجيل الدخول" : "Login"}
                    </p>
                  )}
                  {_id ? (
                    ""
                  ) : (
                    <p
                      onClick={() => setLog(true)}
                      className="text-white transition-all duration-300 ease-in-out hover:text-red-500 cursor-pointer"
                    >
                      {trr === "ar" ? "التسجيل" : "Register"}
                    </p>
                  )}

                  {_id ? (
                    <NavLink
                      to="WishLiset"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                          : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                      }
                    >
                      {trr === "fr"
                        ? "LISTE DE SOUHAITS"
                        : trr === "eng"
                        ? "WISHLIST"
                        : trr === "ar" && "قائمة الرغبات"}
                    </NavLink>
                  ) : (
                    <p
                      onClick={() => setLog(true)}
                      className="text-white transition-all duration-300 ease-in-out hover:text-red-500 cursor-pointer"
                    >
                      {trr === "fr"
                        ? "LISTE DE SOUHAITS"
                        : trr === "eng"
                        ? "WISHLIST"
                        : trr === "ar" && "قائمة الرغبات"}
                    </p>
                  )}
                  <NavLink
                    to="Order"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                        : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                    }
                  >
                    {trr === "fr"
                      ? "Commandes "
                      : trr === "eng"
                      ? "Orders"
                      : trr === "ar" && "طلبات"}
                  </NavLink>
                  <NavLink
                    to="Cart"
                    className={({ isActive, isPending }) =>
                      isActive
                        ? " text-red-500 transition-all duration-300 ease-in-out font-extrabold"
                        : "text-white transition-all duration-300 ease-in-out hover:text-red-500"
                    }
                  >
                    {trr === "fr"
                      ? "PANIER D'ACHAT"
                      : trr === "eng"
                      ? "SHOPPING CART"
                      : trr === "ar" && "عربة التسوق"}
                  </NavLink>
                </ul>
              </div>
              <div className=" flex md:justify-center">
                <div className="flex flex-col gap-8">
                  <h1 className="text-[20px] sm:text-[25px] font-extrabold">
                    {trr === "fr"
                      ? "Restez en contact"
                      : trr === "eng"
                      ? "Stay in touch"
                      : trr === "ar" && "ابق على اتصال"}
                  </h1>
                  <ul className="flex gap-4 items-center">
                    <li>
                      <a
                        href="https://www.facebook.com/people/Daniila-Style/61554950011066/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebook className=" text-[30px] hover:text-[#1877f2] transition-all duration-300 ease-in-out" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/daniila.style/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <RiInstagramFill className=" text-[30px] hover:text-[#c13584] transition-all duration-300 ease-in-out" />
                      </a>
                    </li>
                    {/* <li>
                  <a href="">
                    <FaTwitter className=" text-[30px] hover:text-[#1da1f2] transition-all duration-300 ease-in-out" />
                  </a>
                </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 md:px-9 py-2">
            <p className=" text-center text-[18px] font-extrabold text-gray-500">
              © {new Date().getFullYear()} © DaniLA 💜 . Tous droits réservés.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
