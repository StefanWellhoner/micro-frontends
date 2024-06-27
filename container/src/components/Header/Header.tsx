import React from "react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <nav className="flex w-full bg-[#F13E5F] h-16">
      <div className="flex-1 content-center justify-center self-center">
        <h1 className="text-white text-2xl text-center">Micro-frontends</h1>
      </div>
    </nav>
  );
};

Header.displayName = "Header";

export default Header;
