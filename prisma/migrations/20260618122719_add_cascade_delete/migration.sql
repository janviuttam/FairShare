-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_paidById_fkey`;

-- DropForeignKey
ALTER TABLE `groupmember` DROP FOREIGN KEY `GroupMember_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `groupmember` DROP FOREIGN KEY `GroupMember_userId_fkey`;

-- DropIndex
DROP INDEX `Expense_groupId_fkey` ON `expense`;

-- DropIndex
DROP INDEX `Expense_paidById_fkey` ON `expense`;

-- DropIndex
DROP INDEX `GroupMember_groupId_fkey` ON `groupmember`;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_paidById_fkey` FOREIGN KEY (`paidById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
