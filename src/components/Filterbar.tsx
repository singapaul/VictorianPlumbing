import { ReactNode } from "react";

type FilterbarProps = {
  children: ReactNode;

};

function Filterbar({ children }: FilterbarProps) {
  return (
    <div className="md:w-1/4 bg-gray-200 p-4 sticky top-0 h-24 md:h-screen">
      {children}
    </div>
  );
}

export default Filterbar;
