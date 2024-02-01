import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { GoogleAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getGoogleAdminStrategy(id: string): StrategyFactory<GoogleAuthOptions>;
/**
 * Return the router that hold the google admin authentication routes
 * @param id
 * @param google
 * @param configModule
 */
export declare function getGoogleAdminAuthRouter(id: string, google: GoogleAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map