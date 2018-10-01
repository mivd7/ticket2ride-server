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
let BidController = class BidController {
    getBid(id) {
        return entity_1.default.findOne(id);
    }
    async allBids() {
        const bids = await entity_1.default.find();
        return { bids };
    }
    async updateBid(id, update) {
        const bid = await entity_1.default.findOne(id);
        if (!bid)
            throw new routing_controllers_1.NotFoundError('Cannot find bid');
        return entity_1.default.merge(bid, update).save();
    }
    createBid(ticketId, userId, bid) {
        console.log(userId);
        bid.ticket = Number(ticketId);
        bid.user = Number(userId);
        console.log(bid);
        return bid.save();
    }
};
__decorate([
    routing_controllers_1.Get('/bids/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BidController.prototype, "getBid", null);
__decorate([
    routing_controllers_1.Get('/bids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BidController.prototype, "allBids", null);
__decorate([
    routing_controllers_1.Put('/bids/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BidController.prototype, "updateBid", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/tickets/:ticketId/bids/:userId'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('ticketId')),
    __param(1, routing_controllers_1.Param('userId')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, entity_1.default]),
    __metadata("design:returntype", void 0)
], BidController.prototype, "createBid", null);
BidController = __decorate([
    routing_controllers_1.JsonController()
], BidController);
exports.default = BidController;
//# sourceMappingURL=controller.js.map