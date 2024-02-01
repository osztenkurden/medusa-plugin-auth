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
__exportStar(require("./admin"), exports);
__exportStar(require("./store"), exports);
__exportStar(require("./types"), exports);
exports.default = {
    load: (container, configModule, option) => {
        var _a;
        const id = (_a = option.identifier) !== null && _a !== void 0 ? _a : option.type;
        if (option.admin) {
            const Clazz = (0, admin_1.getAuth0AdminStrategy)(id);
            new Clazz(container, configModule, option, option.strict);
        }
        if (option.store) {
            const Clazz = (0, store_1.getAuth0StoreStrategy)(id);
            new Clazz(container, configModule, option, option.strict);
        }
    },
    getRouter: (configModule, option) => {
        var _a;
        const routers = [];
        const id = (_a = option.identifier) !== null && _a !== void 0 ? _a : option.type;
        if (option.admin) {
            routers.push((0, admin_1.getAuth0AdminAuthRouter)(id, option, configModule));
        }
        if (option.store) {
            routers.push((0, store_1.getAuth0StoreAuthRouter)(id, option, configModule));
        }
        return routers;
    },
};
//# sourceMappingURL=index.js.map