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
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const entity_1 = require("../users/entity");
const entity_2 = require("../events/entity");
const entity_3 = require("../comments/entity");
let Ticket = class Ticket extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ticket.prototype, "ticketId", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", Object)
], Ticket.prototype, "picture", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_3.default, comments => comments.ticket, { eager: false }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_2.default, event => event.ticket, { eager: true }),
    __metadata("design:type", entity_2.default)
], Ticket.prototype, "event", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, user => user.ticket, { eager: true, cascade: true }),
    __metadata("design:type", entity_1.default)
], Ticket.prototype, "users", void 0);
Ticket = __decorate([
    typeorm_1.Entity()
], Ticket);
exports.default = Ticket;
//# sourceMappingURL=entity.js.map