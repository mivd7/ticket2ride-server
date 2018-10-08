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
const entity_1 = require("../users/entity");
const entity_2 = require("../tickets/entity");
const entity_3 = require("./entity");
const class_validator_1 = require("class-validator");
class validMessage {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(2, 30),
    __metadata("design:type", String)
], validMessage.prototype, "message", void 0);
let CommentsController = class CommentsController {
    getComments(ticketId) {
        return entity_2.Ticket.query(`SELECT * FROM comments WHERE ticket_id=${ticketId}`);
    }
    getComment(id) {
        return entity_3.default.findOne(id);
    }
    async createComment(ticketId, comment, user) {
        const ticket = await entity_2.Ticket.findOne(ticketId);
        if (!ticket)
            throw new routing_controllers_1.NotFoundError('Ticket not Found!');
        const entity = await entity_3.default.create(comment);
        entity.ticket = ticket;
        entity.user = user;
        const newComment = await entity.save();
        const [commentsPayload] = await entity_3.default.query(`SELECT * FROM comments WHERE id=${newComment.id}`);
        return commentsPayload;
    }
};
__decorate([
    routing_controllers_1.Get('/tickets/:ticketId([0-9]+)/comments'),
    __param(0, routing_controllers_1.Param('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getComments", null);
__decorate([
    routing_controllers_1.Get('/comments/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getComment", null);
__decorate([
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post('/tickets/:ticketId([0-9]+)/comments'),
    __param(0, routing_controllers_1.Param('ticketId')),
    __param(1, routing_controllers_1.Body()),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, validMessage,
        entity_1.User]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "createComment", null);
CommentsController = __decorate([
    routing_controllers_1.JsonController()
], CommentsController);
exports.default = CommentsController;
//# sourceMappingURL=controller.js.map