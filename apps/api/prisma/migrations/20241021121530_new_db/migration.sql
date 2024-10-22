/*
  Warnings:

  - Added the required column `creator` to the `Painting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featuredImageUrl` to the `Painting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageDimensions` to the `Painting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Painting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearCreated` to the `Painting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `painting` ADD COLUMN `creator` VARCHAR(191) NOT NULL,
    ADD COLUMN `featuredImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageDimensions` JSON NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearCreated` VARCHAR(191) NOT NULL;
