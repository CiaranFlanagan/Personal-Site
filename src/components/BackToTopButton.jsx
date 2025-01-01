import { useEffect, useState } from "react";

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
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "2px solid red", // Added border for visibility
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1000, // Ensure it is above other content
          }}
        >
          Back to Top
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
