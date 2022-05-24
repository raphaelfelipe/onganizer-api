import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1653400819072 implements MigrationInterface {
    name = 'initialMigration1653400819072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_users_user" ("projectId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_198c78e84c3bcdb0dc182e6d1e0" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9666c6dcd769c698bed4aa4bf5" ON "project_users_user" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8300efd87679e1e21532be980" ON "project_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_admin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_f8300efd87679e1e21532be9808" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_f8300efd87679e1e21532be9808"`);
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_admin" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8300efd87679e1e21532be980"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9666c6dcd769c698bed4aa4bf5"`);
        await queryRunner.query(`DROP TABLE "project_users_user"`);
    }

}
