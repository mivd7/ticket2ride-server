"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./logins/controller");
const controller_3 = require("./events/controller");
const controller_4 = require("./tickets/controller");
const controller_5 = require("./comments/controller");
const jwt_1 = require("./jwt");
const entity_1 = require("./users/entity");
const Koa = require("koa");
const http_1 = require("http");
const IO = require("socket.io");
const socketIoJwtAuth = require("socketio-jwt-auth");
const jwt_2 = require("./jwt");
const app = new Koa();
const server = new http_1.Server(app.callback());
exports.io = IO(server);
const port = process.env.PORT || 4000;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            try {
                return !!(token && jwt_1.verify(token));
            }
            catch (e) {
                throw new routing_controllers_1.BadRequestError(e);
            }
        }
        return false;
    },
    currentUserChecker: async (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            if (token) {
                const { id } = jwt_1.verify(token);
                return entity_1.User.findOne(id);
            }
        }
        return undefined;
    }
});
exports.io.use(socketIoJwtAuth.authenticate({ secret: jwt_2.secret }, async (payload, done) => {
    const user = await entity_1.User.findOne(payload.id);
    if (user)
        done(null, user);
    else
        done(null, false, `Invalid JWT user ID`);
}));
exports.io.on('connect', socket => {
    const name = socket.request.user.firstName;
    console.log(`User ${name} just connected`);
    socket.on('disconnect', () => {
        console.log(`User ${name} just disconnected`);
        const user = socket.request.user;
        return { user };
    });
});
db_1.default()
    .then(_ => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map