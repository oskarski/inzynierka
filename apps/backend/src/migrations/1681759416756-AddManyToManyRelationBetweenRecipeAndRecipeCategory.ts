import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToManyRelationBetweenRecipeAndRecipeCategory1681759416756
  implements MigrationInterface
{
  name = 'AddManyToManyRelationBetweenRecipeAndRecipeCategory1681759416756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipes_recipes_categories" ("recipesId" uuid NOT NULL, "recipeCategoryId" uuid NOT NULL, CONSTRAINT "PK_ae06c6c10222fff2bffa40def26" PRIMARY KEY ("recipesId", "recipeCategoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cda501b16c4bbc889782886a56" ON "recipes_recipes_categories" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66e6c1c4e2346f93fce31def53" ON "recipes_recipes_categories" ("recipeCategoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_cda501b16c4bbc889782886a566" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_66e6c1c4e2346f93fce31def532" FOREIGN KEY ("recipeCategoryId") REFERENCES "recipe_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_66e6c1c4e2346f93fce31def532"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_cda501b16c4bbc889782886a566"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66e6c1c4e2346f93fce31def53"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cda501b16c4bbc889782886a56"`,
    );
    await queryRunner.query(`DROP TABLE "recipes_recipes_categories"`);
  }
}
