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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const index_1 = require("../index");
let UserController = class UserController {
    async signup(data) {
        const { password } = data, rest = __rest(data, ["password"]);
        const entity = entity_1.User.create(rest);
        await entity.setPassword(password);
        const user = await entity.save();
        await entity_1.Profile.create({ user, userName: `${user.firstName} ${user.lastName}` }).save();
        index_1.io.emit('action', {
            type: 'ADD_USER',
            payload: entity
        });
        return user;
    }
    getUser(id) {
        return entity_1.User.findOne(id);
    }
    async getUserName(id) {
        const profile = await entity_1.Profile.findOne(id);
        return profile;
    }
    allUsers() {
        return entity_1.User.find();
    }
};
__decorate([
    routing_controllers_1.Post('/users'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    routing_controllers_1.Get('/users/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    routing_controllers_1.Get('/profiles/:id([0-9]+)'),
    __param(0, routing_controllers_1.BodyParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserName", null);
__decorate([
    routing_controllers_1.Get('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "allUsers", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.default = UserController;
//# sourceMappingURL=controller.js.map