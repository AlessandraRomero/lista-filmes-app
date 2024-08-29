/*
  Warnings:

  - A unique constraint covering the columns `[movieId,guestSessionId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guestSessionId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Favorite_movieId_key";

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "guestSessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GuestSession" (
    "id" SERIAL NOT NULL,
    "guestSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestSession_guestSessionId_key" ON "GuestSession"("guestSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_movieId_guestSessionId_key" ON "Favorite"("movieId", "guestSessionId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_guestSessionId_fkey" FOREIGN KEY ("guestSessionId") REFERENCES "GuestSession"("guestSessionId") ON DELETE RESTRICT ON UPDATE CASCADE;
