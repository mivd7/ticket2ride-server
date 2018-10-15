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
const class_transformer_1 = require("class-transformer");
let Ticket = class Ticket extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Ticket.prototype, "timeOfCreation", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.ManyToOne(_ => entity_1.User, user => user.tickets, { cascade: true, eager: true }),
    __metadata("design:type", entity_1.User)
], Ticket.prototype, "user", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.ManyToOne(_ => entity_2.default, event => event.tickets, { onDelete: 'CASCADE' }),
    __metadata("design:type", entity_2.default)
], Ticket.prototype, "event", void 0);
__decorate([
    typeorm_1.OneToMany(_ => entity_3.default, comments => comments.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
Ticket = __decorate([
    typeorm_1.Entity()
], Ticket);
exports.Ticket = Ticket;
let TicketInfo = class TicketInfo extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TicketInfo.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], TicketInfo.prototype, "commentsReceived", void 0);
__decorate([
    typeorm_1.OneToOne(_ => Ticket, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Ticket)
], TicketInfo.prototype, "ticket", void 0);
TicketInfo = __decorate([
    typeorm_1.Entity()
], TicketInfo);
exports.TicketInfo = TicketInfo;
//# sourceMappingURL=entity.js.map