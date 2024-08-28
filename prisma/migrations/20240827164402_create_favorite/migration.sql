-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_movieId_key" ON "Favorite"("movieId");
