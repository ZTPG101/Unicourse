import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBillingDetailsTable1752723316167
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [billingDetails] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [userId] int,
        [firstName] nvarchar(100),
        [lastName] nvarchar(100),
        [address] nvarchar(255),
        [city] nvarchar(100),
        [state] nvarchar(100),
        [zip] nvarchar(20),
        [email] nvarchar(100),
        [phone] nvarchar(20),
        [note] nvarchar(255),
        [createdAt] DATETIME DEFAULT GETDATE()
        CONSTRAINT FK_billingDetails_user FOREIGN KEY (userId) REFERENCES [user](id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}