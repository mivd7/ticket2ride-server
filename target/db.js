"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DefaultNamingStrategy_1 = require("typeorm/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("typeorm/util/StringUtils");
const entity_1 = require("./events/entity");
const entity_2 = require("./tickets/entity");
const entity_3 = require("./users/entity");
const entity_4 = require("./comments/entity");
class CustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : StringUtils_1.snakeCase(targetName) + 's';
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return StringUtils_1.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }
    columnNameCustomized(customName) {
        return customName;
    }
    relationName(propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    }
}
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
    entities: [
        entity_3.User,
        entity_3.Profile,
        entity_2.Ticket,
        entity_2.TicketInfo,
        entity_1.default,
        entity_4.default
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
})
    .then(_ => console.log('Connected to Postgres with TypeORM'));
//# sourceMappingURL=db.js.map