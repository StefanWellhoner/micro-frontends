import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import BillingCalculator from "./components/BillingCalculator/BillingCalculator";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Tabs from "./components/Tabs/Tabs";
import "./index.scss";

const WebUsageTable = React.lazy(() => import("webusageFE/WebUsageTable"));
const MailUsageTable = React.lazy(() => import("mailusageFE/MailUsageTable"));
const UsageBar = React.lazy(() => import("instanceusageFE/UsageBar"));
const InstanceTable = React.lazy(() => import("instanceusageFE/InstanceTable"));

const App = () => {
  return (
    <div className="overflow-y-auto overflow-x-hidden mb-20 border-4 border-yellow-500">
      <Header />
      <main className="flex flex-col gap-4 mt-4 lg:mx-16 md:mx-8 mx-6 pb-4">
        <div className="gap-4 flex-col flex md:flex-row">
          <Suspense fallback={<div>Loading Disk Usage Bar</div>}>
            <UsageBar />
          </Suspense>
          <BillingCalculator />
        </div>
        <Tabs
          children={[
            {
              label: "Email",
              content: (
                <Suspense fallback={<div>Loading MailUsageTable...</div>}>
                  <MailUsageTable />
                </Suspense>
              ),
            },
            {
              label: "Web content",
              content: (
                <Suspense fallback={<div>Loading WebUsageTable...</div>}>
                  <WebUsageTable />
                </Suspense>
              ),
            },
            {
              label: "Other",
              content: (
                <Suspense fallback={<div>Loading WebUsageTable...</div>}>
                  <InstanceTable />
                </Suspense>
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
