import { MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AuthProvider } from '../../types';
export declare const GOOGLE_STORE_STRATEGY_NAME = "google.store.medusa-auth-plugin";
export declare const GOOGLE_ADMIN_STRATEGY_NAME = "google.admin.medusa-auth-plugin";
export type Profile = {
    emails: {
        value: string;
    }[];
    name?: {
        givenName?: string;
        familyName?: string;
    };
};
export type GoogleAuthOptions = {
    type: 'google';
    clientID: string;
    clientSecret: string;
    admin?: {
        callbackUrl: string;
        successRedirect: string;
        failureRedirect: string;
        /**
         * Default /admin/auth/google
         */
        authPath?: string;
        /**
         * Default /admin/auth/google/cb
         */
        authCallbackPath?: string;
        /**
         * The default verify callback function will be used if this configuration is not specified
         */
        verifyCallback?: (container: MedusaContainer, req: Request, accessToken: string, refreshToken: string, profile: Profile, strict?: AuthProvider['strict']) => Promise<null | {
            id: string;
        } | never>;
        expiresIn?: number;
    };
    store?: {
        callbackUrl: string;
        successRedirect: string;
        failureRedirect: string;
        /**
         * Default /store/auth/google
         */
        authPath?: string;
        /**
         * Default /store/auth/google/cb
         */
        authCallbackPath?: string;
        /**
         * The default verify callback function will be used if this configuration is not specified
         */
        verifyCallback?: (container: MedusaContainer, req: Request, accessToken: string, refreshToken: string, profile: Profile, strict?: AuthProvider['strict']) => Promise<null | {
            id: string;
        } | never>;
        expiresIn?: number;
    };
};
//# sourceMappingURL=types.d.ts.map