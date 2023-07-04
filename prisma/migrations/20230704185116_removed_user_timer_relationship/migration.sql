/*
  Warnings:

  - You are about to drop the column `userId` on the `Timer` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Timer] DROP CONSTRAINT [Timer_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Timer] DROP COLUMN [userId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
