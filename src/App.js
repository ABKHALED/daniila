import { useEffect, useState } from "react";
import Auth from "./components/auth/Auth";
import { AddProduct, DashFirst, Footer, SubNavbar } from "./components/index";

import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrsistLogin from "./components/auth/PrsistLogin";

// import Home from "./pages/Home";

import RequireAuth from "./components/auth/RequireAuth";
import EditProduct from "./components/dashboard/EditProduct";
import EditForm from "./components/dashboard/EditForm";
import DeletProduct from "./components/dashboard/DeletProduct";
import { useDispatch, useSelector } from "react-redux";
import ProductOverlay from "./components/products/ProductOverlay";
import ProductInfo from "./components/products/ProductInfo";
import {
  Shope,
  Home,
  FemmelFirst,
  WishLiset,
  Cart,
  Men,
  Kids,
  Contact,
  Orders,
  AboutUs,
  Profile,
  HomeT,
} from "./pages/index";
import Search from "./components/products/Search";
import CheckOut from "./pages/CheckOut";
import OrderDash from "./components/dashboard/OrderDash";
import NewsDash from "./components/dashboard/NewsDash";
import HeroDash from "./components/dashboard/HeroDash";

import Up from "./components/Up";
import { opOver } from "./app/api/productOverlay";
import Spfirst from "./pages/spacileOrders/Spfirst";

const ROLES = {
  Manager: "customer",
  Admin: "admin",
};
function App() {
  const trr = useSelector((state) => state.tran.tran);
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (trr === "ar") {
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else if (trr === "fr") {
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "fr");
    } else if (trr === "eng") {
      document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "eng");
    }
  }, [trr]);
  const [log, setLog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ele, setEle] = useState(null);
  const [search, setSearch] = useState(false);
  const { proOver, proId } = useSelector((state) => state.proOver);
  const [sh, setSh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setSh(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {sh && (
          <motion.div
            ransition={{ duration: 1, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="App relative h-fit overflow-hidden"
          >
            <Up sh={sh} />
            <ToastContainer />
            <AnimatePresence mode="wait">
              {log ? <Auth setLog={setLog} /> : ""}
              {edit && <EditForm setEdit={setEdit} ele={ele} />}
              {proOver && <ProductOverlay id={proId} setLog={setLog} />}
            </AnimatePresence>
            <SubNavbar />
            <Search search={search} setSearch={setSearch} />
            <PrsistLogin setLog={setLog} setSearch={setSearch} />
            <Routes>
              <Route path="/">
                <Route index element={<Home setLog={setLog} />} />
                <Route path="shop" element={<Shope setLog={setLog} />} />
                <Route path="AboutUs" element={<AboutUs />} />
                <Route path="ContactUs" element={<Contact />} />
                <Route
                  path="WishLiset"
                  element={<WishLiset setLog={setLog} />}
                />
                <Route path="Cart" element={<Cart setLog={setLog} />} />
                <Route path="CheckOut" element={<CheckOut setLog={setLog} />} />
                <Route path="Order" element={<Orders setLog={setLog} />} />
                <Route path="Profile" element={<Profile setLog={setLog} />} />
                <Route path="Home" element={<HomeT setLog={setLog} />} />
              </Route>
              <Route path="Vip/*" element={<Spfirst setLog={setLog} />} />
              <Route path="/Men" element={<Men setLog={setLog} />}></Route>
              <Route path="/Women">
                <Route index element={<FemmelFirst setLog={setLog} />} />
              </Route>

              <Route path="/kids" element={<Kids setLog={setLog} />}></Route>
              <Route
                path="productInformation/:id"
                element={<ProductInfo setLog={setLog} />}
              />
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="dashbored">
                  <Route index element={<DashFirst />} />
                  <Route path="addProduct" element={<AddProduct />} />
                  <Route
                    path="editProduct"
                    element={<EditProduct setEdit={setEdit} setEle={setEle} />}
                  />
                  <Route
                    path="deletProduct"
                    element={<DeletProduct setEdit={setEdit} setEle={setEle} />}
                  />
                  <Route
                    path="orderProducts"
                    element={<OrderDash setEdit={setEdit} setEle={setEle} />}
                  />
                  <Route
                    path="News"
                    element={<NewsDash setEdit={setEdit} setEle={setEle} />}
                  />
                  <Route
                    path="Hero"
                    element={<HeroDash setEdit={setEdit} setEle={setEle} />}
                  />
                </Route>
              </Route>
            </Routes>
            <Footer setLog={setLog} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
