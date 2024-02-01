import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { FacebookAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getFacebookStoreStrategy(id: string): StrategyFactory<FacebookAuthOptions>;
/**
 * Return the router that hold the facebook store authentication routes
 * @param id
 * @param facebook
 * @param configModule
 */
export declare function getFacebookStoreAuthRouter(id: string, facebook: FacebookAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map