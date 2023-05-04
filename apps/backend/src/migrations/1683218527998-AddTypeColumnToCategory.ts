import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeColumnToCategory1683218527998 implements MigrationInterface {
    name = 'AddTypeColumnToCategory1683218527998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."categories_type_enum" AS ENUM('dish-type', 'cuisine-type', 'diet-type', 'other')`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "type" "public"."categories_type_enum" NOT NULL DEFAULT 'other'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."categories_type_enum"`);
    }

}
