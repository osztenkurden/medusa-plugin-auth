"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSteamStoreAuthRouter = exports.getSteamStoreStrategy = void 0;
const passport_steam_1 = require("passport-steam");
const Strategy_1 = require("../../core/passport/Strategy");
const types_1 = require("./types");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const validate_callback_1 = require("../../core/validate-callback");
function getSteamStoreStrategy(id) {
    const strategyName = `${types_1.STEAM_STORE_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_steam_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                returnURL: strategyOptions.store.callbackUrl,
                realm: strategyOptions.realm,
                apiKey: strategyOptions.apiKey,
                passReqToCallback: true,
            });
            this.container = container;
            this.configModule = configModule;
            this.strategyOptions = strategyOptions;
            this.strict = strict;
        }
        async validate(req, identifier, profile) {
            if (this.strategyOptions.store.verifyCallback) {
                return await this.strategyOptions.store.verifyCallback(this.container, req, identifier, profile, this.strict);
            }
            return await (0, validate_callback_1.validateStoreCallback)(profile, {
                container: this.container,
                strategyErrorIdentifier: 'steam',
                strict: this.strict,
                strategyName
            });
        }
    };
}
exports.getSteamStoreStrategy = getSteamStoreStrategy;
/**
 * Return the router that hold the steam store authentication routes
 * @param steam
 * @param configModule
 */
function getSteamStoreAuthRouter(id, steam, configModule) {
    var _a, _b;
    const strategyName = `${types_1.STEAM_STORE_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = steam.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/steam',
        authCallbackPath: (_b = steam.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/steam/cb',
        successRedirect: steam.store.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {},
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: steam.store.failureRedirect,
        },
        expiresIn: steam.store.expiresIn,
    });
}
exports.getSteamStoreAuthRouter = getSteamStoreAuthRouter;
//# sourceMappingURL=store.js.map