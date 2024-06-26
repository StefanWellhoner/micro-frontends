import React from "react";
import { FC } from "react";

const Messanger: FC = () => {
  const [message, setMessage] = React.useState<string>("");

  const saveMessage = async () => {
    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
  };

  const dispatchEvent = async () => {
    await saveMessage();
    const event = new CustomEvent("microfrontend:messange:send", {
      detail: message,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-red-300 flex flex-col gap-2 items-center px-2 py-4">
      <h1 className="text-2xl font-bold">Messanger</h1>
      <input
        className="bg-gray-100 rounded-sm px-2 py-2 text-lg w-full"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <div className="items-center justify-center">
        <button
          className="bg-blue-500 text-white rounded-md w-fit px-4 py-2 font-semibold"
          onClick={dispatchEvent}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messanger;
