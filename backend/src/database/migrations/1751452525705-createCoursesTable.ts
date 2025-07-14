import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoursesTable1751452525705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [course] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [title] nvarchar(255) NOT NULL,
        [description] text,
        [price] decimal(10,2),
        [category] nvarchar(255) DEFAULT 'general',
        [imageUrl] nvarchar(255),
        [level] nvarchar(255) DEFAULT 'Beginner',
        [durationMinutes] int DEFAULT 0,
        [rating] decimal(3,2) DEFAULT 0,
        [reviewCount] int DEFAULT 0,
        [lessonCount] int DEFAULT 0,
        [instructorId] int,
        [createdAt] DATETIME DEFAULT GETDATE(),
        [updatedAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT [FK_course_instructor] FOREIGN KEY ([instructorId]) REFERENCES [user]([id]) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
