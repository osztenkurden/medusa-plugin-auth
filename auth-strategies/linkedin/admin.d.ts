import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { LinkedinAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getLinkedinAdminStrategy(id: string): StrategyFactory<LinkedinAuthOptions>;
/**
 * Return the router that hold the linkedin admin authentication routes
 * @param id
 * @param linkedin
 * @param configModule
 */
export declare function getLinkedinAdminAuthRouter(id: string, linkedin: LinkedinAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map