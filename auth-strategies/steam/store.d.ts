import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { SteamAuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getSteamStoreStrategy(id: string): StrategyFactory<SteamAuthOptions>;
/**
 * Return the router that hold the steam store authentication routes
 * @param steam
 * @param configModule
 */
export declare function getSteamStoreAuthRouter(id: string, steam: SteamAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map