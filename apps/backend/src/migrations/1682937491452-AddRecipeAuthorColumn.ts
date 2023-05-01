import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecipeAuthorColumn1682937491452 implements MigrationInterface {
  name = 'AddRecipeAuthorColumn1682937491452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" ADD "author_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD CONSTRAINT "FK_266ecb7f0041e1327919f36f964" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" DROP CONSTRAINT "FK_266ecb7f0041e1327919f36f964"`,
    );
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "author_id"`);
  }
}
