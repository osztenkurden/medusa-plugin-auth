import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { LinkedinAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getLinkedinStoreStrategy(id: string): StrategyFactory<LinkedinAuthOptions>;
/**
 * Return the router that hold the linkedin store authentication routes
 * @param id
 * @param linkedin
 * @param configModule
 */
export declare function getLinkedinStoreAuthRouter(id: string, linkedin: LinkedinAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map