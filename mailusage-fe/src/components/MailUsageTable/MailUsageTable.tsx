import React, { useEffect } from "react";
import "../../index.scss";
import { convertBytes } from "../../utils/conversion";

type Mailboxes = {
  name: string;
  size: number;
};

const MailUsageTable = () => {
  const [totalSize, setTotalSize] = React.useState<number>(0);
  const [mailboxes, setMailboxes] = React.useState<Mailboxes[]>([]);

  const calculateTotalSize = (mailboxes: Mailboxes[]): number => {
    return mailboxes.reduce((acc, file) => acc + file.size, 0);
  };

  const sortMailboxes = (mailboxes: Mailboxes[]): Mailboxes[] => {
    return mailboxes.sort((a, b) => b.size - a.size);
  }

  useEffect(() => {
    getMailboxes();
  }, []);

  const getMailboxes = async () => {
    const response = await fetch("https://micro-frontends.free.beeceptor.com/api/mail/storage");
    if (!response.ok) throw new Error("Failed to fetch web usage");
    const mailboxes = await response.json();

    setTotalSize(calculateTotalSize(mailboxes));

    setMailboxes(sortMailboxes(mailboxes));
  };

  return (
    <div className="rounded-md px-4 shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Web Usage Table</h1>
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
            <th className="px-4 h-14 text-left">
              File/Folder name
            </th>
            <th className="px-4 text-center">Size</th>
          </tr>
        </thead>
        <tbody>
          {mailboxes.map((mailbox, index) => {
            return (
              <tr
                key={index}
                className="border-gray-100 hover:bg-gray-50 hover:cursor-pointer"
              >
                <td className="px-4 h-14 border-b-[1px] w-10/12">
                  {mailbox.name}
                </td>
                <td className="px-4 h-14 text-center border-b-[1px] w-fit">
                  <p className="text-nowrap">{convertBytes(mailbox.size)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MailUsageTable;
