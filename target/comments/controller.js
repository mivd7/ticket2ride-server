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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const entity_2 = require("../tickets/entity");
let CommentController = class CommentController {
    async allComments() {
        const comments = await entity_1.default.find();
        return { comments };
    }
    getComment(id) {
        return entity_1.default.findOne(id);
    }
    addComment(ticket, commentId, content) {
        const newComment = new entity_1.default;
        newComment.commentId = commentId;
        newComment.content = content;
        newComment.ticket = ticket;
        return newComment.save();
    }
};
__decorate([
    routing_controllers_1.Get('/comments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "allComments", null);
__decorate([
    routing_controllers_1.Get('/comments/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getComment", null);
__decorate([
    routing_controllers_1.Post(`/comments/:commentId`),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('ticket')),
    __param(1, routing_controllers_1.BodyParam('commentId')),
    __param(2, routing_controllers_1.BodyParam('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default, Number, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "addComment", null);
CommentController = __decorate([
    routing_controllers_1.JsonController()
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=controller.js.map