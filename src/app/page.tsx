"use client";
import Draggable from "@/components/dndkit/draggable";
import Droppable from "@/components/dndkit/dropable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Reflect } from "@rocicorp/reflect/client";
import { useSubscribe } from "@rocicorp/reflect/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { mutators } from "./utils/reflect/mutators";

export default function Home() {
<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<<<<<<< HEAD
      Testing PR
=======
      <button className="bg-secondary h-12 w-32" onClick={handleCount}>
=======
=======
  const [testRes, setTestRes] = useState("");
  const socket = io("http://localhost:3001");

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };

  useEffect(() => {
    console.log("test");
    socket.on("receive_message", (data) => {
      console.log("messaged test");
      setTestRes(data.message);
    });
  }, [socket]);

>>>>>>> 19a27fd (Websockets Beta)
  const reflect = new Reflect({
    server: "http://127.0.0.1:8080/",
    roomID: "myRoom",
    userID: "myUser",
    mutators,
  });

  const count = useSubscribe(reflect, (tx) => tx.get<number>("count"), 0);
  const dragEvent = useSubscribe(
    reflect,
    (tx) => tx.get<string | null>("dragevent"),
    null,
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over } = event;
    const newId = over ? over.id : null;
    await reflect.mutate.handleDragEnd(
      typeof newId === "string" ? newId : null,
    );
  };

  const handleCount = async () => {
    await reflect.mutate.increment(1);
  };

  const containers = ["A", "B", "C"];
  const draggableMarkup = (
    <Draggable className="bg-primary text-secondary" id="draggable">
      Drag me
    </Draggable>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button className="h-12 w-32 bg-secondary" onClick={handleCount}>
>>>>>>> 49bf17f (Websockets update)
        {count}
      </button>
      <h1>{testRes}</h1>
      <button onClick={() => sendMessage()}>Send Message</button>
      <DndContext onDragEnd={handleDragEnd}>
        {dragEvent === null ? draggableMarkup : null}

        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {dragEvent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>
<<<<<<< HEAD
      Test PR
>>>>>>> 3900b64 (Test PR)
=======
>>>>>>> a31f44c (Pose and Pose Mirror Update)
    </main>
  );
}
