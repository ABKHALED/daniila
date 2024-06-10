import React, { useEffect, useState } from "react";
import { IoCloseSharp, IoLogIn } from "react-icons/io5";
import { Formik, useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";

import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useGetUserMutation } from "../info/infoApiSlice";

function Auth({ setLog }) {
  const [auth, setAuth] = useState("login");
  const [getimage, setGetImgae] = useState("");
  const { _id } = useAuth();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [regester] = useRegisterMutation();
  const [presiset, setPersist] = usePersist();
  // ////////////////////////////////////
  const [getUser] = useGetUserMutation();

  const [ts, setTs] = useState(false);
  ///////

  const us = async (values, onSubmitProps) => {
    try {
      const user = await getUser({ userId: _id }).unwrap();

      toast.success(`Welcome back ${user.firstName}`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const logIn = async (values, onSubmitProps) => {
    try {
      const { accessToken } = await login(values).unwrap();
      dispatch(setCredentials({ accessToken }));
      onSubmitProps.resetForm();
      setLog(false);
      setTs(true);
    } catch (err) {
      setLog(false);
      toast.error(`E-mail ou mot de passe incorrect.`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    if (ts) {
      us();
    }
  }, [ts]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await logIn(values, onSubmitProps);
  };
  const hendelPresist = () => setPersist((prev) => !prev);
  const register = async (values, onSubmitProps) => {
    try {
      await regester(values).unwrap();
      toast.success(`Welcome ${values.firstName}`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      onSubmitProps.resetForm();
      setAuth("login");
    } catch (err) {
      toast.error("Veuillez réessayer plus tard", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  const handleRegister = async (values, onSubmitProps) => {
    await register({ ...values, picturePath: getimage }, onSubmitProps);
    setGetImgae(null);
  };
  const trr = useSelector((state) => state.tran.tran);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values, onSubmitProps) => {
      handleRegister(values, onSubmitProps);
    },
  });
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" fixed top-0 left-0 w-full h-full p-4 py-5 bg-[#000000ba] flex justify-center items-center z-[10000]"
    >
      {auth === "login" ? (
        <AnimatePresence>
          <motion.div
            transition={{ ease: "easeOut", duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-3 px-10 w-[90%] lg:w-[40%] h-fit bg-white flex flex-col rounded-xl "
          >
            <div className="  flex items-center  pt-2 justify-end  ">
              <IoCloseSharp
                onClick={() => setLog(false)}
                className="transition-all duration-300 text-[35px] text-[#868e96] ease-in-out hover:text-red-600 cursor-pointer hover:rotate-180 "
              />
            </div>
            <div
              className={`flex border-b pb-8 items-center gap-10 text-lg md:text-[25px] font-bold text-[#868e96]`}
            >
              <p
                onClick={() => setAuth("login")}
                className={` ${
                  auth === "login" && "text-fcolor"
                } cursor-pointer`}
              >
                {trr === "ar" ? "تسجيل الدخول" : "Login"}
              </p>
              <p
                onClick={() => setAuth("register")}
                className={` ${
                  auth === "register" && "text-fcolor"
                } cursor-pointer`}
              >
                {trr === "ar" ? "التسجيل" : "Register"}
              </p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 mt-5"
                >
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      {trr === "ar" ? "بريد إلكتروني" : "Email"}
                    </span>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="you@example.com"
                    />
                    <p className="text-sm mt-2 text-red-600">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </label>

                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      {trr === "fr"
                        ? "nouveau mot de passe"
                        : trr === "eng"
                        ? "New Password"
                        : trr === "ar" && "كلمة المرور الجديدة"}
                    </span>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    />
                    <p className="text-sm mt-2 text-red-600">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-bold mt-2  h-[40px] flex justify-center items-center text-lg gap-3 border  border-bcolor transition-all duration-300 ease-out hover:text-white hover:bg-bcolor"
                  >
                    <IoLogIn />

                    {trr === "ar" ? "تسجيل الدخول" : "LOGIN"}
                  </button>
                  <div className="w-full flex justify-center items-center gap-1 mb-10">
                    <input
                      checked={presiset}
                      onChange={hendelPresist}
                      type="checkbox"
                      id="rest"
                      name="rest"
                    />
                    <label htmlFor="rest" className=" font-bold ">
                      Remember me
                    </label>
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          transition={{ ease: "easeOut", duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="py-3 px-10  w-[90%] lg:w-[40%] h-[98%] overflow-y-scroll kha bg-white flex flex-col  rounded-xl"
        >
          <div className="  flex items-center  pt-2 justify-end  ">
            <IoCloseSharp
              onClick={() => setLog(false)}
              className="transition-all duration-300 text-[35px] text-[#868e96] ease-in-out hover:text-red-600 cursor-pointer hover:rotate-180 "
            />
          </div>
          <div
            className={`flex border-b pb-8 items-center gap-10 text-lg md:text-[25px] font-bold text-[#868e96]`}
          >
            <p
              onClick={() => setAuth("login")}
              className={` ${auth === "login" && "text-fcolor"} cursor-pointer`}
            >
              {trr === "ar" ? "تسجيل الدخول" : "LOGIN"}
            </p>
            <p
              onClick={() => setAuth("register")}
              className={` ${
                auth === "register" && "text-fcolor"
              } cursor-pointer`}
            >
              {trr === "ar" ? "تسجيل" : "Register"}
            </p>
          </div>
          <p className="w-full mt-5 text-center text-sm text-red-600 font-bold">
            {trr === "fr"
              ? "Veuillez entrer vos vraies informations"
              : trr === "eng"
              ? "Please enter your real information"
              : trr === "ar" && "الرجاء إدخال المعلومات الحقيقية الخاصة بك"}
          </p>
          {/* ///////////////////////////////////////////// */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 mt-5 "
          >
            <label htmlFor="firstName" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                {trr === "fr"
                  ? "Prénom"
                  : trr === "eng"
                  ? "Name"
                  : trr === "ar" && "اسم"}
              </span>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Your First Name..."
              />
            </label>
            <label htmlFor="lastName" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                {trr === "fr"
                  ? "Nom"
                  : trr === "eng"
                  ? "Last Name "
                  : trr === "ar" && "اللقب"}
              </span>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                onChange={formik.handleChange}
                value={formik.values.lastName}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Your Last Name..."
              />
            </label>
            <label htmlFor="email" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                {trr === "ar" ? "بريد إلكتروني" : "Email"} :
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={formik.handleChange}
                value={formik.values.email}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
              />
            </label>
            <label htmlFor="password" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                {trr === "fr"
                  ? "nouveau mot de passe"
                  : trr === "eng"
                  ? "New Password"
                  : trr === "ar" && "كلمة المرور الجديدة"}
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Enter your password"
              />
            </label>
            <label htmlFor="phoneNumber" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                {trr === "fr"
                  ? "Numéro de téléphone"
                  : trr === "eng"
                  ? "Phone Number"
                  : trr === "ar" && "رقم الهاتف"}
              </span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                maxLength={10}
                minLength={10}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="0776******"
              />
            </label>
            {/* <div className="flex flex-col items-center gap-5">
              <p className="block text-sm font-medium text-slate-700">
                Profile Picture :
              </p>
              <div className="flex items-center justify-center w-[80%] h-[200px] md:w-[40%] md:h-[250px] mx-auto mb-3 ">
                {loading ? (
                  <HashLoader color="#36d7b7" />
                ) : !getimage ? (
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaCloudUploadAlt className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => uploadImg(e)}
                    />
                  </label>
                ) : (
                  <div className=" relative w-full h-full rounded-xl">
                    <img
                      src={getimage}
                      alt="img"
                      className="h-full w-full object-cover  rounded-xl"
                    />
                    <button
                      onClick={deleteImage}
                      type="button"
                      className="text-white absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-cl cursor-pointer outline-none hover:shadow-xl duration-200 transition-all ease-in-out"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                )}
              </div>
            </div> */}
            <button
              className="w-full font-bold mt-2 mb-10 h-[40px] flex justify-center items-center text-lg gap-3 border  border-bcolor transition-all duration-300 ease-out hover:text-white hover:bg-bcolor"
              type="Submit"
            >
              {trr === "ar" ? "تسجيل" : "REGISTER"}
            </button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Auth;
