import React, { useState } from "react";
import { FC } from "react";

const Messanger: FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const saveMessage = async () => {
    await delay(1000);
    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
  };

  const dispatchEvent = async () => {
    setLoading(true);
    await saveMessage();
    const event = new CustomEvent("microfrontend:messange:send", {
      detail: message, // Payload sent with event
    });
    window.dispatchEvent(event); // Dispatch the event
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 flex flex-col gap-2 items-center px-2 py-4 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-600">Messanger</h1>
      <input
        className="bg-white rounded-sm px-2 py-2 text-lg w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <div className="items-center justify-center">
        <button
          className="bg-blue-500 text-white rounded-md w-fit px-4 py-2 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={dispatchEvent}
          disabled={loading || message === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messanger;
