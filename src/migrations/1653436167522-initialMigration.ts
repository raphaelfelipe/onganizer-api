import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653436167522 implements MigrationInterface {
    name = 'initialMigration1653436167522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "UQ_fcfafa02541603779efcb34532c" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "UQ_88fa53b9c141b2d77f356a8cc42" UNIQUE ("projectId")`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "FK_fcfafa02541603779efcb34532c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "FK_88fa53b9c141b2d77f356a8cc42" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "FK_88fa53b9c141b2d77f356a8cc42"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "FK_fcfafa02541603779efcb34532c"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "UQ_88fa53b9c141b2d77f356a8cc42"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "UQ_fcfafa02541603779efcb34532c"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP COLUMN "userId"`);
    }

}
