/*
  Warnings:

  - Added the required column `quantity` to the `OrdeProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdeProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;
