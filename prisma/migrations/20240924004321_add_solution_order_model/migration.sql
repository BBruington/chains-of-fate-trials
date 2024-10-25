/*
  Warnings:

  - A unique constraint covering the columns `[cursorCoordinatesId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cursorCoordinatesId" TEXT;

-- CreateTable
CREATE TABLE "CursorCoordinates" (
    "id" TEXT NOT NULL,
    "coordinates" JSONB,
    "userId" TEXT,

    CONSTRAINT "CursorCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CursorCoordinates_userId_key" ON "CursorCoordinates"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_cursorCoordinatesId_key" ON "users"("cursorCoordinatesId");

-- AddForeignKey
ALTER TABLE "CursorCoordinates" ADD CONSTRAINT "CursorCoordinates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
