import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImgOverlay from "./ImgOverlay";
import DashbordNav from "./DashbordNav";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../fireBaseConfig";
import { useGatsubMutation, useSendSubMutation } from "../info/infoApiSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const NewsDash = () => {
  const showfull = useSelector((state) => state.shape.shape);

  const [loading, setLoading] = useState(false);
  const [getimage, setGetImgae] = useState("");
  const [text, setText] = useState("");
  const [subject, setSbject] = useState("");
  const [im, setIm] = useState(false);
  const [us, setUs] = useState(null);
  const [gatsub, { isLoading2 }] = useGatsubMutation();
  const [sendSub, { isLoading3 }] = useSendSubMutation();
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
  const get = async () => {
    try {
      const s = await gatsub().unwrap();
      setUs(s);
    } catch (err) {}
  };
  useEffect(() => {
    get();
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sendEmail = async (e) => {
    setIm(true);
    try {
      if (us) {
        if (getimage !== "" && text !== "" && subject !== "") {
          for (let i = 0; i < us.length; i++) {
            await sendSub({
              subject: subject,
              img: getimage,
              text: text,
              to: us[i].email,
            }).unwrap();
          }
          setSbject("");
          setText("");
          setGetImgae("");
          toast.success(`Email Send`, {
            position: "top-center",
            theme: "dark",
            autoClose: 2000,
          });
        }
        setIm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`px-3  relative z-[100] ${
        showfull ? "ps-[200px]" : "md:ps-[50px] ps-[35px]"
      } h-full pt-[103px] transition-all duration-300 ease-in-out`}
    >
      {im && (
        <div className=" fixed top-0 left-0 w-[100%] h-[100%] z-[1000] flex justify-center items-center bg-[#000000ba]">
          <div className=" relative w-[300px] h-[300px] rounded-lg bg-white flex justify-center items-center">
            <HashLoader color="#36d7b7" />
          </div>
        </div>
      )}
      <ImgOverlay />
      <DashbordNav />
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className=" relative w-full h-full "
      >
        <h1 className="text-white mt-5 text-[28px] sm:text-[35px] md:text-[50px] text-center font-bold">
          Send email
        </h1>
        <form className="flex flex-col gap-5 md:w-[50%] w-full mx-auto mt-[30px]">
          <label htmlFor="productTitle" className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-white">
              Email Subject
            </span>
            <input
              type="text"
              name="productTitle"
              id="productTitle"
              onChange={(e) => setSbject(e.target.value)}
              value={subject}
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Email Subject"
            />
          </label>
          <label htmlFor="description" className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-white">
              Email Text
            </span>
            <textarea
              name="description"
              id="description"
              onChange={(e) => setText(e.target.value)}
              value={text}
              required
              className="mt-1 px-3 py-2 w-full h-[150px] resize-none bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  rounded-md sm:text-sm focus:ring-1"
              placeholder="Email Text..."
            />
          </label>
          <div className="flex flex-col  gap-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-white">
              Cover picture
            </span>
            <div className="flex items-center justify-center w-full h-[250px]  md:h-[300px] mx-auto mb-3 ">
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
                    required
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
          </div>
          <div
            onClick={() => sendEmail()}
            className="w-[200px] cursor-pointer mx-auto font-bold mt-5 mb-10 h-[50px] flex justify-center items-center text-xl gap-3 border text-fcolor rounded-lg  border-white hover:border-fcolor bg-white transition-all duration-300 ease-out hover:text-white hover:bg-fcolor"
          >
            Send Email
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewsDash;
