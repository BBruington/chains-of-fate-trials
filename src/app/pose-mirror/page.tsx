"use client";

import { useEffect } from "react";
import io from "socket.io-client";
import PoseList from "./components/pose-list/pose-list";
import { PageProvider } from "./page-context";

const socket = io(); // By default, it will connect to the host that serves the page

export default function Page() {
  useEffect(() => {
    // Handle socket connection
    socket.on("connect", () => {
      console.log("connected to server");

      // Emit events
      socket.emit("example_event", "Hello server!");
    });

    // Clean up on component unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <div className="h-full">
      <PageProvider>
        <PoseList />
      </PageProvider>
    </div>
  );
}
