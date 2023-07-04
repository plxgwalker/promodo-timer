/*
  Warnings:

  - You are about to drop the column `userId` on the `UserPassword` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[UserPassword] DROP CONSTRAINT [UserPassword_userId_fkey];

-- DropIndex
ALTER TABLE [dbo].[UserPassword] DROP CONSTRAINT [UserPassword_userId_key];

-- AlterTable
ALTER TABLE [dbo].[UserPassword] DROP COLUMN [userId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
