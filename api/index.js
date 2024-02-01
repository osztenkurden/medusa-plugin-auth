"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@medusajs/medusa/dist/loaders/config"));
const oauth2_1 = __importDefault(require("../auth-strategies/oauth2"));
const google_1 = __importDefault(require("../auth-strategies/google"));
const facebook_1 = __importDefault(require("../auth-strategies/facebook"));
const linkedin_1 = __importDefault(require("../auth-strategies/linkedin"));
const firebase_1 = __importDefault(require("../auth-strategies/firebase"));
const auth0_1 = __importDefault(require("../auth-strategies/auth0"));
const azure_oidc_1 = __importDefault(require("../auth-strategies/azure-oidc"));
const steam_1 = __importDefault(require("../auth-strategies/steam"));
const types_1 = require("../types");
function default_1(rootDirectory, pluginOptions) {
    const configModule = (0, config_1.default)(rootDirectory);
    return loadRouters(configModule, pluginOptions);
}
exports.default = default_1;
function loadRouters(configModule, options) {
    const routers = [];
    const options_ = Array.isArray(options) ? options : [options];
    for (const opt of options_) {
        const option = (0, types_1.handleOption)(opt, configModule);
        switch (option.type) {
            case 'azure_oidc':
                routers.push(...azure_oidc_1.default.getRouter(configModule, option));
                break;
            case 'google':
                routers.push(...google_1.default.getRouter(configModule, option));
                break;
            case 'facebook':
                routers.push(...facebook_1.default.getRouter(configModule, option));
                break;
            case 'linkedin':
                routers.push(...linkedin_1.default.getRouter(configModule, option));
                break;
            case 'firebase':
                routers.push(...firebase_1.default.getRouter(configModule, option));
                break;
            case 'auth0':
                routers.push(...auth0_1.default.getRouter(configModule, option));
                break;
            case 'oauth2':
                routers.push(...oauth2_1.default.getRouter(configModule, option));
                break;
            case 'steam':
                routers.push(...steam_1.default.getRouter(configModule, option));
        }
    }
    return routers;
}
//# sourceMappingURL=index.js.map