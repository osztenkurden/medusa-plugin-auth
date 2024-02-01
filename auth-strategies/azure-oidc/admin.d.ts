import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { AzureAuthOptions } from './types';
import { StrategyFactory } from '../../types';
/**
 * Return the azure admin strategy
 * @param id
 */
export declare function getAzureAdminStrategy(id: string): StrategyFactory<AzureAuthOptions>;
/**
 * Return the router that hold the azure admin authentication routes
 * @param azure
 * @param configModule
 * @param id
 */
export declare function getAzureAdminAuthRouter(id: string, azure: AzureAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map