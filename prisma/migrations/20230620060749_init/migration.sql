BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Timer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Timer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [timerSettingsId] INT,
    [timerInfoId] INT,
    CONSTRAINT [Timer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TimerSettings] (
    [id] INT NOT NULL IDENTITY(1,1),
    [privateTimer] BIT NOT NULL CONSTRAINT [TimerSettings_privateTimer_df] DEFAULT 0,
    [focusTimeHours] INT NOT NULL,
    [focusTimeMins] INT NOT NULL,
    [focusTimeSecs] INT NOT NULL,
    [breakTimeHours] INT NOT NULL,
    [breakTimeMins] INT NOT NULL,
    [breakTimeSecs] INT NOT NULL,
    CONSTRAINT [TimerSettings_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TimerInfo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TimerInfo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TimerInfo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Timer] ADD CONSTRAINT [Timer_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Timer] ADD CONSTRAINT [Timer_timerSettingsId_fkey] FOREIGN KEY ([timerSettingsId]) REFERENCES [dbo].[TimerSettings]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Timer] ADD CONSTRAINT [Timer_timerInfoId_fkey] FOREIGN KEY ([timerInfoId]) REFERENCES [dbo].[TimerInfo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
