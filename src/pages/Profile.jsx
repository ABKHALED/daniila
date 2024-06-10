import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../assets/12085270_20944095.jpg";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../fireBaseConfig";
import { HashLoader } from "react-spinners";
import { MdDeleteForever } from "react-icons/md";
import {
  useModiMutation,
  useRefreshMutation,
} from "../components/auth/authApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Profile() {
  const { _id, firstName, lastName, email, phoneNumber, picturePath } =
    useAuth();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [getimage, setGetImgae] = useState("");
  const [password, setPassord] = useState("");
  const [loading, setLoading] = useState(false);
  const [modi, { isLoading }] = useModiMutation();
  const navigate = useNavigate();
  const [refresh, { isUninitialized, isLoading3, isSuccess4, isError, error }] =
    useRefreshMutation();
  const trr = useSelector((state) => state.tran.tran);
  const uploadImg = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshote) => {},
      (error) => {
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((res) => {
          setLoading(false);
          setGetImgae(res);
        });
      }
    );
  };
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, getimage);
    deleteObject(deleteRef).then(() => {
      setGetImgae(null);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!_id) {
      navigate("/");
    }
  }, [_id]);

  const mo = async () => {
    try {
      await modi({
        firstName: first,
        lastName: last,
        password: password,
        picturePath: getimage,
        phoneNumber: phone,
        id: _id,
      }).unwrap();
      toast.success(`Your data have been updated`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
      setFirst("");
      setGetImgae("");
      setLast("");
      setPassord("");
      setPhone("");
      await refresh();
    } catch (err) {
      console.log(err);
    }
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {_id && (
        <div className="px-3 md:px-9 w-full mt-[115px] mb-[70px]">
          <div className="pt-[30px]">
            <div className="flex  w-full gap-4 items-center  justify-center relative">
              <div className=" absolute top-[50%] translate-y-[-50%] w-full bg-fcolor left-0 h-[4px] "></div>
              <div className="w-[200px] h-[200px] bg-white rounded-full  relative border-[4px] border-fcolor">
                {picturePath ? (
                  <>
                    <div className=" w-full h-full flex justify-center items-center text-[22px] font-extrabold text-white absolute  top-0 left-0 rounded-full bg-[#00000067] opacity-100 md:opacity-0 transition-all duration-300 ease-in-out hover:opacity-100">
                      {trr === "fr"
                        ? "Changer l'image"
                        : trr === "eng"
                        ? "Change picture"
                        : trr === "ar" && "تغيير الصورة"}
                    </div>
                    <img
                      src={picturePath}
                      alt=""
                      className="w-full h-full object-cover rounded-full "
                    />
                    {!getimage ? (
                      <label
                        htmlFor="dropzone-file"
                        className="flex absolute top-0 left-0  items-center justify-center w-full h-full  border-dashed rounded-full cursor-pointer bg-transparent"
                      >
                        <div className="w-full h-full   text-fcolor rounded-full flex justify-center items-center cursor-pointer text-[50px] font-extrabold relative">
                          <div className=" w-full h-full flex justify-center items-center text-[22px] font-extrabold text-white absolute  top-0 left-0 rounded-full bg-[#00000067] opacity-100 md:opacity-0 transition-all duration-300 ease-in-out hover:opacity-100">
                            Edite picture
                          </div>
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
                      <div className=" absolute top-0 left-0 w-full h-full rounded-full">
                        <img
                          src={getimage}
                          alt="img"
                          className="h-full w-full object-cover  rounded-full"
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
                  </>
                ) : (
                  <div className="flex items-center justify-center  w-full h-full rounded-full ">
                    {loading ? (
                      <HashLoader color="#36d7b7" />
                    ) : !getimage ? (
                      <label
                        htmlFor="dropzone-file"
                        className="flex  items-center justify-center w-full h-full  border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="w-full h-full  bg-white text-fcolor rounded-full flex justify-center items-center cursor-pointer text-[50px] font-extrabold relative">
                          <div className=" w-full h-full flex justify-center items-center text-[22px] font-extrabold text-white absolute top-0 left-0 rounded-full bg-[#00000067] opacity-100 md:opacity-0 transition-all duration-300 ease-in-out hover:opacity-100">
                            {trr === "fr"
                              ? "Ajouter une photo"
                              : trr === "eng"
                              ? " Add picture"
                              : trr === "ar" && "إضافة صورة"}
                          </div>
                          <FaUserAlt />
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
                      <div className=" relative w-full h-full rounded-full">
                        <img
                          src={getimage}
                          alt="img"
                          className="h-full w-full object-cover  rounded-full"
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
                )}
              </div>
            </div>
            <div className="mt-[70px] grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className=" w-full p-4 rounded-md bg-gray-100">
                <div>
                  <h1 className=" text-[25px] font-extrabold text-fcolor flex items-center gap-5">
                    {trr === "fr"
                      ? "Prénom"
                      : trr === "eng"
                      ? "Name"
                      : trr === "ar" && "اسم"}{" "}
                    :
                    <p className=" text-black text-[18px] flex h-full items-center">
                      {firstName}
                    </p>
                  </h1>
                  <input
                    type="text"
                    onChange={(e) => setFirst(e.target.value)}
                    value={first}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Your First Name..."
                  />
                </div>
                <div className="mt-3">
                  <h1 className=" text-[25px] font-extrabold text-fcolor flex items-center gap-5">
                    {trr === "fr"
                      ? "Nom"
                      : trr === "eng"
                      ? "Last Name "
                      : trr === "ar" && "اللقب"}
                    :
                    <p className=" text-black text-[18px] flex h-full items-center">
                      {lastName}
                    </p>
                  </h1>
                  <input
                    type="text"
                    onChange={(e) => setLast(e.target.value)}
                    value={last}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Your Last Name..."
                  />
                </div>
                <div className="mt-3">
                  <h1 className=" text-[25px] font-extrabold text-fcolor">
                    {trr === "ar" ? "بريد إلكتروني" : "Email"} :
                  </h1>

                  <div className="mt-1 px-3 py-2 opacity-50 bg-white border shadow-sm border-fcolor placeholder-slate-400   block w-full rounded-md sm:text-sm ">
                    {email}
                  </div>
                </div>
                <div className="mt-3">
                  <h1 className=" text-[25px] font-extrabold text-fcolor flex items-center gap-5">
                    {trr === "fr"
                      ? "nouveau mot de passe"
                      : trr === "eng"
                      ? "New Password"
                      : trr === "ar" && "كلمة المرور الجديدة"}
                    :
                  </h1>
                  <input
                    onChange={(e) => setPassord(e.target.value)}
                    value={password}
                    type="password"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Password..."
                  />
                </div>
                <div className="mt-3">
                  <h1 className=" text-[25px] font-extrabold text-fcolor flex items-center gap-5">
                    {trr === "fr"
                      ? "Numéro de téléphone"
                      : trr === "eng"
                      ? "Phone Number"
                      : trr === "ar" && "رقم الهاتف"}
                    :
                    <p className=" text-black text-[18px] flex h-full items-center">
                      {phoneNumber.slice(0, 4)}----{phoneNumber.slice(8, 10)}
                    </p>
                  </h1>

                  <input
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    maxLength={10}
                    minLength={10}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Phone Number..."
                  />
                </div>
                <div
                  onClick={() => mo()}
                  className="w-full h-[50px] flex justify-center items-center bg-fcolor text-white mt-10 text-[25px] font-extrabold border cursor-pointer rounded-md border-fcolor hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-300 ease-in-out"
                >
                  {trr === "fr"
                    ? "modifié"
                    : trr === "eng"
                    ? " Change"
                    : trr === "ar" && "تغير"}
                </div>
              </div>

              <div className=" w-full h-full">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
