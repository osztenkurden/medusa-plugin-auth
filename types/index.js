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
exports.handleOption = exports.EMAIL_VERIFIED_KEY = exports.AUTH_PROVIDER_KEY = exports.CUSTOMER_METADATA_KEY = void 0;
__exportStar(require("./strategy"), exports);
exports.CUSTOMER_METADATA_KEY = 'useSocialAuth';
exports.AUTH_PROVIDER_KEY = 'authProvider';
exports.EMAIL_VERIFIED_KEY = 'emailVerified';
function handleOption(opt, configModule, container) {
    if (typeof opt === 'function') {
        return handleOption(opt(configModule, container), configModule, container);
    }
    /*if (typeof opt === 'object' && typeof (opt as any).then === 'function') {
        return opt as PromiseLike<AuthOptions>;
    }

    return Promise.resolve(opt);*/
    return opt;
}
exports.handleOption = handleOption;
//# sourceMappingURL=index.js.map