import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeIngredientEntity1682618568783
  implements MigrationInterface
{
  name = 'AddRecipeIngredientEntity1682618568783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe_ingredients" ("recipe_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, "quantity" numeric NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "PK_90484480b3b2978068565ae2a2f" PRIMARY KEY ("recipe_id", "ingredient_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_133545365243061dc2c55dc1373" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_133545365243061dc2c55dc1373"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_ingredients"`);
  }
}
