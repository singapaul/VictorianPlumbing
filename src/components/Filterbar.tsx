import { ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import scrollToTop from "../utils/scrollToTop";

type FilterbarProps = {
  children: ReactNode;
};

function Filterbar({ children }: FilterbarProps) {
  const [show, setShow] = useState(true);

  const toggleContainer = () => {
    setShow(!show);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-col md:justify-between md:w-1/4 bg-gray-200 p-4 sticky top-0 h-content md:h-screen gap-4">
      <Button
        label={show ? "Hide Menu" : "Show Menu"}
        type="button"
        onClick={toggleContainer}
        variant="toggle"
      />

      {show && children}
      <Button label="Scroll to top" type="button" onClick={scrollToTop} />
    </div>
  );
}

export default Filterbar;
