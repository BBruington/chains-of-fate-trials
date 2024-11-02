import { atom } from "jotai";
import { defaultCreatedMaze } from "./puzzlecraft/constants";
import { ACTIVE_SIDEBAR_ENUM, Maze } from "./puzzlecraft/types";

const maze = atom<Maze>({ ...defaultCreatedMaze, userId: "default" });

const craftMode = atom(ACTIVE_SIDEBAR_ENUM.EDITMODE);

const puzzle = atom("MAZE");

export { puzzle, maze, craftMode };
