import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Auth0Options } from './types';
import { StrategyFactory } from '../../types';
export declare function getAuth0StoreStrategy(id: string): StrategyFactory<Auth0Options>;
/**
 * Return the router that holds the auth0 store authentication routes
 * @param id
 * @param auth0
 * @param configModule
 */
export declare function getAuth0StoreAuthRouter(id: string, auth0: Auth0Options, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map