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
const entity_3 = require("../users/entity");
let EventController = class EventController {
    async allEvents() {
        const events = await entity_1.default.find();
        return { events };
    }
    getEvent(id) {
        return entity_1.default.findOne(id);
    }
    async createEvent(name, description, price, image, startdate, enddate) {
        const newEvent = new entity_1.default();
        newEvent.name = name;
        newEvent.price = price;
        newEvent.description = description;
        newEvent.image = image;
        newEvent.startdate = startdate;
        newEvent.enddate = enddate;
        return newEvent.save();
    }
    addTicket(event, user, title, price, description) {
        const newTicket = new entity_2.default;
        newTicket.title = title;
        newTicket.price = price;
        newTicket.description = description;
        newTicket.event = event;
        newTicket.users = user;
        return newTicket.save();
    }
};
__decorate([
    routing_controllers_1.Get('/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "allEvents", null);
__decorate([
    routing_controllers_1.Get('/events/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEvent", null);
__decorate([
    routing_controllers_1.Post('/events'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.BodyParam('name')),
    __param(1, routing_controllers_1.BodyParam('description')),
    __param(2, routing_controllers_1.BodyParam('price')),
    __param(3, routing_controllers_1.BodyParam('image')),
    __param(4, routing_controllers_1.BodyParam('startdate')),
    __param(5, routing_controllers_1.BodyParam('enddate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object, Date,
        Date]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    routing_controllers_1.Post(`/events/:eventId/tickets`),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Param('eventId')),
    __param(1, routing_controllers_1.CurrentUser()),
    __param(2, routing_controllers_1.BodyParam('title')),
    __param(3, routing_controllers_1.BodyParam('price')),
    __param(4, routing_controllers_1.BodyParam('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default,
        entity_3.default, String, Number, String]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addTicket", null);
EventController = __decorate([
    routing_controllers_1.JsonController()
], EventController);
exports.default = EventController;
//# sourceMappingURL=controller.js.map