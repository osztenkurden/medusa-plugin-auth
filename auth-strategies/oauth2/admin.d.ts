import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { OAuth2AuthOptions } from './types';
import { StrategyFactory } from '../../types';
export declare function getOAuth2AdminStrategy(id: string): StrategyFactory<OAuth2AuthOptions>;
/**
 * Return the router that hold the oauth2 admin authentication routes
 * @param id
 * @param oauth2
 * @param configModule
 */
export declare function getOAuth2AdminAuthRouter(id: string, oauth2: OAuth2AuthOptions, configModule: ConfigModule): Router;
//# sourceMappingURL=admin.d.ts.map