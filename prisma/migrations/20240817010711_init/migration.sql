/*
  Warnings:

  - You are about to drop the `StickManCoordinates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StickManCoordinates";

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" SERIAL NOT NULL,
    "head" JSONB NOT NULL,
    "torso" JSONB NOT NULL,
    "waist" JSONB NOT NULL,
    "leftForearm" JSONB NOT NULL,
    "leftHand" JSONB NOT NULL,
    "rightForearm" JSONB NOT NULL,
    "rightHand" JSONB NOT NULL,
    "leftKnee" JSONB NOT NULL,
    "leftFoot" JSONB NOT NULL,
    "rightKnee" JSONB NOT NULL,
    "rightFoot" JSONB NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);
