import React, { ReactNode } from "react";

type ProductGridProps = {
  children: ReactNode;
};

const ProductGrid = ({ children }: ProductGridProps) => {
  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14">
      {children}
    </div>
  );
};

export default ProductGrid;
