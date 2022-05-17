import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1652825322755 implements MigrationInterface {
    name = 'initialMigration1652825322755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
