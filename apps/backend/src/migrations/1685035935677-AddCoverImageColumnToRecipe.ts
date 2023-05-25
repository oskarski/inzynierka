import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoverImageColumnToRecipe1685035935677 implements MigrationInterface {
    name = 'AddCoverImageColumnToRecipe1685035935677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "coverImage" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "coverImage"`);
    }

}
