/*
  Warnings:

  - The primary key for the `Coordinates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SolutionOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Coordinates" DROP CONSTRAINT "Coordinates_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Coordinates_id_seq";

-- AlterTable
ALTER TABLE "SolutionOrder" DROP CONSTRAINT "SolutionOrder_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SolutionOrder_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SolutionOrder_id_seq";
