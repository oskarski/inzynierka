import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShoppingList1685469981196 implements MigrationInterface {
    name = 'AddShoppingList1685469981196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, "quantity" numeric NOT NULL, "unit" character varying(20) NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_87d9431f2ea573a79370742b474" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_b11478773d3223c61cf98a6d064" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_list" ADD CONSTRAINT "FK_f0f2a36a2ce66ff59011413df0e" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_f0f2a36a2ce66ff59011413df0e"`);
        await queryRunner.query(`ALTER TABLE "shopping_list" DROP CONSTRAINT "FK_b11478773d3223c61cf98a6d064"`);
        await queryRunner.query(`DROP TABLE "shopping_list"`);
    }

}
