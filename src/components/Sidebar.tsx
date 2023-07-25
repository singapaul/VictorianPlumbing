import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
  showSidebar: boolean;
  handleClose: () => void;
};

const Sidebar = ({ children, showSidebar, handleClose }: SidebarProps) => {
  return (
    <div
      className={`top-0 left-0 w-[80vw] sm:w-[35vw] bg-blue-600  p-10 pr-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
        showSidebar ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <button onClick={handleClose}>X</button>
      {children}
    </div>
  );
};

export default Sidebar;
