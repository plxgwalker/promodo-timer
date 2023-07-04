/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Timer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPassword` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Timer] ADD [userId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[UserPassword] ADD [userId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[UserPassword] ADD CONSTRAINT [UserPassword_userId_key] UNIQUE NONCLUSTERED ([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[Timer] ADD CONSTRAINT [Timer_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserPassword] ADD CONSTRAINT [UserPassword_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
