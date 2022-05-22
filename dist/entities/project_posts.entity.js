"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project_Posts = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const project_entity_1 = require("./project.entity");
let Project_Posts = class Project_Posts {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Project_Posts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => project_entity_1.Project, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", project_entity_1.Project)
], Project_Posts.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Project_Posts.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Project_Posts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1000,
        nullable: false,
    }),
    __metadata("design:type", String)
], Project_Posts.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project_Posts.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project_Posts.prototype, "updated_at", void 0);
Project_Posts = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], Project_Posts);
exports.Project_Posts = Project_Posts;
