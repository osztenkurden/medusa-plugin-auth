import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { GoogleAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getGoogleStoreStrategy(id: string): StrategyFactory<GoogleAuthOptions>;
/**
 * Return the router that hold the google store authentication routes
 * @param id
 * @param google
 * @param configModule
 */
export declare function getGoogleStoreAuthRouter(id: string, google: GoogleAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map