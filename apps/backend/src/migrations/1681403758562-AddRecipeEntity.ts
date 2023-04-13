import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeEntity1681403758562 implements MigrationInterface {
  name = 'AddRecipeEntity1681403758562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "preparation_time" integer NOT NULL, "portions" integer NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipes"`);
  }
}
