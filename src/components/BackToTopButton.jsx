import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {backToTopButton && (
        <motion.button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "2px solid white",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          Back to Top
        </motion.button>
      )}
    </>
  );
};

export default BackToTopButton;
