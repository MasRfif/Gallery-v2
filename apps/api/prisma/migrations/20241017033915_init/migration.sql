-- CreateTable
CREATE TABLE `Painting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail` VARCHAR(191) NOT NULL,
    `imageName` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
