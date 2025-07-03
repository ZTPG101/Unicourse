import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1751444003109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE [users] (
  [id] int PRIMARY KEY,
  [email] nvarchar(255) UNIQUE NOT NULL,
  [password] nvarchar(255),
  [name] nvarchar(255),
  [avatar] nvarchar(255),
  [role] nvarchar(255) NOT NULL,
  [provider] nvarchar(255),
  [providerId] nvarchar(255),
  [createdAt] DATETIME,
  [updatedAt] DATETIME
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
