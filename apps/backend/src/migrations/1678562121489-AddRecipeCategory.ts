import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecipeCategory1678562121489 implements MigrationInterface {
    name = 'AddRecipeCategory1678562121489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_category" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1b4e81bf69aa6e8f3a14c4c2f6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipe_category"`);
    }

}
