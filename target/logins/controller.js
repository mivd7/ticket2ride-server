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
const jwt_1 = require("../jwt");
const entity_1 = require("../users/entity");
const class_validator_1 = require("class-validator");
class AuthenticatePayload {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], AuthenticatePayload.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    __metadata("design:type", String)
], AuthenticatePayload.prototype, "password", void 0);
let LoginController = class LoginController {
    async authenticate({ email, password }) {
        const user = await entity_1.User.findOne({ where: { email } });
        if (!user || !user.id)
            throw new routing_controllers_1.BadRequestError('A user with this email does not exist');
        if (!await user.checkPassword(password))
            throw new routing_controllers_1.BadRequestError('The password is not correct');
        const jwt = jwt_1.sign({ id: user.id });
        return { jwt };
    }
};
__decorate([
    routing_controllers_1.Post('/logins'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticatePayload]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "authenticate", null);
LoginController = __decorate([
    routing_controllers_1.JsonController()
], LoginController);
exports.default = LoginController;
//# sourceMappingURL=controller.js.map