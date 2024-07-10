import React, { FC } from "react";
import { convertBytes } from "../../utils/conversion";

type UsageItem = {
  label: string;
  color: string;
  value: number;
};

type UsageBarProps = {
  showLabels?: boolean;
  totalValue: number;
  items: UsageItem[];
};

const UsageBar: FC<UsageBarProps> = ({
  showLabels = true,
  items,
  totalValue,
}) => {
  // Calculate widths for each item
  const calculateWidth = (value: number) => `${(value / totalValue) * 100}%`;

  // Calculate remaining space
  const usedSpace = items.reduce((acc, item) => acc + item.value, 0);
  const remainingSpace = totalValue - usedSpace;

  return (
    <div className="rounded-md p-4 shadow-md w-full lg:w-10/12 md:w-6/12 bg-white">
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-semibold">Disk Usage {usedSpace > totalValue ? <span className="text-red-500 text-xs">Overusage</span>: null}</h2>
        <span className={usedSpace > totalValue ? "text-red-500" : ""}>
          Used: {convertBytes(usedSpace)}/{convertBytes(totalValue)}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-md overflow-hidden flex mb-2">
        {items
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div
              key={index}
              className={`h-full ${item.color} hover:cursor-pointer`}
              style={{ width: calculateWidth(item.value) }}
              title={`${item.label}: ${convertBytes(item.value)}`}
            ></div>
          ))}
        <div
          className={`h-full bg-gray-300 w-[${
            (remainingSpace / totalValue) * 100
          }%]`}
          title={`Remaining: ${remainingSpace}`}
        ></div>
      </div>
      {showLabels && (
        <ul className="flex gap-2 justify-start lg:flex-row flex-col">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
              {item.label} {convertBytes(item.value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsageBar;
