"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Input } from "@/components/ui/input";
import { PuzzleChatMessage } from "@prisma/client";
import { handleAddNewMessage } from "../../actions";
import { MessagesProps } from "../../_types";

const Messages: FC<MessagesProps> = ({ chatMessages, id, username }) => {
  async function createMessage() {
    if (messageInput === "") return;
    await handleAddNewMessage({ message: messageInput, username, id });
    setInput("");
  }

  const [messageInput, setInput] = useState("");
  const [messages, setMessages] = useState<PuzzleChatMessage[]>(chatMessages);

  //the function triggered by "incoming-message" updates the useState
  //for the messages
  const handleLiveUpdate = (newMessage: PuzzleChatMessage) => {
    setMessages([newMessage, ...messages]);
  };

  useEffect(() => {
    //user connects to 'room' id
    pusherClient.subscribe(id);

    //function handleLiveUpdate will run when triggered with provided params
    //the event trigger is named "incoming-message"
    //runs on EVERY machine CURRENTLY connected to the 'room' id
    pusherClient.bind("incoming-message", (newMessage: PuzzleChatMessage) => {
      handleLiveUpdate(newMessage);
    });

    return () => {
      pusherClient.unsubscribe(id);
    };
  }, [messages]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <>
      <div className="flex h-full flex-col-reverse overflow-y-auto">
        {messages.map((message, i) => {
          const createdAt = new Date(message.createdAt);
          return (
            <div className="m-2 rounded-sm border p-1" key={i}>
              <div className="flex justify-between border-b-[1px] border-slate-700">
                <h2>{message.username}:</h2>
                <div className="self-center text-xs text-primary/70">
                  <span className="mr-1">
                    {createdAt.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                    ,
                  </span>
                  {createdAt.getHours() % 12}:{" "}
                  {createdAt.getMinutes().toString().padStart(2, "0")}{" "}
                  {createdAt.getHours() > 12 ? "PM" : "AM"}
                </div>
              </div>
              <p className="font-light">{message.message}</p>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <Input
          onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") createMessage();
          }}
          placeholder="Send Message"
          className="m-2 mx-3 border border-zinc-300"
          value={messageInput}
          type="text"
        />
      </div>
    </>
  );
};

export default Messages;
