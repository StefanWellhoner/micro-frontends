import React from "react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="flex fixed bottom-0 w-full bg-blue-600 h-16">
      <div className="flex-1 content-center justify-center self-center">
        <h1 className="text-white text-2xl text-center">Footer</h1>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
