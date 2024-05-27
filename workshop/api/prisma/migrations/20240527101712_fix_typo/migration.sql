/*
  Warnings:

  - You are about to drop the column `patTime` on the `BillSale` table. All the data in the column will be lost.
  - Added the required column `payTime` to the `BillSale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillSale" DROP COLUMN "patTime",
ADD COLUMN     "payTime" TEXT NOT NULL;
