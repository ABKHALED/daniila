import React, { useEffect } from "react";
import {
  Hero,
  NewProducts,
  Sold,
  Caty,
  Bestseler,
  Features,
  ProductSale,
} from "../components/index";
import { useLocation } from "react-router-dom";

function Home({ setLog, trr }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="mb-[70px] ">
      <Hero />
      <Caty />
      <NewProducts setLog={setLog} />
      <Sold />
      <ProductSale />
      <Features />
      <Bestseler />
    </div>
  );
}

export default Home;
