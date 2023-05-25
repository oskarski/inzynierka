import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedCoverImageColumnName1685036370052
  implements MigrationInterface
{
  name = 'FixedCoverImageColumnName1685036370052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" RENAME COLUMN "coverImage" TO "cover_image"`,
    );
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "cover_image"`);
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "cover_image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "cover_image"`);
    await queryRunner.query(`ALTER TABLE "recipes" ADD "cover_image" integer`);
    await queryRunner.query(
      `ALTER TABLE "recipes" RENAME COLUMN "cover_image" TO "coverImage"`,
    );
  }
}
