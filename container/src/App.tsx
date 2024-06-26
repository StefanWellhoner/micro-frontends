import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const Messanger = React.lazy(() => import("messanger/MessangerApp"));
const Receiver = React.lazy(() => import("receiver/ReceiverApp"));

const App = () => (
  <div>
    <Header />
    <main className="flex flex-col gap-2 mt-2">
      <Suspense fallback={<div>Loading Messanger...</div>}>
        <Messanger />
      </Suspense>
      <Suspense fallback={<div>Loading Receiver...</div>}>
        <Receiver />
      </Suspense>
    </main>
    <Footer />
  </div>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
