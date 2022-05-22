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
exports.Post_Comments = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const project_posts_entity_1 = require("./project_posts.entity");
let Post_Comments = class Post_Comments {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Post_Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Post_Comments.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Post_Comments.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => project_posts_entity_1.Project_Posts, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", project_posts_entity_1.Project_Posts)
], Post_Comments.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Post_Comments.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 250,
        nullable: false,
    }),
    __metadata("design:type", String)
], Post_Comments.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post_Comments.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Post_Comments.prototype, "updated_at", void 0);
Post_Comments = __decorate([
    (0, typeorm_1.Entity)()
], Post_Comments);
exports.Post_Comments = Post_Comments;
