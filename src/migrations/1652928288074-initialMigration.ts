import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1652928288074 implements MigrationInterface {
    name = 'initialMigration1652928288074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_admin" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "userId" uuid, CONSTRAINT "REL_f8a889c4362d78f056960ca6da" UNIQUE ("userId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, "objective" character varying(1000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donation" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "project_id" uuid NOT NULL, "value" integer NOT NULL, "message" character varying(250) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "projectId" uuid, CONSTRAINT "REL_284a4db7a442587ef3e3c44ff4" UNIQUE ("projectId"), CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_projects" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "project_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "projectId" uuid, CONSTRAINT "REL_fcfafa02541603779efcb34532" UNIQUE ("userId"), CONSTRAINT "REL_88fa53b9c141b2d77f356a8cc4" UNIQUE ("projectId"), CONSTRAINT "PK_6ab431f58c54a58706f07270b78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_posts" ("id" uuid NOT NULL, "project_id" uuid NOT NULL, "title" character varying(50) NOT NULL, "content" character varying(1000) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" uuid, CONSTRAINT "PK_ed627273b2753a62a68a817055b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_comments" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "post_id" uuid NOT NULL, "comment" character varying(250) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_2e99e04b4a1b31de6f833c18ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_user" ("id" SERIAL NOT NULL, "users_id" uuid NOT NULL, "projects_id" uuid NOT NULL, CONSTRAINT "PK_1cf56b10b23971cfd07e4fc6126" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_063499388657e648418470a439a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "FK_fcfafa02541603779efcb34532c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_projects" ADD CONSTRAINT "FK_88fa53b9c141b2d77f356a8cc42" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_posts" ADD CONSTRAINT "FK_d27ca00d79f2d85bd02550adcf5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_ac65d744abc05279aee0b290857" FOREIGN KEY ("postId") REFERENCES "project_posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_ac65d744abc05279aee0b290857"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_62817b3571ec31e552a3cae4e1c"`);
        await queryRunner.query(`ALTER TABLE "project_posts" DROP CONSTRAINT "FK_d27ca00d79f2d85bd02550adcf5"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "FK_88fa53b9c141b2d77f356a8cc42"`);
        await queryRunner.query(`ALTER TABLE "follow_projects" DROP CONSTRAINT "FK_fcfafa02541603779efcb34532c"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44"`);
        await queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_063499388657e648418470a439a"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`DROP TABLE "project_user"`);
        await queryRunner.query(`DROP TABLE "post_comments"`);
        await queryRunner.query(`DROP TABLE "project_posts"`);
        await queryRunner.query(`DROP TABLE "follow_projects"`);
        await queryRunner.query(`DROP TABLE "donation"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
