import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCourseTable1752831036950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the old foreign key and column (instructorId referencing user)
        await queryRunner.query(`
            ALTER TABLE [course] DROP CONSTRAINT IF EXISTS FK_course_instructor;
        `);
        await queryRunner.query(`
            ALTER TABLE [course] DROP COLUMN IF EXISTS [instructorId];
        `);
        // Add new instructorId column referencing instructor(id)
        await queryRunner.query(`
            ALTER TABLE [course] ADD [instructorId] int;
        `);
        await queryRunner.query(`
            ALTER TABLE [course] ADD CONSTRAINT FK_course_instructor FOREIGN KEY ([instructorId]) REFERENCES [instructor]([id]) ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the new foreign key and column
        await queryRunner.query(`
            ALTER TABLE [course] DROP CONSTRAINT IF EXISTS FK_course_instructor;
        `);
        await queryRunner.query(`
            ALTER TABLE [course] DROP COLUMN IF EXISTS [instructorId];
        `);
        // Restore the old instructorId column referencing user(id)
        await queryRunner.query(`
            ALTER TABLE [course] ADD [instructorId] int;
        `);
        await queryRunner.query(`
            ALTER TABLE [course] ADD CONSTRAINT FK_course_instructor FOREIGN KEY ([instructorId]) REFERENCES [user]([id]) ON DELETE SET NULL;
        `);
    }

}
