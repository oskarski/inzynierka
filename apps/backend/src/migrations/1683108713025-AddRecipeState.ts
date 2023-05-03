import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeState1683108713025 implements MigrationInterface {
  name = 'AddRecipeState1683108713025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "state" character varying NOT NULL DEFAULT 'draft'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "state"`);
  }
}
