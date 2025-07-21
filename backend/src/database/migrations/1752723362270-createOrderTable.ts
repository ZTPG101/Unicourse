import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1752723362270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE [order] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [userId] int NOT NULL,
        [billingDetailsId] int NOT NULL,
        [status] nvarchar(255),
        [total] decimal(10,2),
        [paypalOrderId] nvarchar(255),
        [createdAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_order_user FOREIGN KEY ([userId]) REFERENCES [user](id) ON DELETE CASCADE,
        CONSTRAINT FK_order_billingDetails FOREIGN KEY ([billingDetailsId]) REFERENCES [billingDetails](id)
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
