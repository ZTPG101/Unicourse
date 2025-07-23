import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCourseTable1753173136657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE [course] ADD 
            [learningObjectives] nvarchar(max) NULL 
            CONSTRAINT [DF_course_learningObjectives] DEFAULT (N'[]'),
            [requirements] nvarchar(max) NULL 
            CONSTRAINT [DF_course_requirements] DEFAULT (N'[]')
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
