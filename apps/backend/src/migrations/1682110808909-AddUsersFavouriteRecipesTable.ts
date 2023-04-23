import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersFavouriteRecipesTable1682110808909
  implements MigrationInterface
{
  name = 'AddUsersFavouriteRecipesTable1682110808909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_favourite_recipes" ("user_id" uuid NOT NULL, "recipe_id" uuid NOT NULL, CONSTRAINT "PK_5e764378f41a8e296538543841d" PRIMARY KEY ("user_id", "recipe_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_896f112365b6c277b5086b35e2" ON "users_favourite_recipes" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_177e4b5cc4c6769e3d86526ed3" ON "users_favourite_recipes" ("recipe_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_recipes" ADD CONSTRAINT "FK_896f112365b6c277b5086b35e26" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_recipes" ADD CONSTRAINT "FK_177e4b5cc4c6769e3d86526ed3b" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_favourite_recipes" DROP CONSTRAINT "FK_177e4b5cc4c6769e3d86526ed3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_favourite_recipes" DROP CONSTRAINT "FK_896f112365b6c277b5086b35e26"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_177e4b5cc4c6769e3d86526ed3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_896f112365b6c277b5086b35e2"`,
    );
    await queryRunner.query(`DROP TABLE "users_favourite_recipes"`);
  }
}
