import React, { FC, ReactElement, useState } from "react";

type Tab = {
  label: string;
  content?: ReactElement;
};

const Tabs: FC<{ children: Tab[] }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md">
      <div className="w-full flex gap-2 px-2 border-b-[1px]">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={
              activeTab === index
                ? "px-4 py-2 border-b-[#F13E5F] border-b-2 font-bold border-t-2 border-t-transparent"
                : "px-4 py-2 font-bold border-b-2 border-transparent border-t-2 border-t-transparent hover:border-b-[#F13E5F] hover:cursor-pointer"
            }
          >
            {child.label}
          </button>
        ))}
      </div>
      <div className="flex flex-row">
        {children[activeTab].content}
      </div>
    </div>
  );
};

export default React.memo(Tabs);
