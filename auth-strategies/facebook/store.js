"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacebookStoreAuthRouter = exports.getFacebookStoreStrategy = void 0;
const passport_facebook_1 = require("passport-facebook");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
function getFacebookStoreStrategy(id) {
    const strategyName = `${types_1.FACEBOOK_STORE_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_facebook_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                clientID: strategyOptions.clientID,
                clientSecret: strategyOptions.clientSecret,
                callbackURL: strategyOptions.store.callbackUrl,
                passReqToCallback: true,
                profileFields: ['id', 'displayName', 'email', 'gender', 'name'],
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
                strategyErrorIdentifier: 'facebook',
                strict: this.strict,
                strategyName,
            });
        }
    };
}
exports.getFacebookStoreStrategy = getFacebookStoreStrategy;
/**
 * Return the router that hold the facebook store authentication routes
 * @param id
 * @param facebook
 * @param configModule
 */
function getFacebookStoreAuthRouter(id, facebook, configModule) {
    var _a, _b;
    const strategyName = `${types_1.FACEBOOK_STORE_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = facebook.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/facebook',
        authCallbackPath: (_b = facebook.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/facebook/cb',
        successRedirect: facebook.store.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {
            scope: ['email'],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: facebook.store.failureRedirect,
        },
        expiresIn: facebook.store.expiresIn,
    });
}
exports.getFacebookStoreAuthRouter = getFacebookStoreAuthRouter;
//# sourceMappingURL=store.js.map