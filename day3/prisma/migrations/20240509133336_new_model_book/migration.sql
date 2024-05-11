-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "isBn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
