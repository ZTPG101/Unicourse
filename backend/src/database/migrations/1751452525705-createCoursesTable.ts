import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoursesTable1751452525705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE [courses] (
  [id] int IDENTITY(1,1) PRIMARY KEY,
  [title] nvarchar(255) NOT NULL,
  [description] text,
  [price] decimal,
  [category] nvarchar(255),
  [rating] float,
  [instructorId] int NOT NULL,
  [createdAt] DATETIME,
  [updatedAt] DATETIME
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
