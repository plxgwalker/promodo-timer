BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserPassword] (
    [id] INT NOT NULL IDENTITY(1,1),
    [hashedPassword] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserPassword_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserPassword_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [UserPassword_userId_key] UNIQUE NONCLUSTERED ([userId])
);

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
