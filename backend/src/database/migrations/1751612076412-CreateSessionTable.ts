import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionTable1751612076412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [session] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [hashedRefreshToken] NVARCHAR(255) NOT NULL,
        [deviceInfo] NVARCHAR(255),
        [createdAt] DATETIME DEFAULT GETDATE(),
        [userId] int,
        CONSTRAINT [FK_session_user] FOREIGN KEY ([userId]) REFERENCES [user]([id]) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
