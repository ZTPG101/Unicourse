import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEnrollmentTable1751962523058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE [enrollment] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [userId] int NOT NULL,
        [courseId] int NOT NULL,
        [createdAt] DATETIME DEFAULT GETDATE(),
        [updatedAt] DATETIME DEFAULT GETDATE(),
        CONSTRAINT [FK_enrollment_user] FOREIGN KEY ([userId]) REFERENCES [user]([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_enrollment_course] FOREIGN KEY ([courseId]) REFERENCES [course]([id])
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
