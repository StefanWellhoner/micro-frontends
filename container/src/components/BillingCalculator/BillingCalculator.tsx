import React, { useEffect, useState } from "react";
import { convertBytes, bytesToMegabytes } from "../../utils/conversion";

const BillingCalculator = () => {
  const [quota, setQuota] = useState<number>(0);
  const [used, setUsed] = useState<number>(0);
  const [rate, setRate] = useState<number>(0.5);
  const [overusage, setOverusage] = useState<boolean>(false)

  const calculateBill = (quota: number, used: number, rate: number): number => {
    if (used <= quota) return 0;
    const overQuota = bytesToMegabytes(used) - bytesToMegabytes(quota);
    return overQuota * rate;
  };

  const handleEvent = (e: CustomEvent) => {
    const { quota, used } = e.detail;
    setQuota(quota);
    setUsed(used);
    setOverusage(true)
  };

  useEffect(() => {
    addEventListener("diskusage_overused" as any, handleEvent);
    return () => {
      removeEventListener("diskusage_overused" as any, handleEvent);
    };
  }, []);

  return overusage && (
    <div className="rounded-md px-2 py-4 shadow-md w-full lg-2/12 md:w-6/12 bg-white border-4 border-purple-500">
      <h1 className="text-xl font-semibold">Billing Calculator</h1>
      <p className="py-2">
        This shows the current billing of disk usage, if you have overusage of a
        disk, you will be charge extra per MB over the quota.
      </p>
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td>Quota</td>
            <td className="font-semibold text-right">{convertBytes(quota)}</td>
          </tr>
          <tr>
            <td>Usage</td>
            <td className="font-semibold text-right">{convertBytes(used)}</td>
          </tr>
          <tr>
            <td className="text-red-500">Overusage</td>
            <td className="font-semibold text-right text-red-500">{convertBytes(used - quota)}</td>
          </tr>
          <tr>
            <td>Rate per MB over quota</td>
            <td className="font-semibold text-right">R{rate.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Overusage Costs</td>
            <td className="font-semibold text-right">
              R{calculateBill(quota, used, rate).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Total Bill</td>
            <td className="font-semibold text-right">
              R{calculateBill(quota, used, rate).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillingCalculator;
