import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoGeneratingRecipeCategoryIds1681761155734
  implements MigrationInterface
{
  name = 'AutoGeneratingRecipeCategoryIds1681761155734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" DROP CONSTRAINT "FK_66e6c1c4e2346f93fce31def532"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
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
      `ALTER TABLE "recipe_category" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes_recipes_categories" ADD CONSTRAINT "FK_66e6c1c4e2346f93fce31def532" FOREIGN KEY ("recipeCategoryId") REFERENCES "recipe_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
