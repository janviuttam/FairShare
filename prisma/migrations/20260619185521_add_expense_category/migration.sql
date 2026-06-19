/*
  Warnings:

  - You are about to drop the column `category` on the `expenseparticipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expense` ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'Other';

-- AlterTable
ALTER TABLE `expenseparticipant` DROP COLUMN `category`;
