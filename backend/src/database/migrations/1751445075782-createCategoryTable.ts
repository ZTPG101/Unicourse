import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoryTable1751445075782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [category] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [name] nvarchar(255) UNIQUE NOT NULL,
        [description] text
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
