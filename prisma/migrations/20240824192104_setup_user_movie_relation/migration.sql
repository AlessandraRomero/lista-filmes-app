-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "overview" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMovie" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "UserMovie_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovie" ADD CONSTRAINT "UserMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
