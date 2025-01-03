-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('SINGLE_USE', 'RECYCLABLE', 'NON_RECYCLABLE');

-- CreateTable
CREATE TABLE "PlasticItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlasticItem_pkey" PRIMARY KEY ("id")
);
