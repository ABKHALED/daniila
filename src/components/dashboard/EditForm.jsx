import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useUpdateProductMutation } from "../products/productApi";
import { HashLoader } from "react-spinners";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../fireBaseConfig";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
// top-[103px]
const EditForm = ({ setEdit, ele }) => {
  const [getimage, setGetImgae] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [getAllImages, setGetAllimages] = useState([]);
  const [updateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  const [im, setIm] = useState(null);

  const pp = ele._id;
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("#0000ff");
  const [gender, setGender] = useState("");
  const editItem = async (values, pro, onSubmitProps) => {
    try {
      await updateProduct(values, pro).unwrap();
      toast.success(`Product with the ID:${ele._id} was updated`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });

      //   onSubmitProps.resetForm();
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    await editItem(
      {
        ...values,
        coverImage: getimage ? getimage : ele.coverImage,
        colors: colors && colors.length > 0 ? colors : ele.colors,
        images:
          getAllImages && getAllImages.length > 0 ? getAllImages : ele.images,
        pp,
        gender: gender ? gender : ele.gender,
      },

      onSubmitProps
    );
    setEdit(false);
    setGetImgae(null);
    setGetAllimages([]);
  };
  const formik = useFormik({
    initialValues: {
      productTitle: ele.productTitle,
      descriptionAr: ele.descriptionAr,
      descriptionEn: ele.descriptionEn,
      descriptionFr: ele.descriptionFr,
      stock: ele.stock,
      price: ele.price,
      category: ele.category,
      sale: ele.sale,
      onSale: ele.onSale,
      family: ele.family,
      size: ele.size,
      brand: ele.brand,
      type: ele.type,
    },
    onSubmit: (values, onSubmitProps) => {
      handleSubmit(values, onSubmitProps);
    },
  });
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

  let conent = (
    <select
      name="category"
      id="category"
      required
      onChange={formik.handleChange}
      value={formik.values.category}
      className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
      placeholder="Product category..."
    >
      <option value="">select category</option>
      {formik.values.family === "Home" ? (
        <option value="Home">Home</option>
      ) : (
        <>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </>
      )}
    </select>
  );

  let content2;
  if (
    formik.values.category === "Clothing" &&
    (formik.values.family === "Men" || gender === "boy")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Pants">Pants</option>
        <option value="Jackets and Coats">jackets and coats</option>
        <option value="Sweatshirts">sweatshirts</option>
        <option value="Sweaters">sweaters</option>
        <option value="Shirts">shirts</option>
        <option value="Jeans">jeans</option>
        <option value="T-shirt">t-shirt</option>
        <option value="Sports Outfits">sports outfits</option>
        <option value="Underwear">underwear</option>
        <option value="Pyjamas">pyjamas</option>
        <option value="Classic Costumes">classic costumes</option>
      </select>
    );
  } else if (
    formik.values.category === "Clothing" &&
    (formik.values.family === "Women" || gender === "girl")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Pants">Pants</option>
        <option value="Jackets and Coats">jackets and coats</option>
        <option value="Sweatshirts">sweatshirts</option>
        <option value="Sweaters">sweaters</option>
        <option value="Shirts and Blouses and Blazers">
          shirts and blouses and blazers
        </option>
        <option value="Abaya">abaya</option>
        <option value="Jeans">jeans</option>
        <option value="T-shirts and Tops">t-shirts and tops</option>
        <option value="Clothing Set">clothing set</option>
        <option value="Skirts">skirts</option>
        <option value="Shorts">shorts</option>
        <option value="Trenches Coats">trenches coats</option>
        <option value="Robes Hijab">shorts</option>
        <option value="Underwear">underwear</option>
        <option value="Pyjamas">pyjamas</option>
        <option value="Luxury">luxury</option>
      </select>
    );
  } else if (
    formik.values.category === "Shoes" &&
    (formik.values.family === "Men" || gender === "boy")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Sneakers">Sneakers</option>
        <option value="City Shoes">City shoes</option>
        <option value="Sports Shoes">Sports shoes</option>
        <option value="Moccasins">moccasins</option>
        <option value="Mules and Flip-flops">mules and flip-flops</option>
        <option value="Sandals">Sandals</option>
      </select>
    );
  } else if (
    formik.values.category === "Shoes" &&
    (formik.values.family === "Women" || gender === "girl")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Sneakers">Sneakers</option>
        <option value="Sports Shoes">Sports shoes</option>
        <option value="Moccasins">moccasins</option>
        <option value="Pumps Heels">pumps heels</option>
        <option value="Sandals">Sandals</option>
        <option value="Mules and Clogs">mules and clogs</option>
      </select>
    );
  } else if (
    formik.values.category === "Accessories" &&
    (formik.values.family === "Women" || gender === "girl")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Watches">Watches</option>
        <option value="Glasses">glasses</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Bags">Bags</option>
        <option value="Scarves">scarves</option>
        <option value="Hats, Beanies & Caps">Hats, beanies & caps</option>
      </select>
    );
  } else if (
    formik.values.category === "Home" &&
    formik.values.family === "Home"
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Decoration">Dicoration</option>
        <option value="Curtains">Curtains</option>
        <option value="Carpets and Rugs">Carpets and Rugs</option>
        <option value="Bedding">Bedding</option>
        <option value="Lighting Fixtures">Lighting Fixtures</option>
      </select>
    );
  } else if (
    formik.values.category === "Accessories" &&
    (formik.values.family === "Men" || gender === "boy")
  ) {
    content2 = (
      <select
        name="type"
        id="type"
        required
        onChange={formik.handleChange}
        value={formik.values.type}
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
        placeholder="sub category..."
      >
        <option value="">select category</option>
        <option value="Watches">Watches</option>
        <option value="Glasses">glasses</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Wallets">wallets</option>
        <option value="Hats, Beanies & Caps">Hats, beanies & caps</option>
      </select>
    );
  }
  return (
    <div className="w-full h-full  z-[100000000] fixed top-0 flex justify-center items-center bg-[#00000085] left-0    px-3 md:px-9  ">
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className=" relative w-[95%] p-5  overflow-y-scroll kha rounded-lg h-[95%] bg-white"
      >
        <div
          className=" absolute top-5  right-5 text-[30px]  transition-all duration-300 ease-in-out hover:text-fcolor cursor-pointer hover:rotate-[180deg]"
          onClick={() => setEdit(false)}
        >
          <FaXmark />
        </div>
        <h1 className=" text-fcolor text-center text-[24px] font-bold mb-5 ">
          Edit your Product
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full h-full flex flex-col gap-4 p-4"
        >
          <div
            className={`${
              formik.values.family === "Child"
                ? "w-full grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-300 ease-in-out"
                : "w-full grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300 ease-in-out"
            } `}
          >
            <label htmlFor="productTitle" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product Title
              </span>
              <input
                type="text"
                name="productTitle"
                id="productTitle"
                onChange={formik.handleChange}
                value={formik.values.productTitle}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Product title..."
              />
            </label>
            <label htmlFor="family" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Family
              </span>
              <select
                name="family"
                id="family"
                required
                onChange={formik.handleChange}
                value={formik.values.family}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
                placeholder="Product family..."
              >
                <option value="">Select product family</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Child">Child</option>
                <option value="Home">Home</option>
              </select>
            </label>
            {formik.values.family === "Child" && (
              <label htmlFor="gender" className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-white">
                  girl/Boy
                </span>
                <select
                  name="gender"
                  id="gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
                  placeholder="Product family..."
                >
                  <option value="Boy">Boy</option>
                  <option value="girl">girl</option>
                </select>
              </label>
            )}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
            <label htmlFor="category" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product Category
              </span>
              {/* <select
                name="category"
                id="category"
                required
                onChange={formik.handleChange}
                value={formik.values.category}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
                placeholder="Product category..."
              >
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Shoos">Shoos</option>
              </select> */}
              {conent}
            </label>
            <label htmlFor="type" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium ">
                Product Sub Category
              </span>
              {/* <select
                  name="category"
                  id="category"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 cursor-pointer"
                  placeholder="Product category..."
                >
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Shoos">Shoos</option>
                </select> */}
              {content2 ? (
                content2
              ) : (
                <div className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1 ">
                  Please select category
                </div>
              )}
            </label>
            <label htmlFor="size" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product Size
              </span>
              <input
                type="text"
                name="size"
                id="size"
                onChange={formik.handleChange}
                value={formik.values.size}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Product title..."
              />
            </label>
            <label htmlFor="brand" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product brand
              </span>
              <input
                type="text"
                name="brand"
                id="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                required
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Product brand..."
              />
            </label>
          </div>

          <div className="w-full grid grid-cols-1 h-[100px] md:grid-cols-3 gap-5">
            <label htmlFor="" className="block h-full ">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-white">
                Product color
              </span>
              <div className="flex items-center justify-between h-full">
                <input
                  type="color"
                  name="color"
                  id="color"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  required
                  // className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                  className="w-[100px] h-[50px] mt-1 cursor-pointer"
                />
                <div
                  onClick={() => setColors((prev) => [...prev, color])}
                  className="w-[150px] h-[40px] cursor-pointer flex justify-center items-center text-xl rounded-md bg-white text-black"
                >
                  Add color
                </div>
              </div>
            </label>
            <div className=" w-full h-full bg-white flex  gap-3 p-2 text-lg font-bold ">
              {colors.length > 0
                ? [...new Set(colors)].map((ele, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          setColors((prev) => prev.filter((el) => ele !== el))
                        }
                        className={`w-[40px] h-[40px] rounded-md cursor-pointer`}
                        style={{ backgroundColor: ele }}
                      ></div>
                    );
                  })
                : "No color selected"}
            </div>
            <div className=" w-full h-full bg-white flex  gap-3 p-2 text-lg font-bold ">
              {ele.colors.map((el, i) => {
                return (
                  <div
                    key={i}
                    className={`w-[40px] h-[40px] rounded-md `}
                    style={{ backgroundColor: el }}
                  ></div>
                );
              })}
            </div>
          </div>
          <label htmlFor="descriptionAr" className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
              Product Description AR
            </span>
            <textarea
              name="descriptionAr"
              id="descriptionAr"
              onChange={formik.handleChange}
              value={formik.values.descriptionAr}
              required
              className="mt-1 px-3 py-2 w-full h-[150px] resize-none bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  rounded-md sm:text-sm focus:ring-1"
              placeholder="Product title..."
            />
          </label>
          <label htmlFor="descriptionFr" className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
              Product Description FR
            </span>
            <textarea
              name="descriptionFr"
              id="descriptionFr"
              onChange={formik.handleChange}
              value={formik.values.descriptionFr}
              required
              className="mt-1 px-3 py-2 w-full h-[150px] resize-none bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  rounded-md sm:text-sm focus:ring-1"
              placeholder="Product title..."
            />
          </label>
          <label htmlFor="descriptionEn" className="block mt-5">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
              Product Description EN
            </span>
            <textarea
              name="descriptionEn"
              id="descriptionEn"
              onChange={formik.handleChange}
              value={formik.values.descriptionEn}
              required
              className="mt-1 px-3 py-2 w-full h-[150px] resize-none bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  rounded-md sm:text-sm focus:ring-1"
              placeholder="Product title..."
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col  gap-5">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
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
            <div className="flex flex-col  gap-5">
              <span className=" block text-lg font-medium text-black">
                Old cover image
              </span>
              <div className="w-full h-[250px]  md:h-[300px] relative">
                <img
                  src={ele.coverImage}
                  alt=""
                  className=" absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* //////////////////////////////// */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col  gap-5">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product Images
              </span>
              <div className="flex items-center justify-center w-full h-[250px]  md:h-[300px] mx-auto mb-3 ">
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
            <div className="flex flex-col  gap-5">
              <span className=" block text-lg font-medium text-black">
                Old product images
              </span>
              <div className="w-full h-full flex flex-wrap gap-3 justify-center overflow-y-auto">
                <div className="w-full h-full flex flex-wrap gap-3  overflow-y-auto">
                  {ele.images.map((ele) => {
                    return (
                      <div
                        key={ele}
                        className="w-[120px] h-[120px] border rounded-lg relative group transition-all duration-300 ease-in-out"
                      >
                        <img
                          src={ele}
                          alt="img"
                          className="h-full w-full object-cover  rounded-xl"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <label htmlFor="Price" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product Price
              </span>
              <input
                type="text"
                name="price"
                id="Price"
                required
                onChange={formik.handleChange}
                value={formik.values.price}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Product Price..."
              />
            </label>
            <label htmlFor="Stock" className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg font-medium text-black">
                Product In Stock
              </span>
              <input
                type="text"
                name="stock"
                id="Stock"
                required
                onChange={formik.handleChange}
                value={formik.values.stock}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Product In Stock..."
              />
            </label>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <label
              htmlFor="onSale"
              className="flex justify-start items-center gap-3"
            >
              <input
                type="checkbox"
                name="onSale"
                id="onSale"
                onChange={formik.handleChange}
                checked={formik.values.onSale}
              />

              <span className=" block text-lg font-medium text-black">
                Product on sale
              </span>
            </label>
            <AnimatePresence mode="wait" key={1}>
              {formik.values.onSale && (
                <motion.label
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  htmlFor="Stock"
                  className="block"
                >
                  <span className=" block text-lg font-medium text-black">
                    sale percentage %
                  </span>
                  <input
                    type="text"
                    name="sale"
                    id="sale"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.sale}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-fcolor placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="sale percentage %..."
                  />
                </motion.label>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-center items-center pb-5">
            <button
              type="submit"
              className="w-[250px] font-bold rounded-lg mt-5  h-[60px] flex justify-center items-center text-lg gap-3 border  border-bcolor transition-all duration-300 ease-out hover:text-white hover:bg-bcolor"
            >
              EDIR PRODUCT
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditForm;
