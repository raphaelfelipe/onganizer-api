import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653434262004 implements MigrationInterface {
    name = 'initialMigration1653434262004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_ac65d744abc05279aee0b290857"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP COLUMN "postId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_ac65d744abc05279aee0b290857" FOREIGN KEY ("postId") REFERENCES "project_posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
