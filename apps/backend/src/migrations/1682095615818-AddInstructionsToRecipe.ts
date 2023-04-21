import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInstructionsToRecipe1682095615818
  implements MigrationInterface
{
  name = 'AddInstructionsToRecipe1682095615818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "instructions" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "instructions"`);
  }
}
