import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReviewToRecipeListItemView1685033468195
  implements MigrationInterface
{
  name = 'AddReviewToRecipeListItemView1685033468195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'recipe_list_item_view_entity', 'public'],
    );
    await queryRunner.query(`DROP VIEW "recipe_list_item_view_entity"`);
    await queryRunner.query(
      `CREATE VIEW "recipe_list_item_view_entity" AS SELECT "recipes"."id" AS id, "recipes"."name" AS name, "recipes"."description" AS description, "recipes"."portions" AS portions, "recipes"."state" AS state, "recipes"."difficulty" AS difficulty, "recipes"."review" AS review, "recipes"."preparation_time" AS "preparationTime", "recipes"."author_id" AS "authorId", array_remove(array_agg("category"."category_id"), NULL) AS "categoryIds" FROM "recipes" "recipes" LEFT JOIN "recipe_categories" "category" ON category."recipe_id" = recipes."id" GROUP BY "recipes"."id" ORDER BY "recipes"."id" ASC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'recipe_list_item_view_entity',
        'SELECT "recipes"."id" AS id, "recipes"."name" AS name, "recipes"."description" AS description, "recipes"."portions" AS portions, "recipes"."state" AS state, "recipes"."difficulty" AS difficulty, "recipes"."review" AS review, "recipes"."preparation_time" AS "preparationTime", "recipes"."author_id" AS "authorId", array_remove(array_agg("category"."category_id"), NULL) AS "categoryIds" FROM "recipes" "recipes" LEFT JOIN "recipe_categories" "category" ON category."recipe_id" = recipes."id" GROUP BY "recipes"."id" ORDER BY "recipes"."id" ASC',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'recipe_list_item_view_entity', 'public'],
    );
    await queryRunner.query(`DROP VIEW "recipe_list_item_view_entity"`);
    await queryRunner.query(
      `CREATE VIEW "recipe_list_item_view_entity" AS SELECT "recipes"."id" AS id, "recipes"."name" AS name, "recipes"."description" AS description, "recipes"."portions" AS portions, "recipes"."state" AS state, "recipes"."difficulty" AS difficulty, "recipes"."preparation_time" AS "preparationTime", "recipes"."author_id" AS "authorId", array_remove(array_agg("category"."category_id"), NULL) AS "categoryIds" FROM "recipes" "recipes" LEFT JOIN "recipe_categories" "category" ON category."recipe_id" = recipes."id" GROUP BY "recipes"."id" ORDER BY "recipes"."id" ASC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'recipe_list_item_view_entity',
        'SELECT "recipes"."id" AS id, "recipes"."name" AS name, "recipes"."description" AS description, "recipes"."portions" AS portions, "recipes"."state" AS state, "recipes"."difficulty" AS difficulty, "recipes"."preparation_time" AS "preparationTime", "recipes"."author_id" AS "authorId", array_remove(array_agg("category"."category_id"), NULL) AS "categoryIds" FROM "recipes" "recipes" LEFT JOIN "recipe_categories" "category" ON category."recipe_id" = recipes."id" GROUP BY "recipes"."id" ORDER BY "recipes"."id" ASC',
      ],
    );
  }
}
