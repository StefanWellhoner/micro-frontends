import React from "react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="flex fixed bottom-0 w-full bg-[#333d51] h-16">
      <div className="flex-1 content-center justify-center self-center">
        <h1 className="text-white text-center">Footer</h1>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default React.memo(Footer);
