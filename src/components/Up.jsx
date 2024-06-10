import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function Up() {
  const [up, setUp] = useState(false);
  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 1150) {
      setUp(true);
    } else {
      setUp(false);
    }
  });

  return (
    <>
      <AnimatePresence>
        {up && (
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="fixed z-[1000] cursor-pointer bg-fcolor text-[20px] text-white right-5 bottom-5 animate-bounce flex justify-center items-center w-[40px] h-[40px] rounded-md"
          >
            <FaArrowUp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Up;
