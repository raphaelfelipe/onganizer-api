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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const commentDelete_service_1 = __importDefault(require("../../services/posts/commentDelete.service"));
const createComment_service_1 = __importDefault(require("../../services/posts/createComment.service"));
const listAllPostCommentaries_service_1 = __importDefault(require("../../services/posts/listAllPostCommentaries.service"));
const listCommentById_service_1 = __importDefault(require("../../services/posts/listCommentById.service"));
const listPost_service_1 = __importDefault(require("../../services/posts/listPost.service"));
const postCommentsUpdate_service_1 = __importDefault(require("../../services/posts/postCommentsUpdate.service"));
const postDelete_service_1 = __importDefault(require("../../services/posts/postDelete.service"));
const postUpdate_service_1 = __importDefault(require("../../services/posts/postUpdate.service"));
const followProject_service_1 = __importDefault(require("../../services/projects/followProject.service"));
const followProjectDelete_service_1 = __importDefault(require("../../services/projects/followProjectDelete.service"));
const listProjectPosts_service_1 = __importDefault(require("../../services/projects/listProjectPosts.service"));
const postCreate_service_1 = __importDefault(require("../../services/projects/postCreate.service"));
const projectCreate_service_1 = __importDefault(require("../../services/projects/projectCreate.service"));
const createUser_service_1 = __importDefault(require("../../services/users/createUser.service"));
const userListMeFeed_service_1 = __importDefault(require("../../services/users/userListMeFeed.service"));
describe("posts tests", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => {
            console.log("Error during DataSource initialisation", error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    const user_email = "test@gmail.com";
    const user_name = "testName";
    const user_password = "HiIamAPassword";
    const user_description = "Test description";
    let user_id;
    const project_name = "project test";
    const project_description = "project test decription";
    const project_objective = "project test objective";
    let project_id;
    let title = "Post title test";
    let content = "Post content test";
    let id;
    let comment = "test commentary";
    let comment_id;
    test("Should create a new post in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = { email: user_email, name: user_name, password: user_password, description: user_description };
        const userCreate = yield (0, createUser_service_1.default)(userData);
        user_id = userCreate === null || userCreate === void 0 ? void 0 : userCreate.id;
        const projectData = { user_id, name: project_name, description: project_description, objective: project_objective };
        const projectCreate = yield (0, projectCreate_service_1.default)(projectData);
        project_id = projectCreate.id;
        const postData = { project_id, title, content };
        const testData = yield (0, postCreate_service_1.default)(postData);
        id = testData.id;
        expect(testData).toHaveProperty("id");
        expect(testData).toHaveProperty("created_at");
        expect(testData).toHaveProperty("updated_at");
        expect(testData).toHaveProperty("project");
        expect(testData).toEqual(expect.objectContaining({
            title,
            content,
        }));
    }));
    test("Should list post by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, listPost_service_1.default)(id);
        expect(testData).toHaveProperty("id");
        expect(testData).toHaveProperty("created_at");
        expect(testData).toHaveProperty("updated_at");
        expect(testData).toEqual(expect.objectContaining({
            title,
            content,
        }));
    }));
    test("Should list all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const postData = { project_id, title, content };
        yield (0, postCreate_service_1.default)(postData);
        const testData = yield (0, listProjectPosts_service_1.default)({ id: project_id });
        expect(testData[0]).toHaveProperty("id");
        expect(testData[0]).toHaveProperty("created_at");
        expect(testData[0]).toHaveProperty("updated_at");
        expect(testData[0]).toEqual(expect.objectContaining({
            title,
            content,
        }));
        expect(testData.length).toEqual(2);
    }));
    test("User should be able to follow a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, followProject_service_1.default)({ project_id, user_id });
        expect(testData).toHaveProperty("id");
        expect(testData).toEqual(expect.objectContaining({
            user_id,
            project_id,
        }));
    }));
    test("Should list post by projects the user follows", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, userListMeFeed_service_1.default)(user_id);
        expect(testData[0]).toHaveProperty("id");
        expect(testData[0]).toHaveProperty("created_at");
        expect(testData[0]).toHaveProperty("updated_at");
        expect(testData[0]).toEqual(expect.objectContaining({
            title,
            content,
        }));
        expect(testData.length).toEqual(2);
    }));
    test("User should be able to unfollow a project", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, followProjectDelete_service_1.default)({ project_id, user_id });
        expect(testData).toEqual(true);
    }));
    test("User should be able to make a comment on a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentaryData = { post_id: id, user_id, comment };
        const testData = yield (0, createComment_service_1.default)(commentaryData);
        comment_id = testData.id;
        expect(testData).toHaveProperty("id");
        expect(testData).toHaveProperty("created_at");
        expect(testData).toHaveProperty("updated_at");
        expect(testData).toEqual(expect.objectContaining({
            user_id,
            post_id: id,
            comment,
        }));
    }));
    test("User should be able to make a comment on a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentaryData = { post_id: id, user_id, comment: "teste 2" };
        const newComment = yield (0, createComment_service_1.default)(commentaryData);
        const testData = yield (0, listAllPostCommentaries_service_1.default)(id);
        expect(testData[0]).toHaveProperty("id");
        expect(testData[0]).toHaveProperty("created_at");
        expect(testData[0]).toHaveProperty("updated_at");
        expect(testData[0]).toEqual(expect.objectContaining({
            user_id,
            post_id: id,
            comment,
        }));
        expect(testData.length).toEqual(2);
    }));
    test("Should list comment by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, listCommentById_service_1.default)(comment_id);
        expect(testData).toHaveProperty("id");
        expect(testData).toHaveProperty("created_at");
        expect(testData).toHaveProperty("updated_at");
        expect(testData).toEqual(expect.objectContaining({
            comment
        }));
    }));
    test("User should be able to update a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        comment = "test commentary updated";
        const commentaryData = { id: comment_id, comment };
        const testData = yield (0, postCommentsUpdate_service_1.default)(commentaryData);
        expect(testData.UpdatedInfo).toEqual(expect.objectContaining({
            comment,
        }));
        expect(testData.message).toEqual('Comment successfully updated');
    }));
    test("User should be able to delete a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentaryData = { id: comment_id };
        const testData = yield (0, commentDelete_service_1.default)(commentaryData);
        expect(testData).toEqual(true);
    }));
    test("User should be able to update a post", () => __awaiter(void 0, void 0, void 0, function* () {
        title = "Post title test";
        content = "Post content test";
        const postData = { id, title, content };
        const testData = yield (0, postUpdate_service_1.default)(postData);
        console.log(testData);
        expect(testData.UpdatedInfo).toEqual(expect.objectContaining({
            title,
            content
        }));
        expect(testData.message).toEqual("Post successfully updated");
    }));
    test("User should be able to delete a post", () => __awaiter(void 0, void 0, void 0, function* () {
        const testData = yield (0, postDelete_service_1.default)({ id });
        expect(testData).toEqual(true);
    }));
});
