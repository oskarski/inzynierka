import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIngredientEntity1681242293838 implements MigrationInterface {
  name = 'AddIngredientEntity1681242293838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ingredients"`);
  }
}
