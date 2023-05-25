import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoverImageToRecipeDetailsView1685037456481
  implements MigrationInterface
{
  name = 'AddCoverImageToRecipeDetailsView1685037456481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'recipe_details_view_entity', 'public'],
    );
    await queryRunner.query(`DROP VIEW "recipe_details_view_entity"`);
    await queryRunner.query(`CREATE VIEW "recipe_details_view_entity" AS SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."state" AS state, "recipe"."difficulty" AS difficulty, "recipe"."review" AS review, "recipe"."preparation_time" AS "preparationTime", "recipe"."author_id" AS "authorId", "recipe"."cover_image" AS "coverImage", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_remove(
                  array_agg(
                    DISTINCT
                    CASE
                    WHEN 
                      "ingredient"."id" IS NOT NULL AND
                      "ingredient"."name" IS NOT NULL AND 
                      "recipeIngredients".quantity IS NOT NULL AND
                      "recipeIngredients".unit IS NOT NULL
                    THEN jsonb_build_object(
                      'id', "ingredient"."id",
                      'name', "ingredient"."name",
                      'quantity',
                      "recipeIngredients".quantity,
                      'unit', "recipeIngredients".unit
                    )
                    END
                  ), NULL
                 ) AS "ingredients" FROM "recipes" "recipe" LEFT JOIN "recipe_ingredients" "recipeIngredients" ON "recipe"."id" = "recipeIngredients"."recipe_id"  LEFT JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'recipe_details_view_entity',
        'SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."state" AS state, "recipe"."difficulty" AS difficulty, "recipe"."review" AS review, "recipe"."preparation_time" AS "preparationTime", "recipe"."author_id" AS "authorId", "recipe"."cover_image" AS "coverImage", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_remove(\n                  array_agg(\n                    DISTINCT\n                    CASE\n                    WHEN \n                      "ingredient"."id" IS NOT NULL AND\n                      "ingredient"."name" IS NOT NULL AND \n                      "recipeIngredients".quantity IS NOT NULL AND\n                      "recipeIngredients".unit IS NOT NULL\n                    THEN jsonb_build_object(\n                      \'id\', "ingredient"."id",\n                      \'name\', "ingredient"."name",\n                      \'quantity\',\n                      "recipeIngredients".quantity,\n                      \'unit\', "recipeIngredients".unit\n                    )\n                    END\n                  ), NULL\n                 ) AS "ingredients" FROM "recipes" "recipe" LEFT JOIN "recipe_ingredients" "recipeIngredients" ON "recipe"."id" = "recipeIngredients"."recipe_id"  LEFT JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'recipe_details_view_entity', 'public'],
    );
    await queryRunner.query(`DROP VIEW "recipe_details_view_entity"`);
    await queryRunner.query(`CREATE VIEW "recipe_details_view_entity" AS SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."state" AS state, "recipe"."difficulty" AS difficulty, "recipe"."review" AS review, "recipe"."preparation_time" AS "preparationTime", "recipe"."author_id" AS "authorId", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_remove(
                  array_agg(
                    DISTINCT
                    CASE
                    WHEN 
                      "ingredient"."id" IS NOT NULL AND
                      "ingredient"."name" IS NOT NULL AND 
                      "recipeIngredients".quantity IS NOT NULL AND
                      "recipeIngredients".unit IS NOT NULL
                    THEN jsonb_build_object(
                      'id', "ingredient"."id",
                      'name', "ingredient"."name",
                      'quantity',
                      "recipeIngredients".quantity,
                      'unit', "recipeIngredients".unit
                    )
                    END
                  ), NULL
                 ) AS "ingredients" FROM "recipes" "recipe" LEFT JOIN "recipe_ingredients" "recipeIngredients" ON "recipe"."id" = "recipeIngredients"."recipe_id"  LEFT JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'recipe_details_view_entity',
        'SELECT "recipe"."id" AS id, "recipe"."name" AS name, "recipe"."description" AS description, "recipe"."portions" AS portions, "recipe"."instructions" AS instructions, "recipe"."state" AS state, "recipe"."difficulty" AS difficulty, "recipe"."review" AS review, "recipe"."preparation_time" AS "preparationTime", "recipe"."author_id" AS "authorId", array_remove(array_agg(DISTINCT "recipeCategories"."category_id"), NULL) AS "categoryIds", array_remove(\n                  array_agg(\n                    DISTINCT\n                    CASE\n                    WHEN \n                      "ingredient"."id" IS NOT NULL AND\n                      "ingredient"."name" IS NOT NULL AND \n                      "recipeIngredients".quantity IS NOT NULL AND\n                      "recipeIngredients".unit IS NOT NULL\n                    THEN jsonb_build_object(\n                      \'id\', "ingredient"."id",\n                      \'name\', "ingredient"."name",\n                      \'quantity\',\n                      "recipeIngredients".quantity,\n                      \'unit\', "recipeIngredients".unit\n                    )\n                    END\n                  ), NULL\n                 ) AS "ingredients" FROM "recipes" "recipe" LEFT JOIN "recipe_ingredients" "recipeIngredients" ON "recipe"."id" = "recipeIngredients"."recipe_id"  LEFT JOIN "ingredients" "ingredient" ON "recipeIngredients"."ingredient_id" = "ingredient"."id"  LEFT JOIN "recipe_categories" "recipeCategories" ON "recipeCategories"."recipe_id" = "recipe"."id" GROUP BY "recipe"."id"',
      ],
    );
  }
}
