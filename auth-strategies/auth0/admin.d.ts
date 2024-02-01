import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { Auth0Options } from './types';
import { StrategyFactory } from '../../types';
export declare function getAuth0AdminStrategy(id: string): StrategyFactory<Auth0Options>;
/**
 * Return the router that holds the auth0 admin authentication routes
 * @param id
 * @param auth0
 * @param configModule
 */
export declare function getAuth0AdminAuthRouter(id: string, auth0: Auth0Options, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map