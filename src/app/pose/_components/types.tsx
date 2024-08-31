export interface Coordinate {
  x: number;
  y: number;
}

export interface BodyCoordinates {
  head: Coordinate;
  torso: Coordinate;
  waist: Coordinate;
  leftForearm: Coordinate;
  leftHand: Coordinate;
  rightForearm: Coordinate;
  rightHand: Coordinate;
  leftKnee: Coordinate;
  leftFoot: Coordinate;
  rightKnee: Coordinate;
  rightFoot: Coordinate;
}

export interface Data {
  [key: string]: Coordinate;
}

export interface PoseOrderProps {
  imageArray: PoseElement[];
}

export interface PoseElement {
  image: string;
  active: boolean;
}

export interface DisabledBodyPartProps {
  bodyPart: string;
  x: number;
  y: number;
}

export interface BodyPartProps {
  bodyPart: string;
  x: number;
  y: number;
}
