import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddViewForRecipeDetails1682757580600
  implements MigrationInterface
{
  name = 'AddViewForRecipeDetails1682757580600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "recipe_details_view_entity" AS SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."preparation_time" AS "preparationTime", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_agg(json_build_object('id', "ingredient"."id", 'name', "ingredient"."name", 'quantity', "recipeIngredients"."quantity", 'unit', "recipeIngredients"."unit")) AS "ingredients" FROM "recipe_ingredients" "recipeIngredients" INNER JOIN "recipes" "recipe" ON "recipeIngredients"."recipe_id" = "recipe"."id"  INNER JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'recipe_details_view_entity',
        'SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."preparation_time" AS "preparationTime", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_agg(json_build_object(\'id\', "ingredient"."id", \'name\', "ingredient"."name", \'quantity\', "recipeIngredients"."quantity", \'unit\', "recipeIngredients"."unit")) AS "ingredients" FROM "recipe_ingredients" "recipeIngredients" INNER JOIN "recipes" "recipe" ON "recipeIngredients"."recipe_id" = "recipe"."id"  INNER JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'recipe_details_view_entity', 'public'],
    );
    await queryRunner.query(`DROP VIEW "recipe_details_view_entity"`);
  }
}
