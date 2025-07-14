import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartTable1752476861967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [cart] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [userId] int NOT NULL,
        [status] nvarchar(255) DEFAULT 'pending',
        [createdAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT [FK_cart_user] FOREIGN KEY ([userId]) REFERENCES [user]([id]) ON DELETE CASCADE
      )
    `);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
