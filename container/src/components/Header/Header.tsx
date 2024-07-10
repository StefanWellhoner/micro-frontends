import React from "react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <nav className="flex w-full bg-white h-16 content-center justify-center items-center px-6 shadow-md">
      <div className="font-semibold">{"Back"}</div>
      <div className="flex-1">
        <h1 className="font-bold text-center">Disk Usage</h1>
        <h2 className="text-sm text-center">domain@example.com</h2>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-semibold lg:block md:block sm:block hidden">John Doe</h2>
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
    </nav>
  );
};

Header.displayName = "Header";

export default React.memo(Header);
