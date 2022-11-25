-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` VARCHAR(191) NOT NULL DEFAULT 'empty',
    ADD COLUMN `sex` ENUM('M', 'W') NOT NULL DEFAULT 'M';
