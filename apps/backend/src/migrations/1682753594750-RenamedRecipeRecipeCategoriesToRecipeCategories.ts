import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamedRecipeRecipeCategoriesToRecipeCategories1682753594750
  implements MigrationInterface
{
  name = 'RenamedRecipeRecipeCategoriesToRecipeCategories1682753594750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe_categories" ("recipe_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_884e99b8acb3b0cbcdb4c584b92" PRIMARY KEY ("recipe_id", "category_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" ADD CONSTRAINT "FK_bc02c647e75da3c57a2d22903db" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" ADD CONSTRAINT "FK_0849dba2a4b41b34c64fbc5df5e" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_c770829443bd157fe7e30ffffc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_cda501b16c4bbc889782886a566"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c770829443bd157fe7e30ffffc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cda501b16c4bbc889782886a56"`,
    );
    await queryRunner.query(`DROP TABLE "recipes_recipes_categories"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" DROP CONSTRAINT "FK_0849dba2a4b41b34c64fbc5df5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" DROP CONSTRAINT "FK_bc02c647e75da3c57a2d22903db"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_categories"`);
    await queryRunner.query(
      `CREATE TABLE "recipes_recipes_categories" ("recipesId" uuid NOT NULL, "recipeCategoryId" uuid NOT NULL, CONSTRAINT "PK_ae06c6c10222fff2bffa40def26" PRIMARY KEY ("recipesId", "recipeCategoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cda501b16c4bbc889782886a56" ON "recipes_recipes_categories" ("recipesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c770829443bd157fe7e30ffffc" ON "recipes_recipes_categories" ("recipeCategoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_cda501b16c4bbc889782886a566" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_c770829443bd157fe7e30ffffc3" FOREIGN KEY ("recipeCategoryId") REFERENCES "recipe_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
