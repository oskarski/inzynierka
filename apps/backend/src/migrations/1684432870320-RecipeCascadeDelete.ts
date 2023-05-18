import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecipeCascadeDelete1684432870320 implements MigrationInterface {
  name = 'RecipeCascadeDelete1684432870320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" DROP CONSTRAINT "FK_bc02c647e75da3c57a2d22903db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" ADD CONSTRAINT "FK_bc02c647e75da3c57a2d22903db" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" DROP CONSTRAINT "FK_bc02c647e75da3c57a2d22903db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_f240137e0e13bed80bdf64fed53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_categories" ADD CONSTRAINT "FK_bc02c647e75da3c57a2d22903db" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_f240137e0e13bed80bdf64fed53" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
