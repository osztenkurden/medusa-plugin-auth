import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { AzureAuthOptions } from './types';
import { StrategyFactory } from '../../types';
/**
 * Return the azure store strategy
 * @param id
 */
export declare function getAzureStoreStrategy(id: string): StrategyFactory<AzureAuthOptions>;
/**
 * Return the router that hold the azure store authentication routes
 * @param id
 * @param azure
 * @param configModule
 */
export declare function getAzureStoreAuthRouter(id: string, azure: AzureAuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map