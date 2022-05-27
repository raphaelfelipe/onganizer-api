import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653588591795 implements MigrationInterface {
    name = 'initialMigration1653588591795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_063499388657e648418470a439a"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "REL_284a4db7a442587ef3e3c44ff4"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "projectId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donation" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "REL_284a4db7a442587ef3e3c44ff4" UNIQUE ("projectId")`);
        await queryRunner.query(`ALTER TABLE "donation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_063499388657e648418470a439a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
