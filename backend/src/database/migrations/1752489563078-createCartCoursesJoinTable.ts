import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartCoursesJoinTable1752489563078
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cart_courses (
          cartId int NOT NULL,
          courseId int NOT NULL,
          CONSTRAINT PK_cart_courses PRIMARY KEY (cartId, courseId),
          CONSTRAINT FK_cart_courses_cart FOREIGN KEY (cartId) REFERENCES cart(id) ON DELETE CASCADE,
          CONSTRAINT FK_cart_courses_course FOREIGN KEY (courseId) REFERENCES course(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
