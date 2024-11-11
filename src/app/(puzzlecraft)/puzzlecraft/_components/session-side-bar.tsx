"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MutableRefObject, useState } from "react";
import {
  addNewSession,
  addMazeToSession,
  updateSessionTitle,
  deleteSession,
} from "../actions";
import { Maze } from "../types";

type SessionSideBarProps = {
  selectedMazeId: string;
  handleSelectMaze: (maze: Maze) => void;
  clerkId: string;
  MazeSessions: ({
    Mazes: Maze[];
  } & {
    id: string;
    userId: string;
    title: string;
  })[];
};

export default function SessionSideBar({
  clerkId,
  MazeSessions,
  handleSelectMaze,
  selectedMazeId,
}: SessionSideBarProps) {
  const [selectedMazeSession, setSelectedMazeSession] = useState(
    MazeSessions[0] || undefined,
  );
  const [sessionTitle, setSessionTitle] = useState(
    MazeSessions.length > 0 ? MazeSessions[0].title : undefined,
  );

  const handleUpdateSessionTitle = async () => {
    if (sessionTitle)
      await updateSessionTitle({
        sessionTitle,
        sessionId: selectedMazeSession.id,
      });
  };

  const handleConnectMaze = async (action: "connect" | "disconnect") => {
    await addMazeToSession({
      mazeId: selectedMazeId,
      sessionId: selectedMazeSession.id,
      action,
    });
  };

  const handleSelectCurrentMaze = (maze: Maze) => {
    handleSelectMaze(maze);
  };

  const handleDeleteSession = async () => {
    await deleteSession({ sessionId: selectedMazeSession.id });
  };

  const handleAddNewSession = async () => {
    await addNewSession({ userId: clerkId });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <h2>Title</h2>
        <Input
          onChange={(e) => setSessionTitle(e.target.value)}
          value={sessionTitle}
        />
        {selectedMazeSession?.title !== sessionTitle && (
          <Button onClick={handleUpdateSessionTitle}>Save Changes</Button>
        )}
      </div>
      <div className="flex">
        <Button
          onClick={() => handleConnectMaze("connect")}
          disabled={
            selectedMazeSession === undefined ||
            selectedMazeSession.Mazes?.find(
              (maze) => selectedMazeId === maze.id,
            ) !== undefined
          }
        >
          Add Current Maze
        </Button>
        <Button
          onClick={() => handleConnectMaze("disconnect")}
          disabled={
            selectedMazeSession === undefined ||
            selectedMazeSession.Mazes.find(
              (maze) => selectedMazeId === maze.id,
            ) === undefined
          }
        >
          Remove Current Maze
        </Button>
      </div>
      <Button onClick={handleDeleteSession}>Delete Session</Button>
      <div className="flex">
        {MazeSessions.map((session) => (
          <Button
            className="text-xs"
            onClick={() => {
              setSelectedMazeSession(session);
              setSessionTitle(session.title);
            }}
            key={session.id}
          >
            {session.title}
          </Button>
        ))}
        <div className="flex">
          {selectedMazeSession !== undefined &&
            selectedMazeSession.Mazes.map((maze, index) => (
              <Button
                onClick={() => handleSelectCurrentMaze(maze)}
                key={maze.id}
              >
                {index + 1}
              </Button>
            ))}
          <Button onClick={handleAddNewSession}>+</Button>
        </div>
      </div>
    </div>
  );
}
