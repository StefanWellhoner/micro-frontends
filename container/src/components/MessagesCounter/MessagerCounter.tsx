import React, { useEffect } from "react";
import { FC } from "react";

const MessagesCounter: FC = () => {
  const [counter, setCounter] = React.useState(0);
  useEffect(() => {
    const handleEvent = (_event: CustomEvent) => {
      setCounter((prev) => prev + 1);
    };

    window.addEventListener("microfrontend:messange:send" as any, handleEvent);

    return () => {
      window.removeEventListener(
        "microfrontend:messange:send" as any,
        handleEvent
      );
    };
  }, []);

  return (
    <div className="ml-2">
      <p>
        Messages Sent this session: <span className="font-bold">{counter}</span>
      </p>
    </div>
  );
};

export default MessagesCounter;