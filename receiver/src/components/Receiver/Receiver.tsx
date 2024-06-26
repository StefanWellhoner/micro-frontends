import React from "react";
import { FC } from "react";

type MessageResponse = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
};

const Receiver: FC = () => {
  const [messages, setMessages] = React.useState<MessageResponse[]>([]);

  const getMessages = async (): Promise<MessageResponse[]> => {
    const response = await fetch("http://localhost:3000/messages", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const messages = (await response.json()) as MessageResponse[];
    return messages;
  };

  React.useEffect(() => {
    getMessages().then((messages: MessageResponse[]) => {
      setMessages(messages);
    });

    const listener = (e: CustomEvent<string>) => {
      getMessages().then((messages: MessageResponse[]) => {
        setMessages(messages);
      });
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
        value={messages.map((m) => `Message: ${m.content}\tSent: ${m.created_at}`).join("\n")}
      />
    </div>
  );
};

Receiver.displayName = "Receiver";

export default Receiver;
