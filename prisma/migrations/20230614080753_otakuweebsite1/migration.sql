-- CreateTable
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "jpname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animeContent" (
    "id" SERIAL NOT NULL,
    "ids" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animeId" INTEGER,

    CONSTRAINT "animeContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manga" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "jpname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mangaContent" (
    "id" SERIAL NOT NULL,
    "ids" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,

    CONSTRAINT "mangaContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lightnovel" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "jpname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "lightnovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lightnovelContent" (
    "id" SERIAL NOT NULL,
    "ids" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "volume" TEXT NOT NULL,

    CONSTRAINT "lightnovelContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anime_name_key" ON "anime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "manga_name_key" ON "manga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lightnovel_name_key" ON "lightnovel"("name");

-- AddForeignKey
ALTER TABLE "animeContent" ADD CONSTRAINT "animeContent_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
