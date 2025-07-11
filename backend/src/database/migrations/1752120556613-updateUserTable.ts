import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1752120556613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE [user] 
            ADD [experience] int DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
