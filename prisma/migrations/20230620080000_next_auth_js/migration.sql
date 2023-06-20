/*
  Warnings:

  - You are about to drop the column `timerInfoId` on the `Timer` table. All the data in the column will be lost.
  - You are about to drop the column `timerSettingsId` on the `Timer` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `TimerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timerId]` on the table `TimerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TimerSettings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timerId]` on the table `TimerSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timerId` to the `TimerInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timerId` to the `TimerSettings` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Timer] DROP CONSTRAINT [Timer_timerInfoId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Timer] DROP CONSTRAINT [Timer_timerSettingsId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Timer] DROP CONSTRAINT [Timer_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Timer] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Timer] DROP COLUMN [timerInfoId],
[timerSettingsId];

-- AlterTable
ALTER TABLE [dbo].[TimerInfo] ALTER COLUMN [title] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[TimerInfo] ADD [timerId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [focusTimeHours] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [focusTimeMins] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [focusTimeSecs] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [breakTimeHours] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [breakTimeMins] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ALTER COLUMN [breakTimeSecs] INT NULL;
ALTER TABLE [dbo].[TimerSettings] ADD [timerId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refresh_token] TEXT,
    [access_token] TEXT,
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] TEXT,
    [session_state] NVARCHAR(1000),
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_providerAccountId_key] UNIQUE NONCLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [identifier] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_identifier_token_key] UNIQUE NONCLUSTERED ([identifier],[token])
);

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_email_key];
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_name_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'User'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [image] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);
IF EXISTS(SELECT * FROM [dbo].[User])
    EXEC('INSERT INTO [dbo].[_prisma_new_User] ([email],[id],[name]) SELECT [email],[id],[name] FROM [dbo].[User] WITH (holdlock tablockx)');
DROP TABLE [dbo].[User];
EXEC SP_RENAME N'dbo._prisma_new_User', N'User';
COMMIT;

-- CreateIndex
ALTER TABLE [dbo].[TimerInfo] ADD CONSTRAINT [TimerInfo_id_key] UNIQUE NONCLUSTERED ([id]);

-- CreateIndex
ALTER TABLE [dbo].[TimerInfo] ADD CONSTRAINT [TimerInfo_timerId_key] UNIQUE NONCLUSTERED ([timerId]);

-- CreateIndex
ALTER TABLE [dbo].[TimerSettings] ADD CONSTRAINT [TimerSettings_id_key] UNIQUE NONCLUSTERED ([id]);

-- CreateIndex
ALTER TABLE [dbo].[TimerSettings] ADD CONSTRAINT [TimerSettings_timerId_key] UNIQUE NONCLUSTERED ([timerId]);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Timer] ADD CONSTRAINT [Timer_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimerSettings] ADD CONSTRAINT [TimerSettings_timerId_fkey] FOREIGN KEY ([timerId]) REFERENCES [dbo].[Timer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TimerInfo] ADD CONSTRAINT [TimerInfo_timerId_fkey] FOREIGN KEY ([timerId]) REFERENCES [dbo].[Timer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
