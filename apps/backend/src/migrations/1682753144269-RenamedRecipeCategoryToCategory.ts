import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamedRecipeCategoryToCategory1682753144269
  implements MigrationInterface
{
  name = 'RenamedRecipeCategoryToCategory1682753144269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_66e6c1c4e2346f93fce31def532"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66e6c1c4e2346f93fce31def53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" RENAME COLUMN "recipeCategoryId" TO "categoriesId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" RENAME CONSTRAINT "PK_ae06c6c10222fff2bffa40def26" TO "PK_1e971ce32e0c0a41d4c60fc1159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" RENAME TO "categories"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c770829443bd157fe7e30ffffc" ON "recipes_recipes_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_c770829443bd157fe7e30ffffc3" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_c770829443bd157fe7e30ffffc3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c770829443bd157fe7e30ffffc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" RENAME TO "recipe_category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" RENAME CONSTRAINT "PK_1e971ce32e0c0a41d4c60fc1159" TO "PK_ae06c6c10222fff2bffa40def26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" RENAME COLUMN "categoriesId" TO "recipeCategoryId"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66e6c1c4e2346f93fce31def53" ON "recipes_recipes_categories" ("recipeCategoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_66e6c1c4e2346f93fce31def532" FOREIGN KEY ("recipeCategoryId") REFERENCES "recipe_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
