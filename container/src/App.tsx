import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import UsageBar from "./components/UsageBar/UsageBar";
import BillingCalculator from "./components/BillingCalculator/BillingCalculator";
import Tabs from "./components/Tabs/Tabs";

const WebUsageTable = React.lazy(() => import("webusageFE/WebUsageTable"));
const MailUsageTable = React.lazy(() => import("mailusageFE/MailUsageTable"));

type UsageItem = {
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

const App = () => {
  const [totalValue, setTotalValue] = React.useState<number>(0);
  const [usageItems, setUsageItems] = React.useState<UsageItem[]>([]);

  const getInstanceUsage = async (): Promise<InstanceUsage> => {
    // Call to api endpoint GET /api/instance/storage
    const response = await fetch(
      "https://micro-frontends.free.beeceptor.com/api/instance/storage",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch instance usage");
    return await response.json();
  };

  useEffect(() => {
    getInstanceUsage().then((instanceUsage) => {
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

  return (
    <div className="overflow-y-auto overflow-x-hidden mb-20">
      <Header />
      <main className="flex flex-col gap-4 mt-2 lg:mx-16 md:mx-8 mx-6 pb-4">
        <div className="gap-4 flex-col flex md:flex-row">
          <UsageBar
            showLabels={true}
            items={usageItems}
            totalValue={totalValue}
          />
          <BillingCalculator />
        </div>
        <Tabs
          children={[
            {
              label: "Web",
              content: (
                <Suspense fallback={<div>Loading WebUsageTable...</div>}>
                  <WebUsageTable />
                </Suspense>
              ),
            },
            {
              label: "Mail",
              content: (
                <Suspense fallback={<div>Loading MailUsageTable...</div>}>
                  <MailUsageTable />
                </Suspense>
              ),
            },
            {
              label: "Other",
              content: (
                <div className="rounded-md px-2 py-4 shadow-md w-full">
                  <h1 className="text-2xl font-bold">Other Usage</h1>
                  <p>Coming soon!</p>
                </div>
              ),
            },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
