import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDecimalValue1685278481724 implements MigrationInterface {
  name = 'AddDecimalValue1685278481724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "value" numeric(10,2) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD "value" integer NOT NULL`,
    );
  }
}
