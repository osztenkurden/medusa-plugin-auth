import { MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AuthProvider, StrategyErrorIdentifierType } from '../types';
/**
 * Default validate callback used by an admin passport strategy
 *
 * @param profile The profile returned by the passport strategy
 * @param container The medusa container
 * @param strategyErrorIdentifier It will be used to compose the error message in case of an error (e.g Google, Facebook)
 * @param strict If strict is set to true, it will check if the user already exists in the database
 * @param strategyName The name of the strategy
 */
export declare function validateAdminCallback<T extends {
    emails?: {
        value: string;
    }[];
} = {
    emails?: {
        value: string;
    }[];
}>(profile: T, { container, strategyErrorIdentifier, strict, strategyName, }: {
    container: MedusaContainer;
    strategyErrorIdentifier: StrategyErrorIdentifierType;
    strict?: AuthProvider['strict'];
    strategyName: string;
}): Promise<{
    id: string;
} | never>;
/**
 * Default validate callback used by a store passport strategy
 *
 * @param profile
 * @param strategyErrorIdentifier It will be used to compose the error message in case of an error (e.g Google, Facebook)
 * @param container
 * @param strict
 * @param strategyName
 */
export declare function validateStoreCallback<T extends {
    name?: {
        givenName?: string;
        familyName?: string;
    };
    _json?: {
        email_verified?: boolean;
    };
    emails?: {
        value: string;
    }[];
} = {
    emails?: {
        value: string;
    }[];
}>(profile: T, { container, strategyErrorIdentifier, strict, strategyName, }: {
    container: MedusaContainer;
    strategyErrorIdentifier: StrategyErrorIdentifierType;
    strategyName: string;
    strict?: AuthProvider['strict'];
}): Promise<{
    id: string;
} | never>;
//# sourceMappingURL=validate-callback.d.ts.map