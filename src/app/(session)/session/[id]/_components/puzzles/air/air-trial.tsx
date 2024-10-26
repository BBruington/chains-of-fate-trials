"use client";
import { useDroppable } from "@dnd-kit/core";
import { PuzzleEnums } from "../../../_types";
import { Button } from "@/components/ui/button";
import useMazePuzzle from "../../../../../../../components/puzzles/maze-puzzle/useMazePuzzle";
import GridRow from "@/components/puzzles/maze-puzzle/grid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { selectedCharacter } from "../../../jotaiAtoms";
import { INITIAL_MAP } from "../../../_constants";
import { Direction } from "@prisma/client";

export default function AirPuzzle({ sessionId }: { sessionId: string }) {
  const [character, setCharacter] = useAtom<
    "dinner" | "artemis" | "aelarion" | "elendiel"
  >(selectedCharacter);
  const { setNodeRef } = useDroppable({
    id: PuzzleEnums.AIR,
  });

  const { playMaze, mazeState, reset } = useMazePuzzle({
    elementalSessionId: sessionId,
    gameGridDetails: {
      mapLayout: INITIAL_MAP,
    },
  });
  const { movePlayer } = playMaze;
  const { grid, playerPosition } = mazeState;

  return (
    <div
      className="relative mx-auto flex flex-col items-center justify-center"
      ref={setNodeRef}
    >
      <div className="mb-5 flex space-x-3">
        <Button onClick={() => movePlayer(-1, 0, Direction.UP)}>W</Button>
        <Button onClick={() => movePlayer(1, 0, Direction.DOWN)}>S</Button>
        <Button onClick={() => movePlayer(0, 1, Direction.RIGHT)}>D</Button>
        <Button onClick={() => movePlayer(0, -1, Direction.LEFT)}>A</Button>
        <Button onClick={reset}>Reset</Button>
        <Select
          onValueChange={(
            value: "dinner" | "artemis" | "aelarion" | "elendiel",
          ) => setCharacter(value)}
        >
          <SelectTrigger className="w-[180px] bg-secondary-foreground text-black">
            <SelectValue placeholder={character} />
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Characters</SelectLabel>
                <SelectItem value="aelarion">Aelarion</SelectItem>
                <SelectItem value="artemis">Artemis</SelectItem>
                <SelectItem value="dinner">Din&apos;er</SelectItem>
                <SelectItem value="elendiel">Elendiel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
      <div className="flex flex-col">
        {grid.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            character={character}
            rowIndex={rowIndex}
            playerPosition={playerPosition}
          />
        ))}
      </div>
    </div>
  );
}
