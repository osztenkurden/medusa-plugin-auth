import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { OAuth2AuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getOAuth2StoreStrategy(id: string): StrategyFactory<OAuth2AuthOptions>;
/**
 * Return the router that hold the oauth2 store authentication routes
 * @param id
 * @param oauth2
 * @param configModule
 */
export declare function getOAuth2StoreAuthRouter(id: string, oauth2: OAuth2AuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=store.d.ts.map