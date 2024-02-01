"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkedinAdminAuthRouter = exports.getLinkedinAdminStrategy = void 0;
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
function getLinkedinAdminStrategy(id) {
    const strategyName = `${types_1.LINKEDIN_ADMIN_STRATEGY_NAME}_${id}`;
    return class extends (0, Strategy_1.PassportStrategy)(passport_linkedin_oauth2_1.Strategy, strategyName) {
        constructor(container, configModule, strategyOptions, strict) {
            super({
                clientID: strategyOptions.clientID,
                clientSecret: strategyOptions.clientSecret,
                callbackURL: strategyOptions.admin.callbackUrl,
                passReqToCallback: true,
                scope: ['r_emailaddress'],
                state: true,
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
                strategyErrorIdentifier: 'linkedin',
                strict: this.strict,
                strategyName,
            });
        }
    };
}
exports.getLinkedinAdminStrategy = getLinkedinAdminStrategy;
/**
 * Return the router that hold the linkedin admin authentication routes
 * @param id
 * @param linkedin
 * @param configModule
 */
function getLinkedinAdminAuthRouter(id, linkedin, configModule) {
    var _a, _b;
    const strategyName = `${types_1.LINKEDIN_ADMIN_STRATEGY_NAME}_${id}`;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = linkedin.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/linkedin',
        authCallbackPath: (_b = linkedin.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/linkedin/cb',
        successRedirect: linkedin.admin.successRedirect,
        strategyName,
        passportAuthenticateMiddlewareOptions: {
            scope: [
                'https://www.linkedinapis.com/auth/userinfo.email',
                'https://www.linkedinapis.com/auth/userinfo.profile',
            ],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: linkedin.admin.failureRedirect,
        },
        expiresIn: linkedin.admin.expiresIn,
    });
}
exports.getLinkedinAdminAuthRouter = getLinkedinAdminAuthRouter;
//# sourceMappingURL=admin.js.map