import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { storage } from "../../fireBaseConfig";
import { HashLoader } from "react-spinners";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSpacailMutation } from "../../components/info/infoApiSlice";
import { toast } from "react-toastify";
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
const SPfromYou = () => {
  const [spacail, { isLoading }] = useSpacailMutation();
  const trr = useSelector((state) => state.tran.tran);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [addr, setAddr] = useState("");
  const [msg, setMsg] = useState("");
  const [getAllImages, setGetAllimages] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [im, setIm] = useState(null);
  const [size, setSize] = useState("");
  const [quin, setQuin] = useState("");
  useEffect(() => {
    if (im) {
      All();
    }
  }, [im]);

  const All = async () => {
    if (im) {
      setLoading2(true);
      for (let i = 0; i < im.length; i++) {
        const storageRef = ref(storage, `Images/${Date.now()}-${im[i].name}`);
        const uploadTask = uploadBytesResumable(storageRef, im[i]);
        uploadTask.on(
          "state_changed",
          (snapshote) => {},
          (error) => {
            setLoading2(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((res) => {
              setLoading2(false);
              setGetAllimages((prev) => [...prev, res]);

              setIm(null);
            });
          }
        );
      }
    }
  };
  const deleteImages = () => {
    setLoading2(true);
    const deleteRef = ref(storage, getAllImages);
    deleteObject(deleteRef).then(() => {
      setGetAllimages([]);
      setLoading2(false);
    });
  };
  const sendInfo = async (ele) => {
    try {
      if (
        first &&
        last &&
        num &&
        city &&
        addr &&
        msg &&
        getAllImages &&
        size &&
        quin
      ) {
        await spacail({
          productInfo: {
            size: size,
            stock: quin,
          },
          userInfo: {
            first: first,
            last: last,
            num: num,
            email: email,
            city: city,
            addr: addr,
          },
          changes: msg,
          Images: getAllImages,
          cus: "your",
        });
        toast.success(`your Order was placed`, {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });

        setFirst("");
        setLast("");
        setEmail("");
        setNum("");
        setCity("");
        setAddr("");
        setMsg("");
        setGetAllimages([]);
        setSize("");
        setQuin("");
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
        <p className="text-[30px] text-center mt-5 text-fcolor font-extrabold">
          {trr === "fr"
            ? "Informations sur le produit:"
            : trr === "eng"
            ? "Product information:"
            : trr === "ar" && ":معلومات المنتج"}
        </p>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="w-full flex flex-col gap-2">
              <p className=" font-extrabold">
                {trr === "fr"
                  ? "Taille :"
                  : trr === "eng"
                  ? "Size :"
                  : trr === "ar" && ":مقاس"}
              </p>
              <input
                type="text"
                onChange={(e) => setSize(e.target.value)}
                value={size}
                required
                className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                placeholder="S/M/L/XL/36/38/40/42...."
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className=" font-extrabold">
                {trr === "fr"
                  ? "Quantité :"
                  : trr === "eng"
                  ? "Quantity :"
                  : trr === "ar" && ": كمية"}
              </p>
              <input
                type="text"
                onChange={(e) => setQuin(e.target.value)}
                value={quin}
                required
                className=" px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                placeholder="..."
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <p className=" font-extrabold">
            {trr === "fr"
              ? "Images de Produits :"
              : trr === "eng"
              ? "Product Images :"
              : trr === "ar" && ": صور المنتج"}
          </p>
          <div className="flex items-center justify-center w-full h-[250px]  md:h-[300px] mx-auto mt-3 ">
            {/* className="flex items-center justify-center w-full h-[250px]  md:h-[300px] mx-auto mb-3 "> */}
            {loading2 ? (
              <HashLoader color="#36d7b7" />
            ) : getAllImages.length < 1 ? (
              <label
                htmlFor="all-img"
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
                  id="all-img"
                  accept="image/*"
                  type="file"
                  required
                  className="hidden"
                  onChange={(e) => setIm(e.target.files)}
                  multiple
                />
              </label>
            ) : (
              <div className=" relative w-full h-full border p-3 rounded-xl bg-white">
                <div className="w-full h-full flex flex-wrap gap-3 justify-center overflow-y-auto">
                  {getAllImages.map((ele) => {
                    return (
                      <div
                        key={ele}
                        className="w-[120px] h-[120px] rounded-lg relative group transition-all duration-300 ease-in-out"
                      >
                        <img
                          src={ele}
                          alt="img"
                          className="h-full w-full object-cover  rounded-xl"
                        />
                      </div>
                    );
                  })}
                  <button
                    onClick={deleteImages}
                    type="button"
                    className="text-white absolute right-3 bottom-3 p-3 rounded-full bg-red-500 text-xl  cursor-pointer outline-none hover:shadow-xl duration-200 transition-all ease-in-out"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5  border-b pb-3">
          <p className=" font-extrabold">
            {trr === "fr"
              ? "Dites-nous plus sur ce que vous voulez dans votre produit et ce que vous souhaitez modifier, comme les couleurs, les tailles et les tissus avec lesquels vous souhaitez travailler."
              : trr === "eng"
              ? "Tell us more about what you want in your product and what you want to change, such as the colors, sizes and fabrics you want to work with."
              : trr === "ar" &&
                "أخبرنا المزيد عن ما تريده في منتجك وما تريد تغييره، مثل الألوان والأحجام والأقمشة التي تريد العمل بها."}
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

        <div
          onClick={() => sendInfo()}
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

export default SPfromYou;
