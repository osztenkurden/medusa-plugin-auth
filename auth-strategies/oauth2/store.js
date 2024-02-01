"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOAuth2StoreAuthRouter = exports.getOAuth2StoreStrategy = void 0;
const passport_oauth2_1 = require("passport-oauth2");
const Strategy_1 = require("../../core/passport/Strategy");
const types_1 = require("./types");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const validate_callback_1 = require("../../core/validate-callback");
function getOAuth2StoreStrategy(id) {
    const strategyName = `${types_1.OAUTH2_STORE_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_oauth2_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                authorizationURL: strategyOptions.authorizationURL,
                tokenURL: strategyOptions.tokenURL,
                clientID: strategyOptions.clientID,
                clientSecret: strategyOptions.clientSecret,
                callbackURL: strategyOptions.store.callbackUrl,
                passReqToCallback: true,
                scope: strategyOptions.scope,
            });
            this.container = container;
            this.configModule = configModule;
            this.strategyOptions = strategyOptions;
            this.strict = strict;
        }
        async validate(req, accessToken, refreshToken, profile) {
            if (this.strategyOptions.store.verifyCallback) {
                return await this.strategyOptions.store.verifyCallback(this.container, req, accessToken, refreshToken, profile, this.strict);
            }
            return await (0, validate_callback_1.validateStoreCallback)(profile, {
                container: this.container,
                strategyErrorIdentifier: 'oauth2',
                strict: this.strict,
                strategyName,
            });
        }
    };
}
exports.getOAuth2StoreStrategy = getOAuth2StoreStrategy;
/**
 * Return the router that hold the oauth2 store authentication routes
 * @param id
 * @param oauth2
 * @param configModule
 */
function getOAuth2StoreAuthRouter(id, oauth2, configModule) {
    var _a, _b;
    const strategyName = `${types_1.OAUTH2_STORE_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = oauth2.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/oauth2',
        authCallbackPath: (_b = oauth2.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/oauth2/cb',
        successRedirect: oauth2.store.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {},
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: oauth2.store.failureRedirect,
        },
        expiresIn: oauth2.store.expiresIn,
    });
}
exports.getOAuth2StoreAuthRouter = getOAuth2StoreAuthRouter;
//# sourceMappingURL=store.js.map