import { ReactNode } from "react";
import Button from "./Button";
import scrollToTop from "../utils/scrollToTop";

type FilterbarProps = {
  children: ReactNode;
};

function Filterbar({ children }: FilterbarProps) {

  return (
    <div className="flex md:flex-col md:justify-between md:w-1/4 bg-gray-200 p-4 sticky top-0 h-24 md:h-screen">
      {children}
      <Button label="Scroll to top" type="button" onClick={scrollToTop} />
    </div>
  );
}

export default Filterbar;
