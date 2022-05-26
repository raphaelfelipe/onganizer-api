"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMigration1653588591795 = void 0;
class initialMigration1653588591795 {
    constructor() {
        this.name = 'initialMigration1653588591795';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_063499388657e648418470a439a"`);
            yield queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44"`);
            yield queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "donation" DROP CONSTRAINT "REL_284a4db7a442587ef3e3c44ff4"`);
            yield queryRunner.query(`ALTER TABLE "donation" DROP COLUMN "projectId"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "donation" ADD "projectId" uuid`);
            yield queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "REL_284a4db7a442587ef3e3c44ff4" UNIQUE ("projectId")`);
            yield queryRunner.query(`ALTER TABLE "donation" ADD "userId" uuid`);
            yield queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_284a4db7a442587ef3e3c44ff44" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "donation" ADD CONSTRAINT "FK_063499388657e648418470a439a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.initialMigration1653588591795 = initialMigration1653588591795;
