import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderItemTable1752723363760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE [orderItem] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [orderId] int NOT NULL,
        [courseId] int,
        [price] decimal(10,2),
        [createdAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_orderItem_order FOREIGN KEY ([orderId]) REFERENCES [order](id),
        CONSTRAINT FK_orderItem_course FOREIGN KEY ([courseId]) REFERENCES [course](id)
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
