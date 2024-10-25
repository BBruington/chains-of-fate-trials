-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cursorImg" TEXT;

-- CreateTable
CREATE TABLE "SolutionOrder" (
    "id" SERIAL NOT NULL,
    "order" JSONB NOT NULL,

    CONSTRAINT "SolutionOrder_pkey" PRIMARY KEY ("id")
);
