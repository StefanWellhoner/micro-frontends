import React from "react";
import { FC } from "react";

const Receiver: FC = () => {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const listener = (e: CustomEvent<string>) => {
      setMessages((prev) => [...prev, e.detail]);
    };

    window.addEventListener("microfrontend:messange:send" as any, listener);

    return () => {
      window.removeEventListener(
        "microfrontend:messange:send" as any,
        listener
      );
    };
  }, []);

  return (
    <div className="bg-blue-300 flex flex-col gap-2 items-center px-2 py-4">
      <h1 className="text-2xl font-bold">Receiver</h1>
      <textarea
        className="bg-gray-100 rounded-sm px-2 py-2 text-lg resize-none w-full h-48 focus:outline-none text-gray-600"
        readOnly
        value={messages.join("\n")}
      />
      <button
        className="bg-red-500 text-white rounded-md w-fit px-4 py-2 font-semibold"
        onClick={() => setMessages([])}
      >
        Clear
      </button>
    </div>
  );
};

Receiver.displayName = "Receiver";

export default Receiver;
