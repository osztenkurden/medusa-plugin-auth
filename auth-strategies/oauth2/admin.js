"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOAuth2AdminAuthRouter = exports.getOAuth2AdminStrategy = void 0;
const passport_oauth2_1 = require("passport-oauth2");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
function getOAuth2AdminStrategy(id) {
    const strategyName = `${types_1.OAUTH2_ADMIN_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_oauth2_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                authorizationURL: strategyOptions.authorizationURL,
                tokenURL: strategyOptions.tokenURL,
                clientID: strategyOptions.clientID,
                clientSecret: strategyOptions.clientSecret,
                callbackURL: strategyOptions.admin.callbackUrl,
                passReqToCallback: true,
                scope: strategyOptions.scope,
            });
            this.container = container;
            this.configModule = configModule;
            this.strategyOptions = strategyOptions;
            this.strict = strict;
        }
        async validate(req, accessToken, refreshToken, profile) {
            if (this.strategyOptions.admin.verifyCallback) {
                return await this.strategyOptions.admin.verifyCallback(this.container, req, accessToken, refreshToken, profile, this.strict);
            }
            return await (0, validate_callback_1.validateAdminCallback)(profile, {
                container: this.container,
                strategyErrorIdentifier: 'oauth2',
                strict: this.strict,
                strategyName,
            });
        }
    };
}
exports.getOAuth2AdminStrategy = getOAuth2AdminStrategy;
/**
 * Return the router that hold the oauth2 admin authentication routes
 * @param id
 * @param oauth2
 * @param configModule
 */
function getOAuth2AdminAuthRouter(id, oauth2, configModule) {
    var _a, _b;
    const strategyName = `${types_1.OAUTH2_ADMIN_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = oauth2.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/oauth2',
        authCallbackPath: (_b = oauth2.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/oauth2/cb',
        successRedirect: oauth2.admin.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {},
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: oauth2.admin.failureRedirect,
        },
        expiresIn: oauth2.admin.expiresIn,
    });
}
exports.getOAuth2AdminAuthRouter = getOAuth2AdminAuthRouter;
//# sourceMappingURL=admin.js.map