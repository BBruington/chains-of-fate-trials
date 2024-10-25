-- CreateEnum
CREATE TYPE "MagicType" AS ENUM ('EMPTY', 'ARCANE', 'PRIMAL', 'DIVINE', 'OCCULT');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('EMPTY', 'COMMON', 'UNCOMMON', 'RARE', 'VERYRARE', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "PrimaryAttribute" AS ENUM ('EMPTY', 'ABJURATION', 'CONJURATION', 'DIVINATION', 'ENCHANTMENT', 'EVOCATION', 'ILLUSION', 'NECROMANCY', 'TRANSMUTATION');

-- CreateTable
CREATE TABLE "PuzzleSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PuzzleSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuzzleChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PuzzleChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL,
    "checkpoint" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "solved" BOOLEAN NOT NULL,
    "data" JSONB NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PuzzleType" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "PuzzleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "imgUrl" TEXT,
    "username" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "ingredients" TEXT[],

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "type" "MagicType" NOT NULL DEFAULT 'PRIMAL',
    "primaryAttribute" "PrimaryAttribute" NOT NULL DEFAULT 'ABJURATION',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "abjuration" INTEGER NOT NULL DEFAULT 0,
    "conjuration" INTEGER NOT NULL DEFAULT 0,
    "divination" INTEGER NOT NULL DEFAULT 0,
    "enchantment" INTEGER NOT NULL DEFAULT 0,
    "evocation" INTEGER NOT NULL DEFAULT 0,
    "illusion" INTEGER NOT NULL DEFAULT 0,
    "necromancy" INTEGER NOT NULL DEFAULT 0,
    "transmutation" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Potion" (
    "id" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
    "type" "MagicType" NOT NULL DEFAULT 'ARCANE',
    "primaryAttribute" "PrimaryAttribute" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "abjuration" INTEGER NOT NULL DEFAULT 0,
    "conjuration" INTEGER NOT NULL DEFAULT 0,
    "divination" INTEGER NOT NULL DEFAULT 0,
    "enchantment" INTEGER NOT NULL DEFAULT 0,
    "evocation" INTEGER NOT NULL DEFAULT 0,
    "illusion" INTEGER NOT NULL DEFAULT 0,
    "necromancy" INTEGER NOT NULL DEFAULT 0,
    "transmutation" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Potion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StickManCoordinates" (
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

    CONSTRAINT "StickManCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PuzzleSessionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PuzzleToPuzzleSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PuzzleSessionToUser_AB_unique" ON "_PuzzleSessionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PuzzleSessionToUser_B_index" ON "_PuzzleSessionToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PuzzleToPuzzleSession_AB_unique" ON "_PuzzleToPuzzleSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PuzzleToPuzzleSession_B_index" ON "_PuzzleToPuzzleSession"("B");

-- AddForeignKey
ALTER TABLE "PuzzleChatMessage" ADD CONSTRAINT "PuzzleChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PuzzleSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PuzzleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formula" ADD CONSTRAINT "Formula_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Potion" ADD CONSTRAINT "Potion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleSessionToUser" ADD CONSTRAINT "_PuzzleSessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PuzzleSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleSessionToUser" ADD CONSTRAINT "_PuzzleSessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleToPuzzleSession" ADD CONSTRAINT "_PuzzleToPuzzleSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleToPuzzleSession" ADD CONSTRAINT "_PuzzleToPuzzleSession_B_fkey" FOREIGN KEY ("B") REFERENCES "PuzzleSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
