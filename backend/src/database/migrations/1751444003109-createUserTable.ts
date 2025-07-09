import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1751444003109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [user] (
      [id] int IDENTITY(1,1) PRIMARY KEY,
      [name] nvarchar(255),
      [email] nvarchar(255) UNIQUE NOT NULL,
      [phone] nvarchar(255),
      [password] nvarchar(255),
      [avatar] nvarchar(255),
      [role] nvarchar(255) DEFAULT 'student',
      [createdAt] DATETIME DEFAULT GETDATE(),
      [updatedAt] DATETIME DEFAULT GETDATE()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
