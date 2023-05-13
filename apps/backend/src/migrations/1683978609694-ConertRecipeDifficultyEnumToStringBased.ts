import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConertRecipeDifficultyEnumToStringBased1683978609694
  implements MigrationInterface
{
  name = 'ConertRecipeDifficultyEnumToStringBased1683978609694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."recipes_difficulty_enum" RENAME TO "recipes_difficulty_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recipes_difficulty_enum" AS ENUM('100', '200', '300')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" TYPE "public"."recipes_difficulty_enum" USING "difficulty"::"text"::"public"."recipes_difficulty_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" SET DEFAULT '200'`,
    );
    await queryRunner.query(`DROP TYPE "public"."recipes_difficulty_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recipes_difficulty_enum_old" AS ENUM('100', '200', '300')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" TYPE "public"."recipes_difficulty_enum_old" USING "difficulty"::"text"::"public"."recipes_difficulty_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipes" ALTER COLUMN "difficulty" SET DEFAULT '200'`,
    );
    await queryRunner.query(`DROP TYPE "public"."recipes_difficulty_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."recipes_difficulty_enum_old" RENAME TO "recipes_difficulty_enum"`,
    );
  }
}
