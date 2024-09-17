"use client";
import { ChangeEvent, FC, useEffect, useState, useCallback } from "react";
import { pusherClient } from "@/lib/pusher";
import { Input } from "@/components/ui/input";
import { PuzzleChatMessage } from "@prisma/client";
import { handleAddNewMessage } from "../../actions";
import { MessagesProps } from "../../_types";
import { cn } from "@/lib/utils";

const Messages: FC<MessagesProps> = ({ chatMessages, id, username }) => {
  const [messageInput, setInput] = useState("");
  const [messages, setMessages] = useState<PuzzleChatMessage[]>(chatMessages);

  const createMessage = useCallback(async () => {
    if (messageInput === "") return;
    await handleAddNewMessage({ message: messageInput, username, id });
    setInput("");
  }, [messageInput, username, id]);

  const handleLiveUpdate = useCallback((newMessage: PuzzleChatMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  }, []);

  useEffect(() => {
    pusherClient.subscribe(id);

    pusherClient.bind("incoming-message", handleLiveUpdate);

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("incoming-message", handleLiveUpdate);
    };
  }, [id, handleLiveUpdate]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <>
      <div className="flex h-full flex-grow flex-col-reverse overflow-y-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "m-2 rounded-sm border p-1",
              message.username === username ? "bg-blue-800" : "bg-gray-800",
            )}
          >
            <div className="flex justify-between border-b border-black pb-1">
              <h2 className="font-semibold">{message.username}:</h2>
              <span className="text-xs text-primary/70">
                {formatDate(new Date(message.createdAt))}
              </span>
            </div>
            <p className="mt-1 font-light">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="p-2">
        <Input
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && createMessage()}
          placeholder="Send Message"
          className="border border-zinc-300"
          value={messageInput}
          type="text"
        />
      </div>
    </>
  );
};

export default Messages;
