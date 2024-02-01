import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { FacebookAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getFacebookAdminStrategy(id: string): StrategyFactory<FacebookAuthOptions>;
/**
 * Return the router that hold the facebook admin authentication routes
 * @param id
 * @param facebook
 * @param configModule
 */
export declare function getFacebookAdminAuthRouter(id: string, facebook: FacebookAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map