"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const store_1 = require("./store");
__exportStar(require("./types"), exports);
__exportStar(require("./admin"), exports);
__exportStar(require("./store"), exports);
exports.default = {
    load: (container, configModule, options) => {
        var _a;
        const id = (_a = options.identifier) !== null && _a !== void 0 ? _a : options.type;
        if (options.admin) {
            const Clazz = (0, admin_1.getSteamAdminStrategy)(id);
            new Clazz(container, configModule, options, options.strict);
        }
        if (options.store) {
            const Clazz = (0, store_1.getSteamStoreStrategy)(id);
            new Clazz(container, configModule, options, options.strict);
        }
    },
    getRouter: (configModule, options) => {
        var _a;
        const id = (_a = options.identifier) !== null && _a !== void 0 ? _a : options.type;
        const routers = [];
        if (options.admin) {
            routers.push((0, admin_1.getSteamAdminAuthRouter)(id, options, configModule));
        }
        if (options.store) {
            routers.push((0, store_1.getSteamStoreAuthRouter)(id, options, configModule));
        }
        return routers;
    },
};
//# sourceMappingURL=index.js.map