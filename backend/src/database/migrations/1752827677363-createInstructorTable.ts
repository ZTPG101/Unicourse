import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstructorTable1752827677363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop default constraint for experience column if it exists
    await queryRunner.query(`
      DECLARE @constraintName NVARCHAR(200)
      SELECT @constraintName = Name
      FROM SYS.DEFAULT_CONSTRAINTS
      WHERE PARENT_OBJECT_ID = OBJECT_ID('user')
        AND PARENT_COLUMN_ID = (
          SELECT column_id FROM sys.columns
          WHERE NAME = N'experience'
            AND object_id = OBJECT_ID(N'user')
        )
      IF @constraintName IS NOT NULL
        EXEC('ALTER TABLE [user] DROP CONSTRAINT ' + @constraintName)
    `);

    await queryRunner.query(`
      ALTER TABLE [user] DROP COLUMN [experience]
    `);

    await queryRunner.query(`
      CREATE TABLE [instructor] (
        [id] int IDENTITY(1,1) PRIMARY KEY,
        [userId] int UNIQUE NOT NULL,
        [occupation] nvarchar(255),
        [bio] text,
        [education] nvarchar(255),
        [experience] int DEFAULT 0,
        [studentsTrained] int,
        [coursesCount] int,
        [linkedin] nvarchar(255),
        [pinterest] nvarchar(255),
        [facebook] nvarchar(255),
        [instagram] nvarchar(255),
        CONSTRAINT FK_instructor_user FOREIGN KEY ([userId]) REFERENCES [user]([id]) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE [instructor]`
    );

    await queryRunner.query(`
        ALTER TABLE [user] ADD [experience] int DEFAULT 0
    `);
  }
}
