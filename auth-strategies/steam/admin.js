"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSteamAdminAuthRouter = exports.getSteamAdminStrategy = void 0;
const passport_steam_1 = require("passport-steam");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
function getSteamAdminStrategy(id) {
    const strategyName = `${types_1.STEAM_ADMIN_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_steam_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                returnURL: strategyOptions.admin.callbackUrl,
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
            if (this.strategyOptions.admin.verifyCallback) {
                return await this.strategyOptions.admin.verifyCallback(this.container, req, identifier, profile, this.strict);
            }
            return await (0, validate_callback_1.validateAdminCallback)(Object.assign(Object.assign({}, profile), { emails: [{ value: '' }] }), {
                container: this.container,
                strategyErrorIdentifier: 'steam',
                strict: this.strict,
                strategyName
            });
        }
    };
}
exports.getSteamAdminStrategy = getSteamAdminStrategy;
/**
 * Return the router that hold the steam admin authentication routes
 * @param steam
 * @param configModule
 */
function getSteamAdminAuthRouter(id, steam, configModule) {
    var _a, _b;
    const strategyName = `${types_1.STEAM_ADMIN_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = steam.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/steam',
        authCallbackPath: (_b = steam.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/steam/cb',
        successRedirect: steam.admin.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {},
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: steam.admin.failureRedirect,
        },
        expiresIn: steam.admin.expiresIn,
    });
}
exports.getSteamAdminAuthRouter = getSteamAdminAuthRouter;
//# sourceMappingURL=admin.js.map