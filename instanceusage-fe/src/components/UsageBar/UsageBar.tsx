import React, { FC, useEffect } from "react";
import { convertBytes } from "../../utils/conversion";
import { instance } from "../../data/instance-usage";
import "../../index.scss";

type DiskItem = {
  label: string;
  color: string;
  value: number;
};

type InstanceUsage = {
  quota: number;
  used: {
    mail: number;
    web: number;
    other: number;
  };
};

const UsageBar: FC = () => {
  const [totalValue, setTotalValue] = React.useState<number>(0);
  const [usageItems, setUsageItems] = React.useState<DiskItem[]>([]);

  const getInstanceUsage = async (): Promise<InstanceUsage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(instance);
      }, 50);
    });
  };

  useEffect(() => {
    getInstanceUsage().then((instanceUsage) => {
      if (
        instanceUsage.quota <
        instanceUsage.used.mail +
          instanceUsage.used.web +
          instanceUsage.used.other
      ) {
        const event = new CustomEvent("diskusage_overused", {
          detail: {
            quota: instanceUsage.quota,
            used:
              instanceUsage.used.mail +
              instanceUsage.used.web +
              instanceUsage.used.other,
          },
        });

        window.dispatchEvent(event);
      }
      setTotalValue(instanceUsage.quota);
      setUsageItems([
        { label: "Mail", color: "bg-blue-500", value: instanceUsage.used.mail },
        { label: "Web", color: "bg-green-500", value: instanceUsage.used.web },
        {
          label: "Other",
          color: "bg-orange-500",
          value: instanceUsage.used.other,
        },
      ]);
    });
  }, []);

  // Calculate widths for each item
  const calculateWidth = (value: number) => `${(value / totalValue) * 100}%`;

  // Calculate remaining space
  const usedSpace = usageItems.reduce((acc, item) => acc + item.value, 0);
  const remainingSpace = totalValue - usedSpace;

  return (
    <div className="rounded-md p-4 shadow-md w-full lg:w-10/12 bg-white border-4 border-red-500">
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-semibold">
          Disk Usage{" "}
          {usedSpace > totalValue ? (
            <span className="text-red-500 text-xs">Overusage</span>
          ) : null}
        </h2>
        <span className={usedSpace > totalValue ? "text-red-500" : ""}>
          Used: {convertBytes(usedSpace)}/{convertBytes(totalValue)}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-md overflow-hidden flex mb-2">
        {usageItems
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div
              key={index}
              className={`h-full ${
                usedSpace > totalValue ? "bg-red-500" : item.color
              } hover:cursor-pointer`}
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

      <ul className="flex gap-2 justify-start lg:flex-row flex-col">
        {usageItems.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <span
              className={`w-3 h-3 rounded-full ${
                usedSpace > totalValue ? "bg-red-500" : item.color
              }`}
            ></span>
            {item.label} {convertBytes(item.value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(UsageBar);
