import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { SteamAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getSteamAdminStrategy(id: string): StrategyFactory<SteamAuthOptions>;
/**
 * Return the router that hold the steam admin authentication routes
 * @param steam
 * @param configModule
 */
export declare function getSteamAdminAuthRouter(id: string, steam: SteamAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map