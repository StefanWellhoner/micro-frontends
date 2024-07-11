import React, { useEffect } from "react";
import "../../index.scss";
import { convertBytes } from "../../utils/conversion";
import { web } from "../../data/web-data";

type WebFile = {
  name: string;
  size: number;
};

const WebUsageTable = () => {
  const [totalSize, setTotalSize] = React.useState<number>(0);
  const [files, setFiles] = React.useState<WebFile[]>([]);

  const calculateTotalSize = (files: WebFile[]): number => {
    return files.reduce((acc, file) => acc + file.size, 0);
  };

  const sortFiles = (files: WebFile[]): WebFile[] => {
    return files.sort((a, b) => b.size - a.size);
  };

  useEffect(() => {
    getWebFiles();
  }, []);

  const getWebFiles = async () => {
    const files: WebFile[] = web;

    setTotalSize(calculateTotalSize(files));

    setFiles(sortFiles(files));
  };

  return (
    <div className="rounded-md px-4 shadow-md w-full border-4 border-green-500">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Web Content</h1>
        <p className="leading-8 font-semibold">
          Total Size:{" "}
          <span className="font-normal">{convertBytes(totalSize)}</span>
        </p>
      </div>
      <div className="mb-4">
        <p>
          This is where your mailboxes are situated. You will find that most of
          over-usage is probably due to email, which can be rectified by
          deleting unwanted or unnecessary emails or mailboxes.
        </p>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className=" border-y-[1px]">
            <th className="px-4 h-14 text-left">Name</th>
            <th className="px-4 text-center">Size</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => {
            return (
              <tr
                key={index}
                className="border-gray-100 hover:bg-gray-50 hover:cursor-pointer"
              >
                <td className="px-4 h-14 border-b-[1px] w-10/12">
                  {file.name}
                </td>
                <td className="px-4 h-14 text-center border-b-[1px] w-fit">
                  <p className="text-nowrap">{convertBytes(file.size)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WebUsageTable;
