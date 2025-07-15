import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviewTable1751872188092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [review] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [fullName] nvarchar(255) NOT NULL,
        [occupation] nvarchar(255),
        [rating] int,
        [review] text,
        [userId] int,
        [courseId] int,
        CONSTRAINT [FK_review_user] FOREIGN KEY ([userId]) REFERENCES [user]([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_review_course] FOREIGN KEY ([courseId]) REFERENCES [course]([id]),
        [createdAt] DATETIME DEFAULT GETDATE(),
        [updatedAt] DATETIME DEFAULT GETDATE()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
