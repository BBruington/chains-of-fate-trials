"use client";

import { useState } from "react";

export default function Example() {
  const [displayUi, setDisplayUi] = useState({
    chat: true,
    otherThing: false,
  });

  const swapUi = () => {
    setDisplayUi({
      chat: false,
      otherThing: true,
    });
  };
  return (
    <div>
      <button onClick={swapUi}>swap to otherThing</button>

      <div>
        {displayUi.chat && <div>This is the chat component</div>}
        {displayUi.otherThing && <div>This is the other component</div>}
      </div>
    </div>
  );
}
