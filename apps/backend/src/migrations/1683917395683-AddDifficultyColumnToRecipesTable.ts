import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDifficultyColumnToRecipesTable1683917395683
  implements MigrationInterface
{
  name = 'AddDifficultyColumnToRecipesTable1683917395683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recipes_difficulty_enum" AS ENUM('100', '200', '300')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "difficulty" "public"."recipes_difficulty_enum" NOT NULL DEFAULT '200'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "difficulty"`);
    await queryRunner.query(`DROP TYPE "public"."recipes_difficulty_enum"`);
  }
}
