"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const oauth2_1 = __importDefault(require("../auth-strategies/oauth2"));
const google_1 = __importDefault(require("../auth-strategies/google"));
const facebook_1 = __importDefault(require("../auth-strategies/facebook"));
const linkedin_1 = __importDefault(require("../auth-strategies/linkedin"));
const firebase_1 = __importDefault(require("../auth-strategies/firebase"));
const auth0_1 = __importDefault(require("../auth-strategies/auth0"));
const azure_oidc_1 = __importDefault(require("../auth-strategies/azure-oidc"));
const steam_1 = __importDefault(require("../auth-strategies/steam"));
async function authStrategiesLoader(container, authOptions) {
    const configModule = container.resolve('configModule');
    const authOptions_ = Array.isArray(authOptions) ? authOptions : [authOptions];
    for (const opt of authOptions_) {
        await handleStrategyLoading(opt, configModule, container);
    }
}
exports.default = authStrategiesLoader;
async function handleStrategyLoading(opt, configModule, container) {
    const option = (0, types_1.handleOption)(opt, configModule, container);
    switch (option.type) {
        case 'azure_oidc':
            azure_oidc_1.default.load(container, configModule, option);
            break;
        case 'google':
            google_1.default.load(container, configModule, option);
            break;
        case 'facebook':
            facebook_1.default.load(container, configModule, option);
            break;
        case 'linkedin':
            linkedin_1.default.load(container, configModule, option);
            break;
        case 'firebase':
            firebase_1.default.load(container, configModule, option);
            break;
        case 'auth0':
            auth0_1.default.load(container, configModule, option);
            break;
        case 'oauth2':
            oauth2_1.default.load(container, configModule, option);
            break;
        case 'steam':
            steam_1.default.load(container, configModule, option);
            break;
    }
}
//# sourceMappingURL=index.js.map