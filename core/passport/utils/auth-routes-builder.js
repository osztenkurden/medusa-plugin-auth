"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportAuthRoutesBuilder = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const auth_callback_middleware_1 = require("../../auth-callback-middleware");
/**
 * Build and return a router including the different route and configuration for a passport strategy
 * @param domain
 * @param configModule
 * @param authPath The path used to start the auth process e.g /admin/auth/google
 * @param authCallbackPath The pass used as the callback handler
 * @param strategyName The name use the define the strategy
 * @param passportAuthenticateMiddlewareOptions The options apply to the passport strategy on the auth path
 * @param passportCallbackAuthenticateMiddlewareOptions The options apply to the passport strategy on the callback auth path
 * @param expiresIn
 * @param successRedirect
 */
function passportAuthRoutesBuilder({ domain, configModule, authPath, strategyName, passportAuthenticateMiddlewareOptions, passportCallbackAuthenticateMiddlewareOptions, successRedirect, authCallbackPath, expiresIn, }) {
    const router = (0, express_1.Router)();
    const defaultRedirect = successRedirect;
    let successAction;
    const corsOptions = {
        origin: domain === 'admin'
            ? configModule.projectConfig.admin_cors.split(',')
            : configModule.projectConfig.store_cors.split(','),
        credentials: true,
    };
    router.get(authPath, (0, cors_1.default)(corsOptions));
    /* necessary if you are using non medusajs client such as a pure axios call, axios initially requests options and then get */
    router.options(authPath, (0, cors_1.default)(corsOptions));
    router.get(authPath, (req, res, next) => {
        // Allow to override the successRedirect by passing a query param `?redirectTo=your_url`
        successAction = successActionHandlerFactory(req, domain, configModule, defaultRedirect, expiresIn);
        next();
    }, passport_1.default.authenticate(strategyName, Object.assign(Object.assign({}, passportAuthenticateMiddlewareOptions), { session: false })));
    const callbackHandler = (0, auth_callback_middleware_1.authCallbackMiddleware)((req, res) => successAction(req, res));
    router.get(authCallbackPath, (0, cors_1.default)(corsOptions));
    router.get(authCallbackPath, (req, res, next) => {
        if (req.user) {
            return callbackHandler(req, res);
        }
        next();
    }, function (req, res, next) {
        passport_1.default.authenticate(strategyName, Object.assign({}, passportCallbackAuthenticateMiddlewareOptions, {
            session: false,
            failureRedirect: false,
        }), (err, user, options) => {
            var _a;
            if (options === null || options === void 0 ? void 0 : options.msg) {
                if (passportCallbackAuthenticateMiddlewareOptions === null || passportCallbackAuthenticateMiddlewareOptions === void 0 ? void 0 : passportCallbackAuthenticateMiddlewareOptions.failureRedirect) {
                    return res.redirect(passportCallbackAuthenticateMiddlewareOptions.failureRedirect +
                        '?message=' +
                        options.msg);
                }
                else {
                    return res.status(401).json({ message: options.msg });
                }
            }
            (_a = req.user) !== null && _a !== void 0 ? _a : (req.user = user);
            return callbackHandler(req, res);
        })(req, res, next);
    });
    return router;
}
exports.passportAuthRoutesBuilder = passportAuthRoutesBuilder;
function successActionHandlerFactory(req, domain, configModule, defaultRedirect, expiresIn) {
    const returnAccessToken = req.query.returnAccessToken == 'true';
    const redirectUrl = (req.query.redirectTo ? req.query.redirectTo : defaultRedirect);
    if (returnAccessToken) {
        return (req, res) => {
            const token = (0, auth_callback_middleware_1.signToken)(domain, configModule, req.user, expiresIn);
            res.json({ access_token: token });
        };
    }
    return (req, res) => {
        const authenticateSession = (0, auth_callback_middleware_1.authenticateSessionFactory)(domain);
        authenticateSession(req, res);
        const token = (0, auth_callback_middleware_1.signToken)(domain, configModule, req.user, expiresIn);
        // append token to redirect url as query param
        const url = new URL(redirectUrl);
        url.searchParams.append('access_token', token);
        res.redirect(url.toString());
    };
}
//# sourceMappingURL=auth-routes-builder.js.map