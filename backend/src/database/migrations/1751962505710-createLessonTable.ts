import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLessonTable1751962505710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [lesson] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [title] nvarchar(255) NOT NULL,
        [content] text NOT NULL,
        [videoUrl] nvarchar(255) NOT NULL,
        [order] int NOT NULL,
        [courseId] int NOT NULL,
        [createdAt] DATETIME DEFAULT GETDATE(),
        [updatedAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT [FK_lesson_course] FOREIGN KEY ([courseId]) REFERENCES [course]([id]) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
