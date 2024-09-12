import { PipeType } from "../_types/index";
// prettier-ignore

const linePipe: PipeType = {
  name: "line",
  isValid: null,
  connects: { up: true, right: false, down: true, left: false },
};
const endPipe: PipeType = {
  name: "end",
  isValid: null,
  connects: { up: false, right: false, down: true, left: false },
};

const threePipe: PipeType = {
  name: "three",
  isValid: null,
  connects: { up: false, right: true, down: true, left: true },
};

const fourPipe: PipeType = {
  name: "four",
  isValid: null,
  connects: { up: true, right: true, down: true, left: true },
};

const turnPipe: PipeType = {
  name: "turn",
  isValid: null,
  connects: { up: false, right: true, down: true, left: false },
};

export const mapLength = 7;

export const allPipes: Record<number, PipeType> = {
  0: linePipe,
  1: endPipe,
  2: threePipe,
  3: fourPipe,
  4: turnPipe,
};

export const pipesExample = 
  [
  1, 4, 1, 2, 2, 1, 1, 
  1, 4, 0, 4, 0, 4, 4,
  4, 0, 2, 2, 2, 2, 1,
  4, 1, 1, 2, 4, 4, 1,
  2, 0, 0, 2, 2, 2, 4,
  2, 1, 1, 2, 0, 1, 0,
  4, 1, 1, 4, 4, 4, 1,
];
